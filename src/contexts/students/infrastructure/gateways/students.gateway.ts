// Libraries
import { EventsIO } from '../../../events-io.handler';

// Interfaces
import { GatewayBaseGateway } from '../../../../shared/infrastructure/gateways/gateway-base.gateway';

// Entities
import { StudentEntity } from '../../domain/entities/student.entity';

// Repositories
import { StudentRepository } from '../../domain/repositories/student.repository';

// Use Cases
import { StudentUseCase } from '../../application/student.use-case';

export class StudentsGateway extends GatewayBaseGateway {
  private readonly studentUseCase: StudentUseCase;

  constructor(
    private readonly studentService: StudentRepository<StudentEntity>,
  ) {
    super();
    this.studentUseCase = new StudentUseCase(this.studentService);
  }

  public loadEvents(events: EventsIO): void {
    const data = this.createDataToLoad(__dirname + '/../events/');
    data.forEach(async (element) => {
      const fileLoaded = await import(element.file);
      const event = new fileLoaded[element.class]();
      event.loadEvent(events, this.studentUseCase);
    });
  }
}
