// Enums
import { State } from '../../../../shared/utilities/enums/state.enum';

// Entities
import { StudentEntity } from '../entities/student.entity';

// Object Values
import { BaseValueObject } from '../../../../shared/domain/value-objects/base.value-object';

export class StudentValueObject
  extends BaseValueObject
  implements StudentEntity
{
  name: string;
  lastName: string;
  email: string;
  photo: string | null;
  status: boolean;

  constructor(data: StudentEntity) {
    super(data);
    this.name = data.name;
    this.lastName = data.lastName;
    this.email = data.email;
    this.photo = data.photo ?? null;
    this.status = data.status ?? Boolean(State.ACTIVE);
  }
}
