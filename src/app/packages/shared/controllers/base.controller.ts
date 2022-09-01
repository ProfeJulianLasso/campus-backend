import { v4 as uuidv4 } from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { EventsIO } from '../../../../contexts/events-io.handler';
import { BaseRepository } from '../../../../contexts/shared/domain/repositories/base.repository';

export abstract class BaseController<T> {
  protected readonly EventsIO: EventsIO;

  constructor(event: string, service: BaseRepository<T>) {
    this.EventsIO = EventsIO.Instance;
    this.EventsIO.loadGateway(event, service);
  }
  protected async executeEvent<T>({
    event,
    statusSuccess,
    statusError,
    data,
  }: {
    event: string;
    statusSuccess: HttpStatus;
    statusError: HttpStatus;
    data?: any;
  }): Promise<{ status: HttpStatus; data: T | T[] | null }> {
    const info = await new Promise<{
      status: HttpStatus;
      data: T | T[] | null;
    }>((resolve) => {
      const channelSuccess = uuidv4();
      const channelError = `${channelSuccess}.error`;

      const success = (students: T[]) => {
        this.EventsIO.eventEmitter.removeListener(channelError, fail);
        this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
        resolve({
          status: statusSuccess,
          data: students,
        });
      };
      this.EventsIO.eventEmitter.on(channelSuccess, success);

      const fail = (error: any) => {
        this.EventsIO.eventEmitter.removeListener(channelError, fail);
        this.EventsIO.eventEmitter.removeListener(channelSuccess, success);
        resolve({
          status: statusError,
          data: error,
        });
      };
      this.EventsIO.eventEmitter.on(channelError, fail);

      this.EventsIO.eventEmitter.emit(event, {
        data,
        channelSuccess,
        channelError,
      });
    });
    return info;
  }
}
