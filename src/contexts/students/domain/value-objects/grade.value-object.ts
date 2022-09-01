// Entities
import { GradeEntity } from '../entities/grade.entity';

// Object Values
import { BaseValueObject } from '../../../shared/domain/value-objects/base.value-object';

export class GradeValueObject extends BaseValueObject implements GradeEntity {
  grade: number;

  constructor(data: GradeEntity) {
    super(data);
    this.grade = data.grade;
  }
}
