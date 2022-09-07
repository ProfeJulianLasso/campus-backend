import { Controller, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  getHello(): string {
    return this.teachersService.getHello();
  }
}
