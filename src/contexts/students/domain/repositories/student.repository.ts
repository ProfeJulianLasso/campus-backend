import { BaseRepository } from 'src/shared/domain/repositories/base.repository';

export interface StudentRepository<T> extends BaseRepository<T> {
  findByEmail(email: string): Promise<T[]>;
  findByName(name: string): Promise<T[]>;
  findByLastName(lastName: string): Promise<T[]>;
  enable(uuid: string): Promise<boolean>;
  disable(uuid: string): Promise<boolean>;
}
