// Entities
import { BaseEntity } from './base.entity';

export interface PersonEntity extends BaseEntity {
  name: string;
  lastName: string;
  email: string;
  photo: string | null;
}
