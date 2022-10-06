import { PersonalInformationInterface } from '../interfaces/personal-information.interface';
import { BaseDTO } from './base/base.dto';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class PersonalInformationDTO
  extends BaseDTO
  implements PersonalInformationInterface
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  photo: string | null;

  // constructor(personalInformation: PersonalInformationDTO) {
  //   super(personalInformation);
  //   this.name = personalInformation.name;
  //   this.lastName = personalInformation.lastName;
  //   this.email = personalInformation.email;
  //   this.photo = personalInformation.photo ?? null;
  // }
}
