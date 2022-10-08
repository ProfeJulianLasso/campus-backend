// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Student, StudentDocument } from '../schemas/student.schema';
// import { StudentRepository } from '../../../../application/repositories/student.repository';
// import { StudentValueObject } from 'apps/students/src/domain/value-objects/student.value-object';

// @Injectable()
// export class StudentReadService implements StudentRepository {
//   constructor(
//     @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
//   ) {}

//   findAll(): Promise<StudentValueObject[]> {
//     return Promise.resolve(
//       this.studentModel.find({ deletedAt: null }, { _id: 0 }),
//     );
//   }

//   findById(uuid: string): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }

//   register(student: StudentValueObject): Promise<StudentValueObject> {
//     throw new Error('Method not implemented.');
//   }

//   update(uuid: string, student: StudentValueObject): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }

//   delete(uuid: string): StudentValueObject {
//     throw new Error('Method not implemented.');
//   }
// }

// // Libraries
// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';

// // Enums
// import { State } from '../../../shared/utilities/enums/state.enum';

// // Repositories
// import { StudentRepository } from '../../../contexts/students/domain/repositories/student.repository';

// // Schemas
// import {
//   Student,
//   StudentDocument,
// } from '../../../app/models/mongo/student.schema';

// @Injectable()
// export class StudentService implements StudentRepository<Student> {
//   constructor(
//     @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
//   ) {}

//   findByEmail(email: string): Promise<Student | null> {
//     return Promise.resolve(
//       this.studentModel.findOne({
//         $and: [{ email }, { deletedAt: null }],
//       }),
//     );
//   }

//   findByName(name: string): Promise<Student[]> {
//     return Promise.resolve(
//       this.studentModel.find({
//         $and: [
//           { deletedAt: null },
//           {
//             name: {
//               $regex: new RegExp(name, 'i'),
//             },
//           },
//         ],
//       }),
//     );
//   }

//   findByLastName(lastName: string): Promise<Student[]> {
//     return Promise.resolve(
//       this.studentModel.find({
//         $and: [
//           { deletedAt: null },
//           {
//             lastName: {
//               $regex: new RegExp(lastName, 'i'),
//             },
//           },
//         ],
//       }),
//     );
//   }

//   enable(uuid: string): Promise<Student | null> {
//     return Promise.resolve(
//       this.studentModel.findOneAndUpdate(
//         {
//           $and: [{ uuid }, { deletedAt: null }],
//         },
//         {
//           updatedAt: new Date(),
//           status: State.ACTIVE,
//         },
//       ),
//     );
//   }

//   disable(uuid: string): Promise<Student | null> {
//     return Promise.resolve(
//       this.studentModel.findOneAndUpdate(
//         {
//           $and: [{ uuid }, { deletedAt: null }],
//         },
//         {
//           updatedAt: new Date(),
//           status: State.INACTIVE,
//         },
//       ),
//     );
//   }

//   listAll(): Promise<Student[]> {
//     return Promise.resolve(this.studentModel.find({ deletedAt: null }));
//   }

//   findByUuid(uuid: string): Promise<Student | null> {
//     return Promise.resolve(
//       this.studentModel.findOne({ uuid, deletedAt: null }),
//     );
//   }

//   save(student: Student): Promise<Student> {
//     return Promise.resolve(new this.studentModel(student).save());
//   }

//   update(student: Student): Promise<Student | null> {
//     student.updatedAt = new Date();
//     return Promise.resolve(
//       this.studentModel.findOneAndUpdate(
//         {
//           $and: [{ uuid: student.uuid }, { deletedAt: null }],
//         },
//         student,
//       ),
//     );
//   }

//   delete(uuid: string): Promise<Student | null> {
//     return Promise.resolve(
//       this.studentModel.findOneAndUpdate(
//         { $and: [{ uuid }, { deletedAt: null }] },
//         { updatedAt: new Date(), deletedAt: new Date() },
//       ),
//     );
//   }
// }
