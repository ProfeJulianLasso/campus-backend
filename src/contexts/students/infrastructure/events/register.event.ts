// Libraries
import { EventsIO } from '../../../events-io.handler';

// Enums
import { EventsIOEnum } from '../../../events-io.enum';

// Interfaces
import { ChannelInterface } from '../../../channel.interface';
import { EventBaseEvent } from '../../../shared/infrastructure/events/event-base.event';

// Entities
import { StudentEntity } from '../../domain/entities/student.entity';

// Use Cases
import { StudentUseCase } from '../../application/student.use-case';

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
