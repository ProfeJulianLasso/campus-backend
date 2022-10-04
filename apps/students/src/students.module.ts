// import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllStudentsQuery } from './infrastructure/cqrs/queries/get-all-students.query';
import {
  Student,
  StudentSchema,
} from './infrastructure/databases/mongo/schemas/student.schema';
import { StudentService } from './infrastructure/databases/mongo/services/student.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pruebaDDD'),
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
