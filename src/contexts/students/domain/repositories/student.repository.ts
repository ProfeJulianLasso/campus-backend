export interface StudentRepository<T> {
  listAllStudents(): Promise<T[]>;
  saveStudent(entity: T): Promise<T>;
  updateStudent(entity: T): Promise<T | null>;
  deleteStudent(uuid: string): Promise<T | null>;
  enableStudent(uuid: string): Promise<T | null>;
  disableStudent(uuid: string): Promise<T | null>;
  findStudentByName(name: string): Promise<T[]>;
  findStudentByUuid(uuid: string): Promise<T | null>;
  findStudentByEmail(email: string): Promise<T | null>;
  findStudentByLastName(lastName: string): Promise<T[]>;
}
