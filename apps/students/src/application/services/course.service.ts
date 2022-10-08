// Entities
import { CourseEntity } from '../../domain/entities/course.entity';

export interface ICourseService<T extends CourseEntity> {
  findById(uuid: string): Promise<T>;
}
