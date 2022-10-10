import { BaseDomainEntity } from './base/base.domain-entity';
import { CourseDomainEntity } from './course.domain-entity';
import { PersonalInformationDomainEntity } from './personal-information.domain-entity';

export abstract class StudentDomainEntity extends BaseDomainEntity {
  status: boolean;
  personalInformation: PersonalInformationDomainEntity;
  courses: CourseDomainEntity[];
}
