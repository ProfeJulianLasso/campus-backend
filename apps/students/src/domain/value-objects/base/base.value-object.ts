import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../entities/base/base.entity';

export class BaseValueObject implements BaseEntity {
  uuid: string;
  status: boolean;
  createdBy: string;
  createdAt: string | number | Date;

  constructor(baseValueObject: BaseEntity) {
    this.uuid = baseValueObject.uuid ?? uuidv4();
    this.status = baseValueObject.status ?? true;
    this.createdBy = baseValueObject.createdBy ?? '0';
    this.createdAt = baseValueObject.createdAt ?? Date.now();
  }
}
