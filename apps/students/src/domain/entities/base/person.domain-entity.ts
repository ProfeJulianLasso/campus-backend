import { IsEmail, IsString, IsUrl, Length, IsOptional } from 'class-validator';

export abstract class PersonDomainEntity {
  @IsString()
  @Length(3, 150, {
    message: 'El nombre debe ser de mínimo 3 caracteres y máximo 150',
  })
  name: string;

  @IsString()
  @Length(3, 150, {
    message: 'El apellido debe ser de mínimo 3 caracteres y máximo 150',
  })
  lastName: string;

  @IsEmail({ IsEmail: true }, { message: 'El correo $value no es valido' })
  email: string;

  @IsUrl(
    { IsUrl: true },
    { message: 'La información que se proporciona, no es una URL valida' },
  )
  @IsOptional()
  photo: string | null;

  constructor(person?: PersonDomainEntity) {
    if (person?.name) this.name = person.name;
    if (person?.lastName) this.lastName = person.lastName;
    if (person?.email) this.email = person.email;
    if (person?.photo) this.photo = person.photo;
  }
}
