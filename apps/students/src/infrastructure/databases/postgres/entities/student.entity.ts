// // import { CourseEntity } from 'apps/students/src/domain/entities/course.entity';
// import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// // import { BaseInterface } from '../interfaces/base/base.interface';
// // import { StudentInterface } from '../interfaces/student.interface';
// import { PersonalInformationEntity } from './personal-information.entity';

// @Entity('std_student', { schema: 'students' })
// // export class StudentEntity implements BaseInterface, StudentInterface {
// export class StudentEntity {
//   @PrimaryGeneratedColumn('uuid', {
//     name: 'std_id',
//   })
//   uuid: string;

//   @OneToOne(
//     () => PersonalInformationEntity,
//     (personalInformation) => personalInformation.studentId,
//     { cascade: ['insert'], onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
//   )
//   personalInformation: PersonalInformationEntity;

//   // TODO: falta la relación con los cursos
//   // courses: CourseEntity[];

//   @Column({
//     name: 'std_status',
//     nullable: false,
//     default: true,
//   })
//   status: boolean;

//   @Column({
//     name: 'std_created_at',
//     nullable: false,
//     type: 'timestamptz',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;

//   @Column({
//     name: 'std_created_by',
//     nullable: false,
//     length: 36,
//     default: () => '0',
//   })
//   createdBy: string;

//   @Column({
//     name: 'std_updated_at',
//     nullable: true,
//     type: 'timestamptz',
//   })
//   updatedAt: Date | null;

//   @Column('character varying', {
//     name: 'std_updated_by',
//     nullable: true,
//     length: 36,
//   })
//   updatedBy: string | null;

//   @Column({
//     name: 'std_deleted_at',
//     nullable: true,
//     type: 'timestamptz',
//   })
//   deletedAt: Date | null;

//   @Column('character varying', {
//     name: 'std_deleted_by',
//     nullable: true,
//     length: 36,
//   })
//   deletedBy: string | null;
// }
