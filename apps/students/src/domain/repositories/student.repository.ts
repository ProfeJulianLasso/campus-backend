// Value Objects
import { StudentValueObject } from '../value-objects/student.value-object';

export interface StudentRepository {
  findAll(): Promise<StudentValueObject[]>;
  findById(uuid: string): StudentValueObject;
  register(student: StudentValueObject): StudentValueObject;
  update(uuid: string, student: StudentValueObject): StudentValueObject;
  delete(uuid: string): StudentValueObject;
}
