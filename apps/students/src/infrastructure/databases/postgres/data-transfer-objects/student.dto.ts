// Interfaces
// import { StudentInterface } from '../interfaces/student.interface';

// Data Transfer Objects
import { IsBoolean, IsObject, IsOptional, IsUUID } from 'class-validator';
import { BaseDTO } from './base/base.dto';
import { PersonalInformationDTO } from './personal-information.dto';

// Entities
// import { CourseEntity } from 'apps/students/src/domain/entities/course.entity';

// export class StudentDTO extends BaseDTO implements StudentInterface {
export class StudentDTO extends BaseDTO {
  @IsObject()
  personalInformation: PersonalInformationDTO;
  // courses: CourseEntity[];

  @IsBoolean()
  @IsOptional()
  status: boolean;

  // constructor(student: StudentDTO) {
  //   super(student);
  //   this.personalInformation = student.personalInformation;
  //   // this.courses = student.courses;
  //   this.status = student.status ?? true;
  // }
}
