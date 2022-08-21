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

  /**
   * Obtener todos los estudiantes
   * All the obtained students
   */
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
}
