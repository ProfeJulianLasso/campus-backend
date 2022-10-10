import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IStudentRepository } from '../../../../application/repositories/student.repository';
import { StudentDTO } from '../data-transfer-objects/student.dto';

@Injectable()
export class StudentWriteRepository implements IStudentRepository<StudentDTO> {
  readonly queryRunner: QueryRunner;

  constructor(private dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  findAll(): Promise<StudentDTO[]> {
    throw new Error('Method not implemented.');
  }

  async create(student: StudentDTO): Promise<StudentDTO> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    try {
      const newStudent = await this.queryRunner.manager.save(student);
      await this.queryRunner.commitTransaction();
      return newStudent;
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
      //   throw new ServerErrorException(error.message, error.code);
    }
    // finally {
    //   await this.queryRunner.release();
    // }
  }

  update(student: StudentDTO): Promise<StudentDTO | null> {
    throw new Error('Method not implemented.');
  }

  delete(uuid: string): Promise<StudentDTO | null> {
    throw new Error('Method not implemented.');
  }
}
