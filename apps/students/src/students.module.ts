import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { StudentsGateway } from './infrastructure/students.gateway';
import { StudentsService } from './students.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [StudentsGateway],
  providers: [StudentsService],
})
export class StudentsModule {}
