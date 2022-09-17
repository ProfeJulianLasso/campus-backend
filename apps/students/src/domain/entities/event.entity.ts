import { BaseEntity } from './base/base.entity';

export interface EventEntity extends BaseEntity {
  name: string;
  description: string;
  url: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  status: boolean;
}
