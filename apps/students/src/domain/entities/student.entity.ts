// Libraries
import { IsBoolean, IsObject, IsOptional } from 'class-validator';

// Entities
import { CourseEntity } from './course.entity';
import { BaseEntity } from './base/base.entity';
import { PersonalInformationEntity } from './personal-information.entity';

export class StudentEntity extends BaseEntity {
  @IsBoolean({ message: 'El estado es falso o verdadero' })
  @IsOptional()
  status: boolean;

  @IsObject({
    message: 'La información personal no cumple con los datos requeridos',
  })
  personalInformation: PersonalInformationEntity;

  @IsObject()
  @IsOptional()
  courses: CourseEntity[];

  constructor(student?: StudentEntity) {
    super(student);
    this.status = student?.status ?? true;
    if (student?.personalInformation)
      this.personalInformation = student.personalInformation;
    if (student?.courses) this.courses = student.courses;
  }

  registerForACourse(course: CourseEntity) {
    this.courses.push(course);
  }
}
