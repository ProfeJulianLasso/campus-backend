import { EventsIO } from '../../../events-io.handler';
import { StudentUseCase } from '../../application/student.use-case';
import { StudentEntity } from '../../domain/entities/student.entity';
import { StudentRepository } from '../../domain/repositories/student.repository';
import { GatewayBaseGateway } from '../../../../shared/infrastructure/gateways/gateway-base.gateway';

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
