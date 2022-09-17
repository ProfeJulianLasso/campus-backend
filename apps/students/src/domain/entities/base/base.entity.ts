export interface BaseEntity {
  uuid?: string;
  status?: boolean;
  createdBy?: string;
  createdAt?: string | number | Date;
  updatedBy?: string;
  updatedAt?: string | number | Date | null;
  deletedBy?: string;
  deletedAt?: string | number | Date | null;
}
