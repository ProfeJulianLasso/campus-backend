// Entities
import { CourseDomainEntity } from '../../domain/entities/course.domain-entity';

export interface ICourseService<T extends CourseDomainEntity> {
  findById(uuid: string): Promise<T>;
}
