import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { BaseDomainEntity } from '../../../../domain/entities/base/base.domain-entity';

export class StudentCourseDTO extends BaseDomainEntity {
  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  studentId: string;

  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  courseId: string;

  @IsBoolean({ message: 'El estado es falso o verdadero' })
  @IsOptional()
  status: boolean;

  constructor(studentCourse?: StudentCourseDTO) {
    super(studentCourse);
    this.studentId = studentCourse?.studentId ?? '';
    this.courseId = studentCourse?.courseId ?? '';
    this.status = studentCourse?.status ?? true;
  }
}
