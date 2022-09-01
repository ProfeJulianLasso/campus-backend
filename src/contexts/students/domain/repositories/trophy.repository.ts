export interface TrophyRepository<T> {
  listAllTrophies(): Promise<T[]>;
  saveTrophy(entity: T): Promise<T>;
  updateTrophy(entity: T): Promise<T | null>;
  deleteTrophy(uuid: string): Promise<T | null>;
  enableTrophy(uuid: string): Promise<T | null>;
  disableTrophy(uuid: string): Promise<T | null>;
  findTrophyByUuid(uuid: string): Promise<T | null>;
}
