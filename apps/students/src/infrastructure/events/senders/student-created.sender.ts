// Libraries
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { StudentCreatedDomainEvent } from '../../../domain/events/student-created.domain-event';

@Injectable()
export class StudentCreatedSender extends StudentCreatedDomainEvent {
  constructor(@InjectQueue('campus') private campusQueue: Queue) {
    super();
  }

  enqueue(student: string): void {
    this.campusQueue.add(this.channel, student);
  }
}
