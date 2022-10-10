import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { CoursesService } from './courses.service';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // @Get()
  // getHello(): string {
  //   return this.coursesService.getHello();
  // }

  @MessagePattern('Students.CreateStudent2')
  getNotifications(@Payload() data: any, @Ctx() context: RedisContext) {
    console.log(`Courses:`, data);
  }
}
