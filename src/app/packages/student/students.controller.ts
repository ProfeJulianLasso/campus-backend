// Libraries
import { Response } from 'express';
import { DomainEvents } from 'src/contexts/domain-events.enum';
import { DomainEventHandler } from 'src/contexts/domain-events.handler';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

// Entities
import { StudentEntity } from 'src/contexts/students/domain/entities/student.entity';

// Services
import { StudentService } from '../../services/mongo/student.service';

// Controllers
import { StudentController } from 'src/contexts/students/infrastructure/student.controller';

@Controller('student')
export class StudentsController {
  private readonly domainEvents: DomainEventHandler;

  constructor(private readonly studentService: StudentService) {
    const studentController = new StudentController(this.studentService);
    this.domainEvents = DomainEventHandler.Instance;
    this.domainEvents.loadContextStudents(studentController);
  }

  @Get()
  getAll(@Res() response: Response): void {
    // Escuchar la respuesta de la solicitud
    this.domainEvents.EventEmitter.on(
      DomainEvents.Students_AllTheObtainedStudents,
      (students: StudentEntity[]) => {
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
      (student: StudentEntity | null) => {
        if (!response.headersSent) response.status(HttpStatus.OK).json(student);
      },
    );

    // Crear solicitud
    this.domainEvents.EventEmitter.emit(DomainEvents.Students_FindByUUID, id);
  }
}
