export abstract class BaseDomainEntity {
  uuid: string;
  createdBy: string;
  createdAt: string | number | Date;
  updatedBy?: string | null;
  updatedAt?: string | number | Date | null;
  deletedBy?: string | null;
  deletedAt?: string | number | Date | null;
}
