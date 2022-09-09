import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(@Inject('STUDENTS') private readonly students: ClientProxy) {}

  @Get()
  getHello(): void {
    this.students.emit('NewStudent', {
      message: 'hola mundo',
      data: { nombre: 'Julian', apellido: 'Lasso' },
    });
  }
}
