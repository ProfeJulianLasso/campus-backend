// Libraries
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: `mongodb://${this.configService.get<string>(
        'MONGO_HOST',
      )}:${this.configService.get<string>(
        'MONGO_PORT',
      )}/${this.configService.get<string>('MONGO_DATABASE')}`,
    };
  }
}
