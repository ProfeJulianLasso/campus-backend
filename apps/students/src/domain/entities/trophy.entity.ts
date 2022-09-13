// Entities
import { BaseEntity } from './base/base.entity';

export interface TrophyEntity extends BaseEntity {
  name: string;
  description: string;
  photo: string;
}
