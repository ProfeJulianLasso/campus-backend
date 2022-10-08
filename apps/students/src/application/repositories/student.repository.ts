import { StudentEntity } from '../../domain/entities/student.entity';

export interface IStudentRepository<T extends StudentEntity> {
  findAll(): Promise<T[]>;
  create(student: StudentEntity): Promise<T>;
  update(uuid: string, student: StudentEntity): Promise<T>;
  delete(uuid: string): Promise<T>;
}
