// Entities
import { StudentEntity } from '../entities/student.entity';

// Object Values
import { PersonValueObject } from 'src/contexts/shared/domain/value-objects/person.value-object';

export class StudentValueObject
  extends PersonValueObject
  implements StudentEntity {}
