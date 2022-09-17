// Libraries
import { object, ObjectSchema } from 'joi';
import { ValidationException } from '../exceptions/validation.exception';

// Value Objects
import { StudentValueObject } from '../../domain/value-objects/student.value-object';

// Repositories
import { StudentRepository } from '../../domain/repositories/student.repository';
import { CreateStudentValidationSchema } from '../validation-schemas/create-student.validation-schema';

export class CreateStudentUseCase {
  private schema: ObjectSchema<typeof CreateStudentValidationSchema>;

  constructor(private readonly student$: StudentRepository) {}

  execute(student: StudentValueObject): StudentValueObject {
    try {
      this.validateData(student);
      const newStudent = this.student$.register(student);
      return newStudent;
    } catch (error) {
      console.error('CreateStudentUseCase', error);
      throw error;
    }
  }

  private validateData(student: StudentValueObject): boolean {
    this.schema = object(CreateStudentValidationSchema);
    const validationResult = this.schema.validate(student, {
      abortEarly: false,
    });
    if (validationResult.error)
      throw new ValidationException(
        'Correct errors that occurred when creating a new student',
        validationResult.error,
      );
    return true;
  }
}
