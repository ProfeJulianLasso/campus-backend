import { Controller } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStudentUseCase } from 'apps/students/src/application/use-cases/create-student.use-case';
import { PersonalInformationDTO } from '../../databases/postgres/data-transfer-objects/personal-information.dto';
import { StudentDTO } from '../../databases/postgres/data-transfer-objects/student.dto';
import { PersonalInformationEntity } from '../../databases/postgres/entities/personal-information.entity';
import { StudentEntity } from '../../databases/postgres/entities/student.entity';
import { StudentWriteRepository } from '../../databases/postgres/repositories/student-write.repository';
import { StudentCreatedSender } from '../../events/senders/student-created.sender';
import { StudentCreatedRsyncSender } from '../../events/rsync-senders/student-created.rsync-sender';
import * as io from 'socket.io-client';

@Controller()
export class CreateStudentCommand {
  constructor(
    private readonly studentCreatedSender: StudentCreatedSender,
    private readonly studentWriteRepository: StudentWriteRepository,
    private readonly studentCreatedSenderRsync: StudentCreatedRsyncSender,
  ) {}

  @MessagePattern('Students.CreateStudent')
  async execute(
    @Payload()
    personalInformation: PersonalInformationDTO,
  ): Promise<StudentDTO> {
    const newStudent = this.transformData(personalInformation);
    const useCase = new CreateStudentUseCase(
      this.studentWriteRepository,
      this.studentCreatedSender,
    );
    const answer = useCase.execute(newStudent);
    answer.then((data) => {
      // Rsync
      this.studentCreatedSenderRsync.enqueue(
        JSON.stringify(instanceToPlain(data)),
      );
      // Websocket
      const socket = io.connect('ws://localhost:3000');
      socket.on('connect', function () {
        console.log('Connected');
        socket.emit('StudentCreated', 'todo ok').close();
      });
    });
    return answer;
  }

  private transformData(
    personalInformation: PersonalInformationDTO,
  ): PersonalInformationEntity {
    const newPersonalInformation = new PersonalInformationEntity(
      personalInformation,
      new StudentEntity(),
    );
    return newPersonalInformation;
  }
}

// // Libraries
// import {
//   BadRequestException,
//   Controller,
//   UseFilters,
//   ValidationPipe,
// } from '@nestjs/common';
// import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

// // Services
// import { StudentWriteService } from '../../databases/postgres/services/student-write.service';

// // Entities
// import { StudentEntity } from '../../databases/postgres/entities/student.entity';
// import { PersonalInformationEntity } from '../../databases/postgres/entities/personal-information.entity';

// // Use Cases
// import { CreateStudentUseCase } from 'apps/students/src/application/use-cases/create-student.use-case';
// import { PersonalInformationDTO } from '../../databases/postgres/data-transfer-objects/personal-information.dto';
// import { MyRpcExceptionFilter } from '../../filters/my-rpc-exception.filter';
// import * as Joi from 'joi';
// import { NewStudentValidationSchema } from 'apps/students/src/application/validation-schemas/new-student.validation-schema';
// import { ValidationException } from 'apps/students/src/application/exceptions/validation.exception';
// import { StudentWriteRepository } from '../../databases/postgres/repositoies/student-write.repository';

// @Controller()
// export class CreateStudentCommand {
//   // private schema: ObjectSchema<typeof NewStudentValidationSchema>;

//   constructor(private readonly studentWriteService: StudentWriteService) {}

//   @UseFilters(new MyRpcExceptionFilter())
//   @MessagePattern('Students.CreateStudent')
//   execute(
//     @Payload(new ValidationPipe({ transform: true }))
//     personalInformation: PersonalInformationDTO,
//   ) {
//     console.log(personalInformation);
//     // this.validateData(personalInformation);
//     // console.log(personalInformation);
//     // const newStudentPersonalInformation = new PersonalInformationEntity(
//     //   personalInformation,
//     //   new StudentEntity(),
//     // );
//     // const useCase = new CreateStudentUseCase(this.studentWriteService);
//     // return useCase.execute(newStudentPersonalInformation);
//   }

//   // private validateData(personalInformation: PersonalInformationDTO) {
//   //   // this.schema = object(NewStudentValidationSchema);
//   //   const schema = Joi.object({
//   //     name: Joi.number().required(),
//   //     // lastName: Joi.string().required(),
//   //     // email: Joi.string().email().required(),
//   //     // photo: Joi.alternatives().try(Joi.string().uri().required()),
//   //   });
//   //   // this.schema = NewStudentValidationSchema;

//   //   schema.validate(personalInformation);

//   //   const validationResult = schema.validate(personalInformation, {
//   //     abortEarly: false,
//   //   });
//   //   if (validationResult.error) {
//   //     console.log('ERRORES APA!!!', validationResult.error);
//   //     throw new RpcException('Invalid credentials.');
//   //     return false;
//   //   }
//   //   // throw new ValidationException(
//   //   //   'Correct errors that occurred when creating a new student',
//   //   //   validationResult.error,
//   //   // );
//   //   return true;
//   // }
// }
