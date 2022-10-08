import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  @IsOptional()
  uuid: string;

  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  @IsOptional()
  createdBy: string;

  @IsDate({
    message: 'La fecha proporcionada no es valida',
  })
  @IsOptional()
  createdAt: string | number | Date;

  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  @IsOptional()
  updatedBy?: string | null;

  @IsDate({
    message: 'La fecha proporcionada no es valida',
  })
  @IsOptional()
  updatedAt?: string | number | Date | null;

  @IsUUID(4, {
    message:
      'El ID proporcionado no cumple con las especificaciones de un UUID v4',
  })
  @IsOptional()
  deletedBy?: string | null;

  @IsDate({
    message: 'La fecha proporcionada no es valida',
  })
  @IsOptional()
  deletedAt?: string | number | Date | null;

  constructor(base?: BaseEntity) {
    this.uuid = base?.uuid ?? uuid();
    this.createdBy = base?.createdBy ?? '00000000-0000-0000-0000-000000000000';
    this.createdAt = base?.createdAt ?? Date.now();
    if (base?.updatedBy) this.updatedBy = base.updatedBy;
    if (base?.updatedAt) this.updatedAt = base.updatedAt;
    if (base?.deletedBy) this.deletedBy = base.deletedBy;
    if (base?.deletedAt) this.deletedAt = base.deletedAt;
  }
}
