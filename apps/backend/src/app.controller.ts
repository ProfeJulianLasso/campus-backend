import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(@Inject('STUDENTS') private readonly students: ClientProxy) {}

  @Get('student')
  async getAllStudents(@Res() response: Response) {
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
}
