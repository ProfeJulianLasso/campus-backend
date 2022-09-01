// Libraries
import { EventsIO } from '../../../events-io.handler';

// Use Cases
import { StudentUseCase } from '../../../students/application/student.use-case';

export interface EventBaseEvent {
  loadEvent(events: EventsIO, studentUseCase: StudentUseCase): void;
}
