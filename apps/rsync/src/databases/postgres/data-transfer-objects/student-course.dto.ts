// Entities
import { BaseDomainEntity } from 'apps/rsync/src/domain-entities/base/base.domain-entity';

export class StudentCourseDTO extends BaseDomainEntity {
  studentId: string;
  courseId: string;
  status: boolean;
}
