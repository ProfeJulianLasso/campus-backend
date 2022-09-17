// Entities
import { QuizEntity } from './quiz.entity';
import { EventEntity } from './event.entity';
import { TopicEntity } from './topic.entity';
import { BaseEntity } from './base/base.entity';
import { ActivityEntity } from './activity.entity';
import { CategoryEntity } from './category.entity';
import { CertificateEntity } from './certificate.entity';

export interface CourseEntity extends BaseEntity {
  name: string;
  description: string;
  photo: string;
  status: boolean;
  topics: TopicEntity[];
  activities: ActivityEntity[];
  quizzes: QuizEntity[];
  events: EventEntity[];
  certificates: CertificateEntity[];
  category: CategoryEntity[];
}
