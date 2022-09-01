// Libraries
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Enums
import { State } from '../../../contexts/shared/utilities/enums/state.enum';

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

  findByEmail(email: string): Promise<Student | null> {
    return Promise.resolve(
      this.studentModel.findOne({
        $and: [{ email }, { deletedAt: null }],
      }),
    );
  }

  findByName(name: string): Promise<Student[]> {
    return Promise.resolve(
      this.studentModel.find({
        $and: [
          { deletedAt: null },
          {
            name: {
              $regex: new RegExp(name, 'i'),
            },
          },
        ],
      }),
    );
  }

  findByLastName(lastName: string): Promise<Student[]> {
    return Promise.resolve(
      this.studentModel.find({
        $and: [
          { deletedAt: null },
          {
            lastName: {
              $regex: new RegExp(lastName, 'i'),
            },
          },
        ],
      }),
    );
  }

  enable(uuid: string): Promise<Student | null> {
    return Promise.resolve(
      this.studentModel.findOneAndUpdate(
        {
          $and: [{ uuid }, { deletedAt: null }],
        },
        {
          updatedAt: new Date(),
          status: State.ACTIVE,
        },
      ),
    );
  }

  disable(uuid: string): Promise<Student | null> {
    return Promise.resolve(
      this.studentModel.findOneAndUpdate(
        {
          $and: [{ uuid }, { deletedAt: null }],
        },
        {
          updatedAt: new Date(),
          status: State.INACTIVE,
        },
      ),
    );
  }

  listAll(): Promise<Student[]> {
    return Promise.resolve(this.studentModel.find({ deletedAt: null }));
  }

  findByUuid(uuid: string): Promise<Student | null> {
    return Promise.resolve(
      this.studentModel.findOne({ uuid, deletedAt: null }),
    );
  }

  save(student: Student): Promise<Student> {
    return Promise.resolve(new this.studentModel(student).save());
  }

  update(student: Student): Promise<Student | null> {
    student.updatedAt = new Date();
    return Promise.resolve(
      this.studentModel.findOneAndUpdate(
        {
          $and: [{ uuid: student.uuid }, { deletedAt: null }],
        },
        student,
      ),
    );
  }

  delete(uuid: string): Promise<Student | null> {
    return Promise.resolve(
      this.studentModel.findOneAndUpdate(
        { $and: [{ uuid }, { deletedAt: null }] },
        { updatedAt: new Date(), deletedAt: new Date() },
      ),
    );
  }
}
