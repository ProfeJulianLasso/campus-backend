// Libraries
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Repositories
import { StudentRepository } from '../../../contexts/students/domain/repositories/student.repository';

// Schemas
import {
  Student,
  StudentDocument,
} from '../../../app/models/mongo/student.schema';

@Injectable()
export class StudentService implements StudentRepository<Student> {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  findByEmail(email: string): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }

  findByLastName(lastName: string): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }

  enable(uuid: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  disable(uuid: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  listAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  findByUuid(uuid: string): Promise<Student | null> {
    return this.studentModel.findOne({ uuid }).exec();
  }

  save(entity: Student): Promise<Student | null> {
    throw new Error('Method not implemented.');
  }

  update(entity: Student): Promise<Student | null> {
    throw new Error('Method not implemented.');
  }

  delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
