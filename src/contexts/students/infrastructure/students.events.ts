import { DomainEvents } from '../../../contexts/domain-events.enum';
import { DomainEventHandler } from '../../../contexts/domain-events.handler';
import { StudentEntity } from '../domain/entities/student.entity';
import { StudentRepository } from '../domain/repositories/student.repository';
import { StudentGateway } from './student.gateway';

export class StudentsEvents {
  private readonly gateway: StudentGateway;
  private statusLoadContextEvents: boolean;

  constructor(service: StudentRepository<StudentEntity>) {
    this.statusLoadContextEvents = false;
    this.gateway = new StudentGateway(service);
  }

  public load(events: DomainEventHandler): void {
    if (!this.statusLoadContextEvents) {
      events.command(DomainEvents.Students_GetAllStudents, () => {
        this.gateway.getAllStudents();
      });

      events.command(
        DomainEvents.Students_FindByUUID,
        ({ uuid }: { uuid: string }) => {
          this.gateway.findByUUID({ uuid });
        },
      );

      events.command(
        DomainEvents.Students_FindByFullName,
        ({ fullname }: { fullname: string }) => {
          this.gateway.findByFullName({ fullname });
        },
      );

      events.command(
        DomainEvents.Students_FindByEmail,
        ({ email }: { email: string }) => {
          this.gateway.findByEmail({ email });
        },
      );

      events.command(
        DomainEvents.Student_Register,
        ({ student }: { student: StudentEntity }) => {
          this.gateway.register({ student });
        },
      );

      events.command(
        DomainEvents.Student_Modify,
        ({ uuid, student }: { uuid: string; student: StudentEntity }) => {
          this.gateway.modify({ uuid, student });
        },
      );

      events.command(
        DomainEvents.Student_Activate,
        ({ uuid }: { uuid: string }) => {
          this.gateway.activate({ uuid });
        },
      );

      events.command(
        DomainEvents.Student_Deactivate,
        ({ uuid }: { uuid: string }) => {
          this.gateway.deactivate({ uuid });
        },
      );

      events.command(
        DomainEvents.Student_Delete,
        ({ uuid }: { uuid: string }) => {
          this.gateway.remove({ uuid });
        },
      );

      this.statusLoadContextEvents = true;
    }
  }
}
