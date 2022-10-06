// Entities
import { PersonEntity } from '../entities/base/person.entity';
// import { CourseEntity } from '../entities/course.entity';
import { StudentEntity } from '../entities/student.entity';
import { BaseValueObject } from './base/base.value-object';

// export class StudentValueObject extends BaseValueObject implements StudentEntity {
export class StudentValueObject extends BaseValueObject {
  personalInformation: PersonEntity;
  // courses: CourseEntity[];

  constructor(student: StudentEntity) {
    super(student);
    this.personalInformation = student.personalInformation;
    // this.courses = student.courses;
  }
}
