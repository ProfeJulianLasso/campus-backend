// // import { v4 as uuid } from 'uuid';
// import { BaseInterface } from '../../interfaces/base/base.interface';
// import { IsUUID, IsOptional, IsDate } from 'class-validator';

// export class BaseDTO implements BaseInterface {
//   @IsUUID(4, {
//     message:
//       'El ID proporcionado no cumple con las especificaciones de un UUID v4',
//   })
//   @IsOptional()
//   uuid: string;

//   @IsUUID(4, {
//     message:
//       'El ID proporcionado no cumple con las especificaciones de un UUID v4',
//   })
//   @IsOptional()
//   createdBy: string;

//   @IsDate({
//     message: 'La fecha proporcionada no es valida',
//   })
//   @IsOptional()
//   createdAt: string | number | Date;

//   @IsUUID(4, {
//     message:
//       'El ID proporcionado no cumple con las especificaciones de un UUID v4',
//   })
//   @IsOptional()
//   updatedBy: string | null;

//   @IsOptional()
//   updatedAt: string | number | Date | null;

//   @IsUUID(4, {
//     message:
//       'El ID proporcionado no cumple con las especificaciones de un UUID v4',
//   })
//   @IsOptional()
//   deletedBy: string | null;

//   @IsOptional()
//   deletedAt: string | number | Date | null;

//   // constructor(base: BaseInterface) {
//   //   this.uuid = base?.uuid ?? uuid();
//   //   this.createdAt = base?.createdAt ?? Date.now();
//   //   this.createdBy = base?.createdBy ?? '00000000-0000-0000-0000-000000000000';
//   // }
// }
