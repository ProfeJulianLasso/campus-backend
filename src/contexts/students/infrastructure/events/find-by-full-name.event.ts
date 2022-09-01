// Libraries
import { EventsIO } from '../../../events-io.handler';

// Enums
import { EventsIOEnum } from '../../../events-io.enum';

// Interfaces
import { ChannelInterface } from '../../../channel.interface';
import { EventBaseEvent } from '../../../../shared/infrastructure/events/event-base.event';

// Use Cases
import { StudentUseCase } from '../../application/student.use-case';

export class FindByFullNameEvent implements EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void {
    events.eventEmitter.on(
      EventsIOEnum.Students_FindByFullName,
      async (info: ChannelInterface<{ fullname: string }>) => {
        try {
          const student = await studentUseCase.findByFullName(
            info.data.fullname,
          );
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );
  }
}
