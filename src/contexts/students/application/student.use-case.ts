// Libraries
import { merge } from 'lodash';

// Entities
import { StudentEntity } from '../domain/entities/student.entity';

// Repositories
import { StudentRepository } from '../domain/repositories/student.repository';

export class StudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository<StudentEntity>,
  ) {}

  public async listAll(): Promise<StudentEntity[]> {
    return this.studentRepository.listAll();
  }

  public findByUuid(uuid: string): Promise<StudentEntity | null> {
    return this.studentRepository.findByUuid(uuid);
  }

  public findByEmail(email: string): Promise<StudentEntity | null> {
    return this.studentRepository.findByEmail(email);
  }

  public async findByFullName(fullname: string): Promise<StudentEntity[]> {
    const name = await this.studentRepository.findByName(fullname);
    const lastName = await this.studentRepository.findByLastName(fullname);
    return merge(name, lastName);
  }

  public register(student: StudentEntity): Promise<StudentEntity | null> {
    return this.studentRepository.save(student);
  }

  public modify(
    uuid: string,
    student: StudentEntity,
  ): Promise<StudentEntity | null> {
    student.uuid = uuid;
    return this.studentRepository.update(student);
  }

  public remove(uuid: string): Promise<StudentEntity | null> {
    return this.studentRepository.delete(uuid);
  }

  public activate(uuid: string): Promise<StudentEntity | null> {
    return this.studentRepository.enable(uuid);
  }

  public deactivate(uuid: string): Promise<StudentEntity | null> {
    return this.studentRepository.disable(uuid);
  }
}
