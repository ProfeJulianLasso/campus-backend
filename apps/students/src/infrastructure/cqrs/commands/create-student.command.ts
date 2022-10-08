// Libraries
import {
  BadRequestException,
  Controller,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

// Services
import { StudentWriteService } from '../../databases/postgres/services/student-write.service';

// Entities
import { StudentEntity } from '../../databases/postgres/entities/student.entity';
import { PersonalInformationEntity } from '../../databases/postgres/entities/personal-information.entity';

// Use Cases
import { CreateStudentUseCase } from 'apps/students/src/application/use-cases/create-student.use-case';
import { PersonalInformationDTO } from '../../databases/postgres/data-transfer-objects/personal-information.dto';
import { MyRpcExceptionFilter } from '../../filters/my-rpc-exception.filter';
import * as Joi from 'joi';
import { NewStudentValidationSchema } from 'apps/students/src/application/validation-schemas/new-student.validation-schema';
import { ValidationException } from 'apps/students/src/application/exceptions/validation.exception';

@Controller()
export class CreateStudentCommand {
  // private schema: ObjectSchema<typeof NewStudentValidationSchema>;

  constructor(private readonly studentWriteService: StudentWriteService) {}

  @UseFilters(new MyRpcExceptionFilter())
  @MessagePattern('Students.CreateStudent')
  execute(
    @Payload(new ValidationPipe({ transform: true }))
    personalInformation: PersonalInformationDTO,
  ) {
    console.log(personalInformation);
    // this.validateData(personalInformation);
    // console.log(personalInformation);
    // const newStudentPersonalInformation = new PersonalInformationEntity(
    //   personalInformation,
    //   new StudentEntity(),
    // );
    // const useCase = new CreateStudentUseCase(this.studentWriteService);
    // return useCase.execute(newStudentPersonalInformation);
  }

  // private validateData(personalInformation: PersonalInformationDTO) {
  //   // this.schema = object(NewStudentValidationSchema);
  //   const schema = Joi.object({
  //     name: Joi.number().required(),
  //     // lastName: Joi.string().required(),
  //     // email: Joi.string().email().required(),
  //     // photo: Joi.alternatives().try(Joi.string().uri().required()),
  //   });
  //   // this.schema = NewStudentValidationSchema;

  //   schema.validate(personalInformation);

  //   const validationResult = schema.validate(personalInformation, {
  //     abortEarly: false,
  //   });
  //   if (validationResult.error) {
  //     console.log('ERRORES APA!!!', validationResult.error);
  //     throw new RpcException('Invalid credentials.');
  //     return false;
  //   }
  //   // throw new ValidationException(
  //   //   'Correct errors that occurred when creating a new student',
  //   //   validationResult.error,
  //   // );
  //   return true;
  // }
}
