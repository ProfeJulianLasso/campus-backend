// Libraries
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Modules
import { CoursesModule } from './courses.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoursesModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
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
  );
  await app.listen();
}
bootstrap();
