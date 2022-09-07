import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @Get()
  // getHello(): string {
  //   return this.studentsService.getHello();
  // }

  @EventPattern('NewStudent')
  newStudent(data: any) {
    console.log('Aqui en el students');
    this.studentsService.addStudent(data);
  }

  @MessagePattern('NewStudent')
  getNotifications(@Payload() data: any, @Ctx() context: RedisContext) {
    console.log(`Students:`, data);
  }
}
