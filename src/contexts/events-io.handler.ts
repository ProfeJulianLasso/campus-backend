import { EventEmitter } from 'events';

export class EventsIO {
  private static instance: EventsIO;
  public readonly eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  static get Instance(): EventsIO {
    if (!EventsIO.instance) {
      EventsIO.instance = new EventsIO();
    }
    return EventsIO.instance;
  }

  public apply(channel: string, data: object | undefined): void {
    this.eventEmitter.emit(channel, data);
  }

  public callback(channel: string, callback: any): void {
    this.eventEmitter.on(channel, callback);
  }

  public async loadGateway(context: string, service: any): Promise<void> {
    const file = __dirname + `/${context}/infrastructure/${context}.gateway`;
    const fileLoaded = await import(file);
    const nameClass = Object.keys(fileLoaded).at(0) ?? '';
    const gateway = new fileLoaded[nameClass](service);
    gateway.loadEvents(EventsIO.instance);
  }
}
