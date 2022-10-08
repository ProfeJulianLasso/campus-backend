import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { StudentRepository } from '../../../../application/repositories/student.repository';
import { StudentValueObject } from 'apps/students/src/domain/value-objects/student.value-object';

@Injectable()
export class StudentReadService implements StudentRepository {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  findAll(): Promise<StudentValueObject[]> {
    return Promise.resolve(
      this.studentModel.find({ deletedAt: null }, { _id: 0 }),
    );
  }

  findById(uuid: string): StudentValueObject {
    throw new Error('Method not implemented.');
  }

  register(student: StudentValueObject): Promise<StudentValueObject> {
    throw new Error('Method not implemented.');
  }

  update(uuid: string, student: StudentValueObject): StudentValueObject {
    throw new Error('Method not implemented.');
  }

  delete(uuid: string): StudentValueObject {
    throw new Error('Method not implemented.');
  }
}
