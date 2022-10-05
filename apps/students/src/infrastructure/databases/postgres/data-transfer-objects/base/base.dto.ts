import { v4 as uuid } from 'uuid';
import { BaseInterface } from '../../interfaces/base/base.interface';

export class BaseDTO implements BaseInterface {
  uuid: string;
  createdBy: string;
  createdAt: string | number | Date;
  updatedBy: string | null;
  updatedAt: string | number | Date | null;
  deletedBy: string | null;
  deletedAt: string | number | Date | null;

  constructor(base: BaseInterface) {
    this.uuid = base.uuid ?? uuid();
    this.createdAt = base.createdAt ?? Date.now();
    this.createdBy = base.createdBy ?? '00000000-0000-0000-0000-000000000000';
  }
}
