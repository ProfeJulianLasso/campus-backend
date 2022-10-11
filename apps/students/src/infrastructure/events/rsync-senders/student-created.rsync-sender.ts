// Libraries
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { StudentCreatedDomainEvent } from 'apps/students/src/domain/events/student-created.domain-event';

@Injectable()
export class StudentCreatedRsyncSender extends StudentCreatedDomainEvent {
  constructor(@InjectQueue('rsync') private campusQueue: Queue) {
    super();
  }

  enqueue(student: string): void {
    this.campusQueue.add(this.channel, student);
  }
}
