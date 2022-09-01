import { EventsIO } from '../../../contexts/events-io.handler';
import { StudentUseCase } from '../../../contexts/students/application/student.use-case';

export interface EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void;
}
