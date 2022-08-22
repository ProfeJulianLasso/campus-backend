// Libraries
import { EventEmitter } from 'events';
import { DomainEvents } from './domain-events.enum';

// Entities
import { StudentEntity } from './students/domain/entities/student.entity';

// Controllers
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

  public apply(domainEvent: DomainEvents, callback: any): void {
    this.eventEmitter.emit(domainEvent, callback);
  }

  /**
   * En presente
   * @param controller
   */
  public loadContextStudents(gateway: StudentGateway): void {
    if (!this.statusLoadContextStudents) {
      this.eventEmitter.on(DomainEvents.Students_GetAllStudents, () => {
        gateway.getAllStudents();
      });

      this.eventEmitter.on(DomainEvents.Students_FindByUUID, (id: string) => {
        gateway.findByUUID(id);
      });

      this.eventEmitter.on(
        DomainEvents.Students_FindByFullName,
        (fullname: string) => {
          gateway.findByFullName(fullname);
        },
      );

      this.eventEmitter.on(
        DomainEvents.Students_FindByEmail,
        (email: string) => {
          gateway.findByEmail(email);
        },
      );

      this.eventEmitter.on(
        DomainEvents.Student_Register,
        (student: StudentEntity) => {
          gateway.register(student);
        },
      );

      this.eventEmitter.on(
        DomainEvents.Student_Modify,
        (uuid: string, student: StudentEntity) => {
          gateway.modify(uuid, student);
        },
      );

      this.eventEmitter.on(DomainEvents.Student_Activate, (uuid: string) => {
        gateway.activate(uuid);
      });

      this.eventEmitter.on(DomainEvents.Student_Deactivate, (uuid: string) => {
        gateway.deactivate(uuid);
      });

      this.eventEmitter.on(DomainEvents.Student_Delete, (uuid: string) => {
        gateway.remove(uuid);
      });

      this.statusLoadContextStudents = true;
    }
  }
}
