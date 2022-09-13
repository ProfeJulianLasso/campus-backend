export interface BaseEntity {
  uuid?: string;
  status?: boolean;
  createdBy?: string;
  createdAt?: string | Date;
  updatedby?: string;
  updatedAt?: string | Date | null;
  deletedBy?: string;
  deletedAt?: string | Date | null;
}
