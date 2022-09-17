// Entities
import { BaseEntity } from './base/base.entity';

export interface QuestionEntity extends BaseEntity {
  question: string;
  status: boolean;
}
