export interface BaseEntity {
  uuid?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
