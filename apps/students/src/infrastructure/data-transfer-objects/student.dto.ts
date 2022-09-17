import { CourseEntity } from '../../domain/entities/course.entity';
import { PersonalInformationEntity } from '../../domain/entities/personal-information.entity';

export class StudentDTO {
  personalInformation: PersonalInformationEntity;
  courses: CourseEntity[];
  status?: boolean;
  createdBy?: string;

  constructor(student: StudentDTO) {
    this.personalInformation = student.personalInformation;
    this.status = student.status ?? true;
    this.createdBy = student.createdBy ?? '0';
  }
}
