export interface BadgeRepository<T> {
  listAllBadges(): Promise<T[]>;
  saveBadge(entity: T): Promise<T>;
  updateBadge(entity: T): Promise<T | null>;
  deleteBadge(uuid: string): Promise<T | null>;
  enableBadge(uuid: string): Promise<T | null>;
  disableBadge(uuid: string): Promise<T | null>;
  findBadgeByUuid(uuid: string): Promise<T | null>;
}
