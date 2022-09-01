// Libraries
import { EventsIO } from '../../../events-io.handler';

// Enums
import { EventsIOEnum } from '../../../events-io.enum';

// Interfaces
import { ChannelInterface } from '../../../channel.interface';
import { EventBaseEvent } from '../../../../shared/infrastructure/events/event-base.event';

// Use Cases
import { StudentUseCase } from '../../application/student.use-case';

export class GetAllStudentsEvent implements EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void {
    events.eventEmitter.on(
      EventsIOEnum.Students_GetAllStudents,
      async (info: ChannelInterface<void>) => {
        try {
          const students = await studentUseCase.listAll();
          events.eventEmitter.emit(info.channelSuccess, students);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );
  }
}
