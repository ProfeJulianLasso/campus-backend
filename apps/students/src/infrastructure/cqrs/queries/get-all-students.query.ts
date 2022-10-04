// Libraries
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// Services
import { StudentService } from '../../databases/mongo/services/student.service';

// Data Transfer Objects
import { StudentDTO } from '../../data-transfer-objects/student.dto';

// Use Cases
import { GetAllStudentsUseCase } from '../../../application/use-cases/get-all-students.use-case';

@Controller()
export class GetAllStudentsQuery {
  constructor(private readonly student$: StudentService) {}

  @MessagePattern('Students.GetAllStudents')
  execute(): Promise<StudentDTO[]> {
    const useCase = new GetAllStudentsUseCase(this.student$);
    return useCase.execute();
  }
}
