import { EventsIO } from '../../../events-io.handler';
import { EventsIOEnum } from '../../../events-io.enum';
import { ChannelInterface } from '../../../channel.interface';
import { StudentUseCase } from '../../application/student.use-case';
import { EventBaseEvent } from '../../../../shared/infrastructure/events/event-base.event';

export class DeleteEvent implements EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void {
    events.eventEmitter.on(
      EventsIOEnum.Students_Delete,
      async (info: ChannelInterface<{ uuid: string }>) => {
        try {
          const student = await studentUseCase.remove(info.data.uuid);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );
  }
}
