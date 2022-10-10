import { StudentDomainEntity } from '../../domain/entities/student.domain-entity';

export interface IStudentService<T extends StudentDomainEntity> {
  findById(uuid: string): Promise<T>;
  findByName(name: string): Promise<T>;
  findByLastName(lastName: string): Promise<T>;
  findByEmail(email: string): Promise<T>;
}
