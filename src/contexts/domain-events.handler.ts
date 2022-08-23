// Libraries
import { v4 as uuid } from 'uuid';
import { EventEmitter } from 'events';
import { DomainEventsType } from '../contexts/domain-events.enum';

// Entities
import { StudentEntity } from './students/domain/entities/student.entity';

// Repositories
import { StudentRepository } from './students/domain/repositories/student.repository';

// Events
import { StudentsEvents } from './students/infrastructure/students.events';
import { ChannelInterface } from './channel.interface';

export class DomainEventHandler {
  private eventEmitter: EventEmitter;
  private static instance: DomainEventHandler;
  private pattern: RegExp;
  private eventsStack: Array<string>;
  private serviceForStudentsContext: StudentRepository<StudentEntity>;

  private constructor() {
    this.pattern =
      /([0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12})$/i;
    this.eventsStack = new Array<string>();
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

  set ServiceForStudentsContext(service: StudentRepository<StudentEntity>) {
    this.serviceForStudentsContext = service;
  }

  public command(
    domainEvent: DomainEventsType | string,
    callback: any,
  ): ChannelInterface | void {
    const info = this.createTimestamp(domainEvent) ?? domainEvent;
    if (typeof info === 'string') this.eventEmitter.on(domainEvent, callback);
    else {
      this.eventEmitter.on(info.channel, callback);
      return info;
    }
  }

  public apply(
    domainEvent: DomainEventsType | string,
    data?: any,
  ): ChannelInterface | void {
    const info = this.createTimestamp(domainEvent) ?? domainEvent;
    if (typeof info === 'string') this.eventEmitter.emit(domainEvent, data);
    else {
      this.eventEmitter.emit(info.channel, data);
      return info;
    }
  }

  public loadContextStudents(service: StudentRepository<StudentEntity>): void {
    const studentsEvents = new StudentsEvents(service);
    studentsEvents.load(DomainEventHandler.Instance);
  }

  public createTimestamp(seed: string): ChannelInterface | undefined {
    const possibleTimestamp = seed.match(this.pattern);
    if (
      possibleTimestamp &&
      this.eventsStack.indexOf(possibleTimestamp[0]) !== -1
    ) {
      return undefined;
    }
    const timestamp = uuid();
    this.eventsStack.push(timestamp);
    return { channel: `${seed}.${timestamp}`, timestamp };
  }
}
