// Entities
import { CourseEntity } from '../entities/course.entity';

// Object Values
import { BaseValueObject } from '../../../shared/domain/value-objects/base.value-object';
import { GradeEntity } from '../entities/grade.entity';

export class CourseValueObject extends BaseValueObject implements CourseEntity {
  course: string;
  certificate: { id: string; trophies: string[]; badges: string[] };
  grades: GradeEntity[];

  constructor(data: CourseEntity) {
    super(data);
    this.course = data.course;
    this.certificate = data.certificate;
    this.grades = data.grades;
  }
}
