// Libraries
import { EventEmitter } from 'events';
import { DomainEvents } from './domain-events.enum';

// Controllers
import { StudentController } from './students/infrastructure/student.controller';

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

  /**
   * En presente
   * @param controller
   */
  public loadContextStudents(controller: StudentController): void {
    if (!this.statusLoadContextStudents) {
      this.eventEmitter.on(DomainEvents.Students_GetAllStudents, () => {
        controller.getAllStudents();
      });

      this.eventEmitter.on(DomainEvents.Students_FindByUUID, (id: string) => {
        controller.findByUUID(id);
      });

      this.eventEmitter.on(
        DomainEvents.Students_FindByFullName,
        (fullname: string) => {
          controller.findByFullName(fullname);
        },
      );

      this.eventEmitter.on(
        DomainEvents.Students_FindByEmail,
        (email: string) => {
          controller.findByEmail(email);
        },
      );

      this.statusLoadContextStudents = true;
    }
  }
}
