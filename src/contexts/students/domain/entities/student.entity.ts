// Entities
import { CourseEntity } from './course.entity';
import { PersonEntity } from '../../../shared/domain/entities/person.entity';

export interface StudentEntity {
  personalData: PersonEntity;
  courses: CourseEntity[];
}
