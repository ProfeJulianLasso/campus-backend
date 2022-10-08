import { StudentEntity } from '../../domain/entities/student.entity';

export interface IStudentService<T extends StudentEntity> {
  findById(uuid: string): Promise<T>;
  findByName(name: string): Promise<T>;
  findByLastName(lastName: string): Promise<T>;
  findByEmail(email: string): Promise<T>;
}
