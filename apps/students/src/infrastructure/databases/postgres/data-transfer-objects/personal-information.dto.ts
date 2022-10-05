import { PersonalInformationInterface } from '../interfaces/personal-information.interface';
import { BaseDTO } from './base/base.dto';

export class PersonalInformationDTO
  extends BaseDTO
  implements PersonalInformationInterface
{
  name: string;
  lastName: string;
  email: string;
  photo: string | null;

  constructor(personalInformation: PersonalInformationDTO) {
    super(personalInformation);
    this.name = personalInformation.name;
    this.lastName = personalInformation.lastName;
    this.email = personalInformation.email;
    this.photo = personalInformation.photo ?? null;
  }
}
