// Entities
import { GradeEntity } from './grade.entity';
import { BaseEntity } from './base/base.entity';

export interface SubmissionEntity extends BaseEntity {
  content: string;
  grade: GradeEntity;
  files?: string[];
}
