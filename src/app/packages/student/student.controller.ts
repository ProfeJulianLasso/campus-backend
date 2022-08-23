// Libraries
import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DomainEventHandler } from '../../../contexts/domain-events.handler';

// Enums
import { DomainEvents } from '../../../contexts/domain-events.enum';

// Schemas
import { Student } from '../../models/mongo/student.schema';

// Services
import { StudentService } from '../../services/mongo/student.service';

@Controller('student')
export class StudentController {
  private readonly domainEvents: DomainEventHandler;

  constructor(private readonly studentService: StudentService) {
    this.domainEvents = DomainEventHandler.Instance;
    this.domainEvents.ServiceForStudentsContext = this.studentService;
  }

  @Get()
  getAll(@Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    const event = this.domainEvents.command(
      DomainEvents.Students_AllTheObtainedStudents,
      (students: Student[]) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(students);
      },
    );

    // Crear solicitud
    if (typeof event === 'object') this.domainEvents.apply(event.channel);
  }

  @Get(':uuid')
  findByUUID(@Param('uuid') uuid: string, @Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Students_UUIDFound,
      (student: Student | null) => {
        if (!response.headersSent) response.status(HttpStatus.OK).json(student);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Students_FindByUUID, { uuid });
  }

  @Get('fullname/:fullname')
  findByFullname(
    @Param('fullname') fullname: string,
    @Res() response: Response,
  ): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Students_FullNameFound,
      (students: Student[]) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(students);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Students_FindByFullName, { fullname });
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string, @Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Students_EmailFound,
      (student: Student) => {
        if (!response.headersSent) response.status(HttpStatus.OK).json(student);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Students_FindByEmail, { email });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Res() response: Response, @Body() student: Student): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Student_Registered,
      (newStudent: Student) => {
        if (!response.headersSent)
          response.status(HttpStatus.CREATED).json(newStudent);
      },
    );

    // Crear solicitud
    // this.domainEvents.EventEmitter.emit(DomainEvents.Student_Register, student);
    this.domainEvents.apply(DomainEvents.Student_Register, { student });
  }

  @Put(':uuid')
  modify(
    @Res() response: Response,
    @Param('uuid') uuid: string,
    @Body() student: Student,
  ): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Student_Modified,
      (updatedStudent: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(updatedStudent);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Student_Modify, { uuid, student });
  }

  @Patch('activate/:uuid')
  activate(@Res() response: Response, @Param('uuid') uuid: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Student_Activated,
      (activationStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(activationStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Student_Activate, { uuid });
  }

  @Patch('deactivate/:uuid')
  deactivate(@Res() response: Response, @Param('uuid') uuid: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Student_Deactivated,
      (activationStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(activationStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Student_Deactivate, { uuid });
  }

  @Delete(':uuid')
  remove(@Res() response: Response, @Param('uuid') uuid: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.command(
      DomainEvents.Student_Deleted,
      (deletedStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(deletedStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.apply(DomainEvents.Student_Delete, { uuid });
  }
}
