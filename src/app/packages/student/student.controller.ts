// Libraries
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { EventsIO } from '../../../contexts/events-io.handler';
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

// Enums
import { EventsIOEnum } from '../../../contexts/events-io.enum';

// Schemas
import { Student } from '../../models/mongo/student.schema';

// Services
import { StudentService } from '../../services/mongo/student.service';

@Controller('student')
export class StudentController {
  private readonly EventsIO: EventsIO;

  constructor(private readonly studentService: StudentService) {
    this.EventsIO = EventsIO.Instance;
    this.EventsIO.loadGateway('students', this.studentService);
  }

  @Get()
  getAll(@Res() response: Response): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (students: Student[]) => {
      response.status(HttpStatus.OK).json(students);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_GetAllStudents, {
      channelSuccess,
      channelError,
    });
  }

  @Get(':uuid')
  findByUUID(@Param('uuid') uuid: string, @Res() response: Response): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (student: Student | null) => {
      response.status(HttpStatus.OK).json(student);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_FindByUUID, {
      data: { uuid },
      channelSuccess,
      channelError,
    });
  }

  @Get('fullname/:fullname')
  findByFullname(
    @Param('fullname') fullname: string,
    @Res() response: Response,
  ): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (students: Student[]) => {
      response.status(HttpStatus.OK).json(students);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_FindByFullName, {
      data: { fullname },
      channelSuccess,
      channelError,
    });
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string, @Res() response: Response): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (student: Student | null) => {
      response.status(HttpStatus.OK).json(student);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_FindByEmail, {
      data: { email },
      channelSuccess,
      channelError,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Res() response: Response, @Body() student: Student): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (newStudent: Student | null) => {
      // if (!response.headersSent)
      response.status(HttpStatus.CREATED).json(newStudent);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_Register, {
      data: { student },
      channelSuccess,
      channelError,
    });
  }

  @Put(':uuid')
  modify(
    @Res() response: Response,
    @Param('uuid') uuid: string,
    @Body() student: Student,
  ): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (updatedStudent: Student | null) => {
      response.status(HttpStatus.OK).json(updatedStudent);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_Modify, {
      data: { uuid, student },
      channelSuccess,
      channelError,
    });
  }

  @Patch('activate/:uuid')
  activate(@Res() response: Response, @Param('uuid') uuid: string): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (student: Student | null) => {
      response.status(HttpStatus.OK).json(student);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_Activate, {
      data: { uuid },
      channelSuccess,
      channelError,
    });
  }

  @Patch('deactivate/:uuid')
  deactivate(@Res() response: Response, @Param('uuid') uuid: string): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (student: Student | null) => {
      response.status(HttpStatus.OK).json(student);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_Deactivate, {
      data: { uuid },
      channelSuccess,
      channelError,
    });
  }

  @Delete(':uuid')
  remove(@Res() response: Response, @Param('uuid') uuid: string): void {
    const channelSuccess = uuidv4();
    const channelError = `${channelSuccess}.error`;

    const success = (student: Student | null) => {
      response.status(HttpStatus.OK).json(student);
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelSuccess, success);

    const fail = (error: any) => {
      response.status(HttpStatus.BAD_REQUEST).json({ error });
      this.EventsIO.eventEmitter.removeListener(channelError, fail);
      this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
    };
    this.EventsIO.eventEmitter.on(channelError, fail);

    this.EventsIO.eventEmitter.emit(EventsIOEnum.Students_Delete, {
      data: { uuid },
      channelSuccess,
      channelError,
    });
  }
}
