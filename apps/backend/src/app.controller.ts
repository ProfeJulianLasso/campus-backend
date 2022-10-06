import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';

@Controller('student')
export class AppController {
  constructor(@Inject('STUDENTS') private readonly students: ClientProxy) {}

  @Get()
  getAllStudents(@Res() response: Response) {
    this.students
      .send<number>('Students.GetAllStudents', {})
      .subscribe((result) => {
        response.status(HttpStatus.OK).json(result);
      });
    // const data = await lastValueFrom(
    //   this.students.send('Students.GetAllStudents', {}),
    // );
    // console.log('data', data);
    // return data;
  }

  @Post()
  createStudent(@Res() response: Response, @Body() data: any): void {
    this.students
      .send<number>('Students.CreateStudent', data)
      .subscribe((result) => {
        response.status(HttpStatus.OK).json(result);
      });
  }
}
