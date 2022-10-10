import { BaseDomainEntity } from './base/base.domain-entity';

export abstract class CourseDomainEntity extends BaseDomainEntity {
  uuid: string;
  name: string;
  description: string;
  photo: string;
  status: boolean;
}
