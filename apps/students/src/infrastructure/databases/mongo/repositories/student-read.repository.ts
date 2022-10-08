// Libraries
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Entities
import { StudentEntity } from '../../../../domain/entities/student.entity';

// Schemas
import { Student, StudentDocument } from '../schemas/student.schema';

// Interfaces
import { IStudentRepository } from '../../../../application/repositories/student.repository';
import { StudentDTO } from '../data-transfer-objects/student.dto';

export class StudentReadRepository implements IStudentRepository<Student> {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  findAll(): Promise<Student[]> {
    return Promise.resolve(
      this.studentModel.find({ deletedAt: null }, { _id: 0 }),
    );
  }

  create(student: StudentDTO): Promise<Student> {
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }

  update(uuid: string, student: StudentDTO): Promise<Student> {
    const studentUpdated = this.studentModel.findOneAndUpdate(uuid, student);
    // return studentUpdated;
  }

  delete(uuid: string): Promise<Student> {
    throw new Error('Method not implemented.');
  }
}
