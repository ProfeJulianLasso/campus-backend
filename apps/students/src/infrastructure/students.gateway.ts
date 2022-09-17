import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { StudentsService } from '../students.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class StudentsGateway {
  constructor(
    private readonly studentsService: StudentsService,
    @InjectQueue('test') private audioQueue: Queue,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.studentsService.getHello();
  // }

  // @EventPattern('NewStudent')
  // newStudent(data: any) {
  //   console.log('Aqui en el students');
  //   this.studentsService.addStudent(data);
  // }

  @MessagePattern('NewStudent')
  async getNotifications(@Payload() data: any, @Ctx() context: RedisContext) {
    // console.log(`Students:`, data);
    const job = await this.audioQueue.add('subcanal', {
      foo: 'bar',
    });
  }
}
