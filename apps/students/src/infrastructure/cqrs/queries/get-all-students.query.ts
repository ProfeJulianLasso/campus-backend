// Libraries
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// Repositories
import { StudentReadRepository } from '../../databases/mongo/repositories/student-read.repository';

// Use Cases
import { GetAllStudentsUseCase } from '../../../application/use-cases/get-all-students.use-case';
import { StudentDTO } from '../../databases/mongo/data-transfer-objects/student.dto';

@Controller()
export class GetAllStudentsQuery {
  constructor(private readonly studentReadRepository: StudentReadRepository) {}

  @MessagePattern('Students.GetAllStudents')
  execute(): Promise<StudentDTO[]> {
    const useCase = new GetAllStudentsUseCase<StudentDTO>(
      this.studentReadRepository,
    );
    return useCase.execute();
  }
}
