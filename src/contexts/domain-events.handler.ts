// Libraries
import { EventEmitter } from 'events';
import { DomainEventsType } from '../contexts/domain-events.enum';

// Entities
import { StudentEntity } from './students/domain/entities/student.entity';

// Repositories
import { StudentRepository } from './students/domain/repositories/student.repository';

// Events
import { StudentsEvents } from './students/infrastructure/students.events';

export class DomainEventHandler {
  private eventEmitter: EventEmitter;
  private static instance: DomainEventHandler;

  private constructor() {
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

  public command(command: DomainEventsType, callback: any): void {
    this.eventEmitter.on(command, callback);
  }

  public apply(domainEvent: DomainEventsType, data?: any): void {
    this.eventEmitter.emit(domainEvent, data);
  }

  public loadContextStudents(service: StudentRepository<StudentEntity>): void {
    const studentsEvents = new StudentsEvents(service);
    studentsEvents.load(DomainEventHandler.Instance);
  }
}
