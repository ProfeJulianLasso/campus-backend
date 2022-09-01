import { BadgeEntity } from './badge.entity';
import { TrophyEntity } from './trophy.entity';
import { BaseEntity } from '../../../shared/domain/entities/base.entity';

export interface CertificateEntity extends BaseEntity {
  trophies: TrophyEntity[];
  badges: BadgeEntity[];
}
