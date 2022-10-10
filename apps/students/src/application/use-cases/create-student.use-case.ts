// Repositories
import { IStudentRepository } from '../repositories/student.repository';

// Entities
import { StudentDomainEntity } from '../../domain/entities/student.domain-entity';
import { PersonalInformationValueObject } from '../../domain/value-objects/personal-information.value-object';

export class CreateStudentUseCase<T extends StudentDomainEntity> {
  constructor(private readonly studentRepository: IStudentRepository<T>) {}

  execute(student: PersonalInformationValueObject): Promise<T> {
    console.log('student----------', student);
    const newStudent = this.studentRepository.create(student);
    // avisar que se creó un estudiante EVENTO DE DOMINIO
    return newStudent;
  }
}
