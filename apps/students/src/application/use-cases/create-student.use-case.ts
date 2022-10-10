// Repositories
import { IStudentRepository } from '../repositories/student.repository';

// Entities
import { StudentDomainEntity } from '../../domain/entities/student.domain-entity';
import { PersonalInformationValueObject } from '../../domain/value-objects/personal-information.value-object';
import { StudentCreatedDomainEvent } from '../../domain/events/student-created.domain-event';
import { instanceToPlain } from 'class-transformer';

export class CreateStudentUseCase<T extends StudentDomainEntity> {
  constructor(
    private readonly studentRepository: IStudentRepository<T>,
    private readonly studentCreatedSender: StudentCreatedDomainEvent,
  ) {}

  execute(student: PersonalInformationValueObject): Promise<T> {
    const newStudent = this.studentRepository.create(student);
    newStudent.then((data) => {
      this.studentCreatedSender.enqueue(JSON.stringify(instanceToPlain(data)));
    });
    return newStudent;
  }
}
