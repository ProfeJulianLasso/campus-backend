// Libraries
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// Services
import { StudentNoSQLService } from '../../databases/mongo/services/student-nosql.service';

// Data Transfer Objects
import { StudentDTO } from '../../databases/mongo/data-transfer-objects/student.dto';

// Use Cases
import { GetAllStudentsUseCase } from '../../../application/use-cases/get-all-students.use-case';

@Controller()
export class GetAllStudentsQuery {
  constructor(private readonly student$: StudentNoSQLService) {}

  @MessagePattern('Students.GetAllStudents')
  execute() {
    const useCase = new GetAllStudentsUseCase(this.student$);
    return useCase.execute();
  }
}
