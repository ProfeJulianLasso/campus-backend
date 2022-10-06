// Libraries
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Modules
import { StudentsModule } from './students.module';
// import { Queue } from 'bull';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StudentsModule,
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

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen();
}
bootstrap();
