// import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetAllStudentsQuery } from './infrastructure/cqrs/queries/get-all-students.query';
import {
  Student,
  StudentSchema,
} from './infrastructure/databases/mongo/schemas/student.schema';
import { StudentService } from './infrastructure/databases/mongo/services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // entities: [],
        autoLoadEntities: true,
        synchronize: true,
        logging: process.env.SCOPE === 'production' ? false : true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environments/.env.${process.env.SCOPE}`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NOSQL_URI'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
    // BullModule.registerQueue({
    //   name: 'test',
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
  ],
  controllers: [GetAllStudentsQuery],
  providers: [StudentService],
})
export class StudentsModule {}
