import { BaseRepository } from '../../../shared/domain/repositories/base.repository';

export interface StudentRepository<T> extends BaseRepository<T> {
  findByEmail(email: string): Promise<T | null>;
  findByName(name: string): Promise<T[]>;
  findByLastName(lastName: string): Promise<T[]>;
  enable(uuid: string): Promise<T | null>;
  disable(uuid: string): Promise<T | null>;
}
