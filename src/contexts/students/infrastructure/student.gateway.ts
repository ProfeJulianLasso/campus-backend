import { StudentUseCase } from '../application/student.use-case';
import { StudentEntity } from '../domain/entities/student.entity';
import { DomainEvents } from '../../../contexts/domain-events.enum';
import { DomainEventHandler } from '../../../contexts/domain-events.handler';
import { StudentRepository } from '../domain/repositories/student.repository';

export class StudentGateway {
  private readonly studentUseCase: StudentUseCase;
  private readonly domainEvents: DomainEventHandler;

  constructor(
    private readonly studentService: StudentRepository<StudentEntity>,
  ) {
    this.studentUseCase = new StudentUseCase(this.studentService);
    this.domainEvents = DomainEventHandler.Instance;
  }

  async getAllStudents(): Promise<void> {
    const students = await this.studentUseCase.listAll();
    this.domainEvents.apply(
      DomainEvents.Students_AllTheObtainedStudents,
      students,
    );
  }

  async findByUUID({ uuid }: { uuid: string }): Promise<void> {
    const student = await this.studentUseCase.findByUuid(uuid);
    this.domainEvents.apply(DomainEvents.Students_UUIDFound, student);
  }

  async findByFullName({ fullname }: { fullname: string }): Promise<void> {
    const students = await this.studentUseCase.findByFullName(fullname);
    this.domainEvents.apply(DomainEvents.Students_FullNameFound, students);
  }

  async findByEmail({ email }: { email: string }): Promise<void> {
    const student = await this.studentUseCase.findByEmail(email);
    this.domainEvents.apply(DomainEvents.Students_EmailFound, student);
  }

  async register({ student }: { student: StudentEntity }): Promise<void> {
    try {
      const newStudent = await this.studentUseCase.register(student);
      this.domainEvents.apply(DomainEvents.Student_Registered, newStudent);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  async modify({
    uuid,
    student,
  }: {
    uuid: string;
    student: StudentEntity;
  }): Promise<void> {
    try {
      const updatedStudent = await this.studentUseCase.modify(uuid, student);
      this.domainEvents.apply(DomainEvents.Student_Modified, updatedStudent);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  async activate({ uuid }: { uuid: string }): Promise<void> {
    const activationStatus = await this.studentUseCase.activate(uuid);
    this.domainEvents.apply(DomainEvents.Student_Activated, activationStatus);
  }

  async deactivate({ uuid }: { uuid: string }): Promise<void> {
    const activationStatus = await this.studentUseCase.deactivate(uuid);
    this.domainEvents.apply(DomainEvents.Student_Deactivated, activationStatus);
  }

  async remove({ uuid }: { uuid: string }): Promise<void> {
    const deletedStatus = await this.studentUseCase.remove(uuid);
    this.domainEvents.apply(DomainEvents.Student_Deleted, deletedStatus);
  }
}
