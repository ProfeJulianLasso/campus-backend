import { v4 as uuid } from 'uuid';
import { EventEmitter } from 'events';
import { ChannelInterface } from './interfaces/channel.interface';
import { ComunicationInterface } from './interfaces/comunication.interface';

export class LassoIO {
  private static instance: LassoIO;
  public eventsStack: Array<ChannelInterface>;
  private readonly eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventsStack = new Array<ChannelInterface>();
  }

  static get Instance(): LassoIO {
    if (!LassoIO.instance) {
      LassoIO.instance = new LassoIO();
    }
    return LassoIO.instance;
  }

  public add(info: ComunicationInterface): void {
    const indexChannel = this.createTimestamp(info.channel);
    this.callback(indexChannel.end, info.callback);
    this.apply(indexChannel.start, info.apply);
  }

  public loadListeners(context: string, service: unknown): void {
    // cargar los escuchas de los apply por parte de los controladores
    // students.events.ts
  }

  private apply(channel: string, data: object | undefined): void {
    this.eventEmitter.emit(channel, data);
  }

  private callback(channel: string, callback: any): void {
    this.eventEmitter.on(channel, callback);
  }

  private createTimestamp(nameChannel: string): ChannelInterface {
    const data = {
      channel: nameChannel,
      start: uuid(),
      end: uuid(),
      error: uuid(),
    };
    this.apply(nameChannel, data);
    this.eventsStack.push(data);
    return data;
  }
}
