// import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AudioConsumer } from './test.consumer';

@Module({
  imports: [
    // BullModule.registerQueue({
    //   name: 'test',
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, AudioConsumer],
})
export class CoursesModule {}
