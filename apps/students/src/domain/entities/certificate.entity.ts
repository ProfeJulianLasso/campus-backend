// Entities
import { BadgeEntity } from './badge.entity';
import { TrophyEntity } from './trophy.entity';
import { BaseEntity } from './base/base.entity';

export interface CertificateEntity extends BaseEntity {
  description: string;
  trophies: TrophyEntity[];
  badges: BadgeEntity[];
}
