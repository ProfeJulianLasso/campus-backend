import { Injectable } from '@nestjs/common';
import { StudentRepository } from 'apps/students/src/domain/repositories/student.repository';
import { StudentValueObject } from 'apps/students/src/domain/value-objects/student.value-object';
import { DataSource, QueryRunner } from 'typeorm';
import { ServerErrorException } from '../../../../application/exceptions/server-error.exception';

@Injectable()
export class StudentService implements StudentRepository {
  readonly queryRunner: QueryRunner;

  constructor(private dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  findAll(): Promise<StudentValueObject[]> {
    throw new Error('Method not implemented.');
  }

  findById(uuid: string): StudentValueObject {
    throw new Error('Method not implemented.');
  }

  async register(student: StudentValueObject): Promise<StudentValueObject> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    try {
      const newStudent = await this.queryRunner.manager.save(student);
      return newStudent;
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new ServerErrorException(error.message, error.code);
    } finally {
      this.queryRunner.release();
    }
  }

  update(uuid: string, student: StudentValueObject): StudentValueObject {
    throw new Error('Method not implemented.');
  }

  delete(uuid: string): StudentValueObject {
    throw new Error('Method not implemented.');
  }
}
