import { ChannelInterface } from 'src/contexts/channel.interface';
import { EventsIOEnum } from 'src/contexts/events-io.enum';
import { EventsIO } from '../../events-io.handler';
import { StudentUseCase } from '../application/student.use-case';
import { StudentEntity } from '../domain/entities/student.entity';
import { StudentRepository } from '../domain/repositories/student.repository';

export class StudentsGateway {
  private readonly studentUseCase: StudentUseCase;

  constructor(
    private readonly studentService: StudentRepository<StudentEntity>,
  ) {
    this.studentUseCase = new StudentUseCase(this.studentService);
  }

  public loadEvents(events: EventsIO): void {
    events.eventEmitter.on(
      EventsIOEnum.Students_GetAllStudents,
      async (info: ChannelInterface<void>) => {
        try {
          const students = await this.studentUseCase.listAll();
          events.eventEmitter.emit(info.channelSuccess, students);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_FindByUUID,
      async (info: ChannelInterface<{ uuid: string }>) => {
        try {
          const student = await this.studentUseCase.findByUuid(info.data.uuid);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_FindByFullName,
      async (info: ChannelInterface<{ fullname: string }>) => {
        try {
          const student = await this.studentUseCase.findByFullName(
            info.data.fullname,
          );
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_FindByEmail,
      async (info: ChannelInterface<{ email: string }>) => {
        try {
          const student = await this.studentUseCase.findByEmail(
            info.data.email,
          );
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_Register,
      async (info: ChannelInterface<{ student: StudentEntity }>) => {
        try {
          const student = await this.studentUseCase.register(info.data.student);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_Modify,
      async (
        info: ChannelInterface<{ uuid: string; student: StudentEntity }>,
      ) => {
        try {
          const student = await this.studentUseCase.modify(
            info.data.uuid,
            info.data.student,
          );
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_Activate,
      async (info: ChannelInterface<{ uuid: string }>) => {
        try {
          const student = await this.studentUseCase.activate(info.data.uuid);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_Deactivate,
      async (info: ChannelInterface<{ uuid: string }>) => {
        try {
          const student = await this.studentUseCase.deactivate(info.data.uuid);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );

    events.eventEmitter.on(
      EventsIOEnum.Students_Delete,
      async (info: ChannelInterface<{ uuid: string }>) => {
        try {
          const student = await this.studentUseCase.remove(info.data.uuid);
          events.eventEmitter.emit(info.channelSuccess, student);
        } catch (error) {
          events.eventEmitter.emit(info.channelError, error);
        }
      },
    );
  }
}
