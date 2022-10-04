// Entities
import { CourseEntity } from './interfaces/course.entity';
import { StudentEntity } from './interfaces/student.entity';
import { PersonalInformationEntity } from './interfaces/personal-information.entity';
import { BaseDTO } from './base/base.dto';

export class NewStudentDTO extends BaseDTO implements StudentEntity {
  personalInformation: PersonalInformationEntity;
  courses: CourseEntity[];
  status: boolean;
  createdBy: string;

  constructor(student: NewStudentDTO) {
    super(student);
    this.personalInformation = student.personalInformation;
    this.status = student.status ?? true;
    this.createdBy = student.createdBy ?? '0';
  }
}
