// Interfaces
// import { StudentInterface } from '../interfaces/student.interface';

// Data Transfer Objects
import { BaseDTO } from './base/base.dto';
import { PersonalInformationDTO } from './personal-information.dto';

// Entities
// import { CourseEntity } from 'apps/students/src/domain/entities/course.entity';

// export class StudentDTO extends BaseDTO implements StudentInterface {
export class StudentDTO extends BaseDTO {
  personalInformation: PersonalInformationDTO;
  // courses: CourseEntity[];
  status: boolean;
  updatedBy: string | null;
  updatedAt: string | number | Date | null;
  deletedBy: string | null;
  deletedAt: string | number | Date | null;

  constructor(student: StudentDTO) {
    super(student);
    this.personalInformation = student.personalInformation;
    // this.courses = student.courses;
    this.status = student.status ?? true;
  }
}
