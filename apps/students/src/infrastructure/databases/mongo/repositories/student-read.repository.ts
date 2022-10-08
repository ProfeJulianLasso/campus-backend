// Libraries
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Student, StudentDocument } from '../schemas/student.schema';

// Interfaces
import { IStudentRepository } from '../../../../application/repositories/student.repository';
import { StudentDTO } from '../data-transfer-objects/student.dto';

export class StudentReadRepository
  implements IStudentRepository<Student, StudentDTO>
{
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

  update(student: StudentDTO): Promise<Student | null> {
    student.updatedBy = student.uuid; // TODO: se debe de establecer quien actualiza cuando se solucione el tema del login
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
        { deletedBy: uuid, deletedAt: new Date() }, // TODO: se debe de establecer quien elimina cuando se solucione el tema del login
      ),
    );
  }
}
