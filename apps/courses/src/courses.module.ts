import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CampusConsumer } from './infrastructure/events-listener/campus.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trim()}`,
      ),
    }),
    BullModule.registerQueue({
      name: 'campus',
      redis: {
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
    // BullModule.registerQueueAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     name: 'campus', // configService.get<string>('BROKER_QUEUE_NAME'),
    //     redis: {
    //       host: 'localhost', // configService.get<string>('BROKER_HOST'),
    //       port: 6379, //configService.get<number>('BROKER_PORT'),
    //       db: 0, // configService.get<number>('BROKER_DATABASE'),
    //     },
    //   }),
    // }),
  ],
  controllers: [],
  providers: [CampusConsumer],
})
export class CoursesModule {}
