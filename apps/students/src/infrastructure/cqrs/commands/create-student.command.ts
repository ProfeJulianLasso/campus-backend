// Libraries
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { StudentService } from '../../databases/mongo/services/student.service';

// Data Transfer Objects
import { NewStudentDTO } from '../../data-transfer-objects/new-student.dto';

// Use Cases
import { CreateStudentUseCase } from '../../../application/use-cases/create-student.use-case';

@Controller()
export class CreateStudentCommand {
  constructor(private readonly student$: StudentService) {}

  @MessagePattern('Students.CreateStudent')
  execute(@Payload() student: NewStudentDTO): void {
    try {
      const useCase = new CreateStudentUseCase(this.student$);
      useCase.execute(student);
    } catch (error) {
      // TODO: definir qué hacer con el error que llega de validación o error de servidor
      return error;
    }
  }
}
