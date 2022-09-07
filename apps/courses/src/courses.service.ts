import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  getHello(): string {
    return 'Hello World!';
  }
}
