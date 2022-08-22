import { StudentsEventsEnum } from './students/infrastructure/students-events.enum';

export const DomainEvents = { ...StudentsEventsEnum };
export type DomainEventsType = StudentsEventsEnum; // | DoorFrame;
