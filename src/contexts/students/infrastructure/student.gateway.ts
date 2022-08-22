import { DomainEvents } from 'src/contexts/domain-events.enum';
import { StudentUseCase } from '../application/student.use-case';
import { StudentEntity } from '../domain/entities/student.entity';
import { DomainEventHandler } from 'src/contexts/domain-events.handler';
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

  async register(student: StudentEntity): Promise<void> {
    try {
      const newStudent = await this.studentUseCase.register(student);
      this.domainEvents.EventEmitter.emit(
        DomainEvents.Student_Registered,
        newStudent,
      );
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  async modify(uuid: string, student: StudentEntity): Promise<void> {
    try {
      const updatedStudent = await this.studentUseCase.modify(uuid, student);
      this.domainEvents.EventEmitter.emit(
        DomainEvents.Student_Modified,
        updatedStudent,
      );
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  async activate(uuid: string): Promise<void> {
    const activationStatus = await this.studentUseCase.activate(uuid);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Student_Activated,
      activationStatus,
    );
  }

  async deactivate(uuid: string): Promise<void> {
    const activationStatus = await this.studentUseCase.deactivate(uuid);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Student_Deactivated,
      activationStatus,
    );
  }

  async remove(uuid: string): Promise<void> {
    const deletedStatus = await this.studentUseCase.remove(uuid);
    this.domainEvents.EventEmitter.emit(
      DomainEvents.Student_Deleted,
      deletedStatus,
    );
  }
}
