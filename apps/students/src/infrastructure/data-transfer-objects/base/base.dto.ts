import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../interfaces/base/base.entity';

export class BaseDTO implements BaseEntity {
  uuid: string;
  status: boolean;
  createdBy: string;
  createdAt: string | number | Date;

  constructor(baseDTO: BaseEntity) {
    this.uuid = baseDTO.uuid ?? uuidv4();
    this.status = baseDTO.status ?? true;
    this.createdBy = baseDTO.createdBy ?? '0';
    this.createdAt = baseDTO.createdAt ?? Date.now();
  }
}
