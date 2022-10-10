// Libraries
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

// Entities
import { BaseDomainEntity } from './base/base.domain-entity';

export abstract class CourseDomainEntity extends BaseDomainEntity {
  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  uuid: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  name: string;

  @IsString()
  @MaxLength(2048)
  @IsOptional()
  description: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  status: boolean;

  constructor(course?: CourseDomainEntity) {
    super(course);
    if (course?.uuid) this.uuid = course.uuid;
    if (course?.name) this.name = course.name;
    if (course?.description) this.description = course.description;
    if (course?.photo) this.photo = course.photo;
    this.status = course?.status ?? true;
  }
}
