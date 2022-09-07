import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  getHello(): string {
    return 'Hello World!';
  }

  addStudent(student: any): void {
    console.log('New Student', student);
  }
}
