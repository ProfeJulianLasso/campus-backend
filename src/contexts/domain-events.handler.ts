// Libraries
import { EventEmitter } from 'events';
import { DomainEvents } from './domain-events.enum';

// Entities
import { StudentEntity } from './students/domain/entities/student.entity';
import { StudentRepository } from './students/domain/repositories/student.repository';
import { StudentGateway } from './students/infrastructure/student.gateway';

export class DomainEventHandler {
  private eventEmitter: EventEmitter;
  private statusLoadContextStudents: boolean;
  private static instance: DomainEventHandler;

  private constructor() {
    this.statusLoadContextStudents = false;
    this.eventEmitter = new EventEmitter();
  }

  static get Instance(): DomainEventHandler {
    if (!DomainEventHandler.instance) {
      DomainEventHandler.instance = new DomainEventHandler();
    }
    return DomainEventHandler.instance;
  }

  get EventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public command(command: DomainEvents, callback: any): void {
    this.eventEmitter.on(command, callback);
  }

  public apply(domainEvent: DomainEvents, data?: any): void {
    this.eventEmitter.emit(domainEvent, data);
  }

  public loadContextStudents(service: StudentRepository<StudentEntity>): void {
    const gateway = new StudentGateway(service);
    if (!this.statusLoadContextStudents) {
      this.command(DomainEvents.Students_GetAllStudents, () => {
        gateway.getAllStudents();
      });

      this.command(
        DomainEvents.Students_FindByUUID,
        ({ uuid }: { uuid: string }) => {
          gateway.findByUUID({ uuid });
        },
      );

      this.command(
        DomainEvents.Students_FindByFullName,
        ({ fullname }: { fullname: string }) => {
          gateway.findByFullName({ fullname });
        },
      );

      this.command(
        DomainEvents.Students_FindByEmail,
        ({ email }: { email: string }) => {
          gateway.findByEmail({ email });
        },
      );

      this.command(
        DomainEvents.Student_Register,
        ({ student }: { student: StudentEntity }) => {
          gateway.register({ student });
        },
      );

      this.command(
        DomainEvents.Student_Modify,
        ({ uuid, student }: { uuid: string; student: StudentEntity }) => {
          gateway.modify({ uuid, student });
        },
      );

      this.command(
        DomainEvents.Student_Activate,
        ({ uuid }: { uuid: string }) => {
          gateway.activate({ uuid });
        },
      );

      this.command(
        DomainEvents.Student_Deactivate,
        ({ uuid }: { uuid: string }) => {
          gateway.deactivate({ uuid });
        },
      );

      this.command(
        DomainEvents.Student_Delete,
        ({ uuid }: { uuid: string }) => {
          gateway.remove({ uuid });
        },
      );

      this.statusLoadContextStudents = true;
    }
  }
}
