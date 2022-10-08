// Value Objects
import { StudentEntity } from '../../domain/entities/student.entity';

// Services
import { IStudentRepository } from '../repositories/student.repository';

export class GetAllStudentsUseCase<T extends StudentEntity> {
  constructor(
    private readonly studentRepository: IStudentRepository<T, StudentEntity>,
  ) {}

  execute(): Promise<T[]> {
    return this.studentRepository.findAll();
  }
}
