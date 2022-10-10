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
  UseFilters,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { MyRpcExceptionFilter } from './filters/my-rpc-exception.filter';

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

  // @UseFilters(new MyRpcExceptionFilter())
  // @Post()
  // async createStudent(@Res() response: Response, @Body() data: any) {
  //   try {
  //     const info = await lastValueFrom(
  //       this.students.send('Students.CreateStudent', data),
  //     );
  //     console.log('SUPER ERROR', info);
  //     return info;
  //   } catch (error) {
  //     console.log('--------------------------', error);
  //   }
  //   // this.students
  //   //   .send<number>('Students.CreateStudent', data)
  //   //   .subscribe((result) => {
  //   //     console.log('result!!!!----', result);
  //   //     response.status(HttpStatus.OK).json(result);
  //   //   });
  // }

  @UseFilters(new MyRpcExceptionFilter())
  @Post()
  createStudent(@Res() response: Response, @Body() data: any) {
    console.log('controller', data);
    this.students.emit('Students.CreateStudent', data).subscribe({
      next: (result) => {
        console.log('result!!!!----', result);
        response.status(HttpStatus.OK).json(result);
      },
      error: (error) => {
        console.log('error!!!!----', error);
        response.status(HttpStatus.BAD_REQUEST).json(error);
      },
    });
  }
}
