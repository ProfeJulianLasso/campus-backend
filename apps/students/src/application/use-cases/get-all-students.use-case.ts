// Value Objects
import { StudentDomainEntity } from '../../domain/entities/student.domain-entity';

// Services
import { IStudentRepository } from '../repositories/student.repository';

export class GetAllStudentsUseCase<T extends StudentDomainEntity> {
  constructor(private readonly studentRepository: IStudentRepository<T>) {}

  execute(): Promise<T[]> {
    return this.studentRepository.findAll();
  }
}
