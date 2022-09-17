// Entities
import { LessonEntity } from './lesson.entity';
import { BaseEntity } from './base/base.entity';

export interface TopicEntity extends BaseEntity {
  name: string;
  description: string;
  photo: string;
  logo: string;
  status: boolean;
  lessons: LessonEntity[];
}
