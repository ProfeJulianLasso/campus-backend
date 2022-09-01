// Entities
import { State } from '../../utilities/enums/state.enum';

// Entities
import { PersonEntity } from '../entities/person.entity';

// Value Objects
import { BaseValueObject } from './base.value-object';

export class PersonValueObject extends BaseValueObject implements PersonEntity {
  name: string;
  lastName: string;
  email: string;
  photo: string | null;
  status: boolean;

  constructor(data: PersonEntity) {
    super(data);
    this.name = data.name;
    this.lastName = data.lastName;
    this.email = data.email;
    this.photo = data.photo ?? null;
    this.status = data.status ?? Boolean(State.ACTIVE);
  }
}
