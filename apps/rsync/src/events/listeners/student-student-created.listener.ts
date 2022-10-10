import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { PersonalInformationDTO } from '../../databases/postgres/data-transfer-objects/personal-information.dto';
import { plainToInstance } from 'class-transformer';

@Processor('rsync')
export class StudentStudentCreatedListener {
  @Process('Student.StudentCreated')
  studentCreated(job: Job<unknown>) {
    const data = plainToInstance(
      PersonalInformationDTO,
      JSON.parse(typeof job.data === 'string' ? job.data : ''),
    );
    job.progress(1);
  }
}
