// Libraries
import { readdirSync } from 'fs';
import { EventsIO } from '../../../events-io.handler';

export abstract class GatewayBaseGateway {
  abstract loadEvents(events: EventsIO): void;
  protected createDataToLoad(
    path: string,
  ): Array<{ file: string; class: string }> {
    const result = new Array<{ file: string; class: string }>();
    readdirSync(path).forEach((file) => {
      const data = {
        file: (file.match(/([a-z\-]+)(\.event)/) as Array<string>).at(
          0,
        ) as string,
        class: '',
      };
      data.class = data.file
        .replace(/\-/g, ' ')
        .replace(/\./g, ' ')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
      data.class = data.class.charAt(0).toUpperCase() + data.class.slice(1);
      if (result.at(result.lastIndexOf(data))?.class !== data.class) {
        data.file = path + data.file;
        result.push(data);
      }
    });
    return result;
  }
}
