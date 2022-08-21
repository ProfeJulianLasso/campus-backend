import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entities/base.entity';

export class BaseValueObject implements BaseEntity {
  uuid: string;
  createdAt: string | Date;
  updatedAt: string | Date | null;
  deletedAt: string | Date | null;

  constructor(data: BaseEntity) {
    this.uuid = data.uuid ?? uuidv4();
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? null;
    this.deletedAt = data.deletedAt ?? null;
  }
}
