import { BadgeRepository } from './badge.repository';
import { TrophyRepository } from './trophy.repository';

export interface CertificateRepository<T>
  extends BadgeRepository<T>,
    TrophyRepository<T> {
  listAllCertificates(): Promise<T[]>;
  saveCertificate(entity: T): Promise<T>;
  updateCertificate(entity: T): Promise<T | null>;
  deleteCertificate(uuid: string): Promise<T | null>;
  enableCertificate(uuid: string): Promise<T | null>;
  disableCertificate(uuid: string): Promise<T | null>;
  findCertificateByUuid(uuid: string): Promise<T | null>;
}
