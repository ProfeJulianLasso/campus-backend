import { EventsIO } from '../../../events-io.handler';
import { EventsIOEnum } from '../../../events-io.enum';
import { ChannelInterface } from '../../../channel.interface';
import { StudentUseCase } from '../../application/student.use-case';
import { EventBaseEvent } from '../../../../shared/infrastructure/events/event-base.event';

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
