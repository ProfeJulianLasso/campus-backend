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

// Enums
import { EventsIOEnum } from '../../../contexts/events-io.enum';

// Schemas
import { Student } from '../../models/mongo/student.schema';

// Services
import { StudentService } from '../../services/mongo/student.service';
import { BaseController } from '../shared/controllers/base.controller';

@Controller('student')
export class StudentController extends BaseController<Student> {
  constructor(private readonly studentService: StudentService) {
    super('students', studentService);
  }

  @Get()
  async getAll(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Student[] | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_GetAllStudents,
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Get(':uuid')
  async findByUUID(
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_FindByUUID,
      data: { uuid },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Get('fullname/:fullname')
  async findByFullname(
    @Param('fullname') fullname: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Student[] | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_FindByFullName,
      data: { fullname },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_FindByEmail,
      data: { email },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() student: Student,
  ): Promise<Student | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_Register,
      data: { student },
      statusSuccess: HttpStatus.CREATED,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Put(':uuid')
  async modify(
    @Res({ passthrough: true }) response: Response,
    @Param('uuid') uuid: string,
    @Body() student: Student,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_Modify,
      data: { uuid, student },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Patch('activate/:uuid')
  async activate(
    @Res({ passthrough: true }) response: Response,
    @Param('uuid') uuid: string,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_Activate,
      data: { uuid },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Patch('deactivate/:uuid')
  async deactivate(
    @Res({ passthrough: true }) response: Response,
    @Param('uuid') uuid: string,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_Deactivate,
      data: { uuid },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }

  @Delete(':uuid')
  async remove(
    @Res({ passthrough: true }) response: Response,
    @Param('uuid') uuid: string,
  ): Promise<Student | null | unknown> {
    const answer = await this.executeEvent<Student>({
      event: EventsIOEnum.Students_Delete,
      data: { uuid },
      statusSuccess: HttpStatus.OK,
      statusError: HttpStatus.BAD_REQUEST,
    });
    response.status(answer.status);
    return answer.data;
  }
}
