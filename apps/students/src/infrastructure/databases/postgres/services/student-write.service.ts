// import { Injectable } from '@nestjs/common';
// import { DataSource, QueryRunner } from 'typeorm';

// @Injectable()
// export class StudentWriteService implements StudentRepository {
//   readonly queryRunner: QueryRunner;

//   constructor(private dataSource: DataSource) {
//     this.queryRunner = this.dataSource.createQueryRunner();
//   }

//   findAll(): Promise<StudentValueObject[]> {
//     throw new Error('Method not implemented.');
//   }

//   findById(uuid: string): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }

//   async register(student: StudentValueObject): Promise<StudentValueObject> {
//     await this.queryRunner.connect();
//     await this.queryRunner.startTransaction();
//     try {
//       const newStudent = await this.queryRunner.manager.save(student);
//       await this.queryRunner.commitTransaction();
//       return newStudent;
//     } catch (error) {
//       await this.queryRunner.rollbackTransaction();
//       throw new ServerErrorException(error.message, error.code);
//     } finally {
//       await this.queryRunner.release();
//     }
//   }

//   update(uuid: string, student: StudentValueObject): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }

//   delete(uuid: string): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }
// }
