import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetAllStudentsQuery } from './infrastructure/cqrs/queries/get-all-students.query';
import {
  Student,
  StudentSchema,
} from './infrastructure/databases/mongo/schemas/student.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentReadRepository } from './infrastructure/databases/mongo/repositories/student-read.repository';
import { PersonalInformationEntity } from './infrastructure/databases/postgres/entities/personal-information.entity';
import { StudentEntity } from './infrastructure/databases/postgres/entities/student.entity';
import { CourseEntity } from './infrastructure/databases/postgres/entities/course.entity';
import { StudentCourseEntity } from './infrastructure/databases/postgres/entities/student-course.entity';
import { join } from 'path';
import { StudentWriteRepository } from './infrastructure/databases/postgres/repositories/student-write.repository';
import { CreateStudentCommand } from './infrastructure/cqrs/commands/create-student.command';
import { StudentCreatedSender } from './infrastructure/events/senders/student-created.sender';
import { StudentCreatedSenderRsync } from './infrastructure/cqrs/commands/events/senders/student-created.sender-rsync';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trim()}`,
      ),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          CourseEntity,
          PersonalInformationEntity,
          StudentEntity,
          StudentCourseEntity,
        ],
        synchronize: true,
        logging: process.env.SCOPE === 'production' ? false : true,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NOSQL_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    BullModule.registerQueue(
      {
        name: 'campus',
        redis: {
          host: 'localhost',
          port: 6379,
          db: 0,
        },
      },
      {
        name: 'rsync',
        redis: {
          host: 'localhost',
          port: 6379,
          db: 1,
        },
      },
    ),
    // BullModule.registerQueueAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     name: configService.get<string>('BROKER_QUEUE_NAME'),
    //     redis: {
    //       host: configService.get<string>('BROKER_HOST'),
    //       port: configService.get<number>('BROKER_PORT'),
    //       db: configService.get<number>('BROKER_DATABASE'),
    //     },
    //   }),
    // }),
  ],
  controllers: [GetAllStudentsQuery, CreateStudentCommand],
  providers: [
    StudentCreatedSender,
    StudentCreatedSenderRsync,
    StudentReadRepository,
    StudentWriteRepository,
  ],
})
export class StudentsModule {}
