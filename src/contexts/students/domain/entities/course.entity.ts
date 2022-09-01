// Entities
import { BaseEntity } from '../../../shared/domain/entities/base.entity';
import { GradeEntity } from './grade.entity';

export interface CourseEntity extends BaseEntity {
  course: string;
  certificate: {
    id: string;
    trophies: string[];
    badges: string[];
  };
  grades: GradeEntity[];
}
