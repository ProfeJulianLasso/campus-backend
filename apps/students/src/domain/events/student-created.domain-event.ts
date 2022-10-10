export abstract class StudentCreatedDomainEvent {
  protected channel: string;

  constructor() {
    this.channel = 'Student.StudentCreated';
  }

  abstract enqueue(student: string): void;
}
