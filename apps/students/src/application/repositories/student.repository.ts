import { StudentEntity } from '../../domain/entities/student.entity';

export interface IStudentRepository<T extends StudentEntity, U> {
  findAll(): Promise<T[]>;
  create(student: U): Promise<T>;
  update(student: U): Promise<T | null>;
  delete(uuid: string): Promise<T | null>;
}
