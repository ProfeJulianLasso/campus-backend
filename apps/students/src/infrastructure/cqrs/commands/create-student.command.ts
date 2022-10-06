// Libraries
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { StudentSQLService } from '../../databases/postgres/services/student-sql.service';

// Data Transfer Objects
import { StudentDTO } from '../../databases/postgres/data-transfer-objects/student.dto';
import { PersonalInformationDTO } from '../../databases/postgres/data-transfer-objects/personal-information.dto';

// Use Cases
import { CreateStudentUseCase } from 'apps/students/src/application/use-cases/create-student.use-case';
import { StudentEntity } from '../../databases/postgres/entities/student.entity';
import { PersonalInformationEntity } from '../../databases/postgres/entities/personal-information.entity';

@Controller()
export class CreateStudentCommand {
  constructor(private readonly student$: StudentSQLService) {}

  @MessagePattern('Students.CreateStudent')
  execute(
    @Payload(new ValidationPipe({ transform: true }))
    studentPersonalInformation: PersonalInformationEntity,
  ): void {
    try {
      console.log(studentPersonalInformation);
      // const newStudent = new StudentEntity();
      // newStudent.personalInformation = studentPersonalInformation;
      studentPersonalInformation.student = new StudentEntity();
      const useCase = new CreateStudentUseCase(this.student$);
      useCase.execute(studentPersonalInformation);
    } catch (error) {
      // TODO: definir qué hacer con el error que llega de validación o error de servidor
      return error;
    }
  }
}
