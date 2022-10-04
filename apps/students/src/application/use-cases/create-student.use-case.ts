// Libraries
import { object, ObjectSchema } from 'joi';
import { ValidationException } from '../exceptions/validation.exception';

// Value Objects
import { StudentValueObject } from '../../domain/value-objects/student.value-object';

// Repositories
import { StudentRepository } from '../../domain/repositories/student.repository';
import { CreateStudentValidationSchema } from '../validation-schemas/create-student.validation-schema';

// Exceptions
import { ServerErrorException } from '../exceptions/server-error.exception';

export class CreateStudentUseCase {
  private schema: ObjectSchema<typeof CreateStudentValidationSchema>;

  constructor(private readonly student$: StudentRepository) {}

  execute(student: StudentValueObject): StudentValueObject {
    try {
      this.validateData(student);
      const newStudent = this.student$.register(student);
      // avisar que se creó un estudiante EVENTO DE DOMINIO
      return newStudent;
    } catch (error) {
      if (error instanceof ValidationException) throw error;
      else throw new ServerErrorException(error.message, error.code);
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
