// Entities
import { BaseEntity } from './base/base.entity';
import { ActivityEntity } from './activity.entity';

// Enums
import { TypeEnum } from './enums/type.enum';

export interface LessonEntity extends BaseEntity {
  name: string;
  type: TypeEnum;
  content: string;
  position: number;
  status: boolean;
  activities: ActivityEntity[];
}
