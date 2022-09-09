import { Job } from 'bull';
import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';

@Processor('test')
export class AudioConsumer {
  @Process('subcanal')
  async transcode(job: Job<unknown>) {
    // console.log(job);
    console.log(job.data);
    await job.progress(1);
    // await job.remove();
    // (await job.isCompleted()) ? await job.remove() : await job.progress(1);
    // await job.remove();
    // await job.finished();
    // let progress = 0;
    // for (i = 0; i < 100; i++) {
    //   await doSomething(job.data);
    //   progress += 1;
    //   await job.progress(progress);
    // }
    return {
      message: 'hola',
    };
  }

  //   @OnQueueActive()
  //   async onActive(job: Job) {
  //     console.log(`Processing job ${job.id} of type `, job.queue.name);
  //     console.log(await job.returnvalue);
  //   }

  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    console.log(result);
    console.log(
      `Job ${job.id} of type ${job.queue.name} - ${job.name} completed`,
    );
    // console.log(await job.returnvalue);
  }
}
