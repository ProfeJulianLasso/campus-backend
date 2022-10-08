// Repositories
import { IStudentRepository } from '../repositories/student.repository';

// Entities
import { StudentEntity } from '../../domain/entities/student.entity';
import { PersonalInformationEntity } from '../../domain/entities/personal-information.entity';

export class CreateStudentUseCase<T extends StudentEntity> {
  constructor(
    private readonly studentRepository: IStudentRepository<T, StudentEntity>,
  ) {}

  execute(personalInformation: PersonalInformationEntity): Promise<T> {
    const student = new StudentEntity();
    student.personalInformation = personalInformation;
    const newStudent = this.studentRepository.create(student);
    // avisar que se creó un estudiante EVENTO DE DOMINIO
    return newStudent;
  }
}
