// Libraries
import { IsBoolean, IsObject, IsOptional } from 'class-validator';

// Entities
import { CourseDomainEntity } from './course.domain-entity';
import { BaseDomainEntity } from './base/base.domain-entity';
import { PersonalInformationDomainEntity } from './personal-information.domain-entity';

export abstract class StudentDomainEntity extends BaseDomainEntity {
  @IsBoolean({ message: 'El estado es falso o verdadero' })
  @IsOptional()
  status: boolean;

  @IsObject({
    message: 'La información personal no cumple con los datos requeridos',
  })
  personalInformation: PersonalInformationDomainEntity;

  @IsObject()
  @IsOptional()
  courses: CourseDomainEntity[];

  constructor(student?: StudentDomainEntity) {
    super(student);
    this.status = student?.status ?? true;
    if (student?.personalInformation)
      this.personalInformation = student.personalInformation;
    if (student?.courses) this.courses = student.courses;
  }

  registerForACourse(course: CourseDomainEntity) {
    this.courses.push(course);
  }
}
