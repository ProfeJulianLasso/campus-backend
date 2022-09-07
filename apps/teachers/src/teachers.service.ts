import { Injectable } from '@nestjs/common';

@Injectable()
export class TeachersService {
  getHello(): string {
    return 'Hello World!';
  }
}
