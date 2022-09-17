// Entities
import { BaseEntity } from './base/base.entity';
import { SubmissionEntity } from './submission.entity';

// Enums
import { TypeEnum } from './enums/type.enum';

export interface ActivityEntity extends BaseEntity {
  name: string;
  type: TypeEnum;
  content: string;
  position: number;
  status: boolean;
  submissions: SubmissionEntity[];
}
