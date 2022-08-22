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

// Gateway
import { StudentGateway } from '../../../contexts/students/infrastructure/student.gateway';

@Controller('student')
export class StudentController {
  private readonly domainEvents: DomainEventHandler;

  constructor(private readonly studentService: StudentService) {
    const studentGateway = new StudentGateway(this.studentService);
    this.domainEvents = DomainEventHandler.Instance;
    this.domainEvents.loadContextStudents(studentGateway);
  }

  @Get()
  getAll(@Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Students_AllTheObtainedStudents,
      (students: Student[]) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(students);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Students_GetAllStudents);
  }

  @Get(':id')
  findByUUID(@Param('id') id: string, @Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Students_UUIDFound,
      (student: Student | null) => {
        if (!response.headersSent) response.status(HttpStatus.OK).json(student);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Students_FindByUUID, id);
  }

  @Get('fullname/:fullname')
  findByFullname(
    @Param('fullname') fullname: string,
    @Res() response: Response,
  ): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Students_FullNameFound,
      (students: Student[]) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(students);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_FindByFullName,
      fullname,
    );
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
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_FindByEmail,
      email,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Res() response: Response, @Body() student: Student): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Student_Registered,
      (newStudent: Student) => {
        if (!response.headersSent)
          response.status(HttpStatus.CREATED).json(newStudent);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Student_Register, student);
  }

  @Put(':id')
  modify(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() student: Student,
  ): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Student_Modified,
      (updatedStudent: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(updatedStudent);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Student_Modify,
      id,
      student,
    );
  }

  @Patch('activate/:id')
  activate(@Res() response: Response, @Param('id') id: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Student_Activated,
      (activationStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(activationStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Student_Activate, id);
  }

  @Patch('deactivate/:id')
  deactivate(@Res() response: Response, @Param('id') id: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Student_Deactivated,
      (activationStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(activationStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Student_Deactivate, id);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: string): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Student_Deleted,
      (deletedStatus: Student | null) => {
        if (!response.headersSent)
          response.status(HttpStatus.OK).json(deletedStatus);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Student_Delete, id);
  }
}
