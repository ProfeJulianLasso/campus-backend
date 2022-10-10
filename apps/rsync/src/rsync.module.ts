// Libraries
import { join } from 'path';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { StudentStudentCreatedListener } from './events/listeners/student-student-created.listener';

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
      name: 'rsync',
      redis: {
        host: 'localhost',
        port: 6379,
        db: 1,
      },
    }),
  ],
  controllers: [],
  providers: [StudentStudentCreatedListener],
})
export class RsyncModule {}
