import { StudentDomainEntity } from '../../domain/entities/student.domain-entity';
import { StudentValueObject } from '../../domain/value-objects/student.value-object';
import { PersonalInformationValueObject } from '../../domain/value-objects/personal-information.value-object';

export interface IStudentRepository<
  T extends StudentDomainEntity | StudentValueObject,
> {
  findAll(): Promise<T[]>;
  create(student: T | PersonalInformationValueObject): Promise<T>;
  update(student: T | StudentValueObject): Promise<T | null>;
  delete(uuid: string): Promise<T | null>;
}
