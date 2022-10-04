// Value Objects
import { StudentValueObject } from '../../domain/value-objects/student.value-object';

// Repositories
import { StudentRepository } from '../../domain/repositories/student.repository';
import { ServerErrorException } from '../exceptions/server-error.exception';

export class GetAllStudentsUseCase {
  constructor(private readonly student$: StudentRepository) {}

  async execute(): Promise<StudentValueObject[]> {
    try {
      return await this.student$.findAll();
    } catch (error) {
      throw new ServerErrorException(error.message, error.code);
    }
  }
}
