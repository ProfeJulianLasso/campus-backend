export interface BaseRepository<T> {
  listAll(): Promise<T[]>;
  findByUuid(uuid: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T | null>;
  delete(uuid: string): Promise<T | null>;
}
