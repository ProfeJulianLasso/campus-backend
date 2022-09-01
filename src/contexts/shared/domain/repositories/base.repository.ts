export interface BaseRepository<T> {
  listAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T | null>;
  delete(uuid: string): Promise<T | null>;
}
