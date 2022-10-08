// Libraries
import { BadRequestException } from '@nestjs/common';
import { IsOptional, IsString, IsUUID } from 'class-validator';

// Entities
import { BaseEntity } from './base/base.entity';

export class CourseEntity extends BaseEntity {
  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  uuid: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  status: boolean;

  constructor(course?: CourseEntity) {
    super(course);
    if (!course?.uuid)
      throw new BadRequestException('El ID del curso es obligatorio');
    this.uuid = course.uuid;
    if (course?.name) this.name = course.name;
    if (course?.description) this.description = course.description;
    if (course?.photo) this.photo = course.photo;
    this.status = course?.status ?? true;
  }
}
