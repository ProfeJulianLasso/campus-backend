// Entities
import { CourseEntity } from './course.entity';
import { BaseEntity } from './base/base.entity';
import { PersonalInformationEntity } from './personal-information.entity';

export interface StudentEntity extends BaseEntity {
  status: boolean;
  personalInformation: PersonalInformationEntity;
  courses: CourseEntity[];
}
