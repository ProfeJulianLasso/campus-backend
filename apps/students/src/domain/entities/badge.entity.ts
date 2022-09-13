// Entities
import { BaseEntity } from './base/base.entity';

export interface BadgeEntity extends BaseEntity {
  name: string;
  description: string;
  photo: string;
}
