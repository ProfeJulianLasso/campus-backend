// Entities
import { BaseEntity } from '../../../../shared/domain/entities/base.entity';

export interface StudentEntity extends BaseEntity {
  name: string;
  lastName: string;
  email: string;
  photo?: string | null;
  status?: boolean;
}
