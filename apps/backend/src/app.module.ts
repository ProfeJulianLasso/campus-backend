// import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENTS',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          db: 0,
        },
        // transport: Transport.RMQ,
        // options: {
        //   urls: ['amqp://localhost:5672'],
        //   queue: 'campus',
        //   queueOptions: {
        //     durable: false,
        //   },
        // },
      },
    ]),
    // BullModule.registerQueue({
    //   name: 'backend',
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //     db: 1,
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
