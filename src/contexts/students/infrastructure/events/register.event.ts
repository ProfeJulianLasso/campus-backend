import { EventsIO } from '../../../events-io.handler';
import { EventsIOEnum } from '../../../events-io.enum';
import { ChannelInterface } from '../../../channel.interface';
import { StudentUseCase } from '../../application/student.use-case';
import { EventBaseEvent } from '../../../../shared/infrastructure/events/event-base.event';
import { StudentEntity } from '../../domain/entities/student.entity';

export class RegisterEvent implements EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void {
    events.eventEmitter.on(
      EventsIOEnum.Students_Register,
      async (info: ChannelInterface<{ student: StudentEntity }>) => {
        try {
          const student = await studentUseCase.register(info.data.student);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );
  }
}
