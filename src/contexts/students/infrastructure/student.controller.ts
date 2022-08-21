import { DomainEvents } from 'src/contexts/domain-events.enum';
import { StudentUseCase } from '../application/student.use-case';
import { StudentEntity } from '../domain/entities/student.entity';
import { DomainEventHandler } from 'src/contexts/domain-events.handler';
import { StudentRepository } from '../domain/repositories/student.repository';

export class StudentController {
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
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_AllTheObtainedStudents,
      students,
    );
  }

  async findByUUID(id: string): Promise<void> {
    const student = await this.studentUseCase.findByUuid(id);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_UUIDFound,
      student,
    );
  }

  async findByFullName(fullname: string): Promise<void> {
    const students = await this.studentUseCase.findByFullName(fullname);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_FullNameFound,
      students,
    );
  }

  async findByEmail(email: string): Promise<void> {
    const student = await this.studentUseCase.findByEmail(email);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Students_EmailFound,
      student,
    );
  }
}
