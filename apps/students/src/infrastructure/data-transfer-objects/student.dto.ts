// Entities
import { CourseEntity } from './interfaces/course.entity';
import { StudentEntity } from './interfaces/student.entity';
import { PersonalInformationEntity } from './interfaces/personal-information.entity';

export class StudentDTO implements StudentEntity {
  personalInformation: PersonalInformationEntity;
  courses: CourseEntity[];
  status: boolean;
  createdBy: string;

  constructor(student: StudentDTO) {
    this.personalInformation = student.personalInformation;
    this.status = student.status ?? true;
    this.createdBy = student.createdBy ?? '0';
  }
}