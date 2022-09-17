// Entities
import { BaseEntity } from './base/base.entity';

export interface CategoryEntity extends BaseEntity {
  name: string;
  description: string;
  subCategory?: CategoryEntity;
}
