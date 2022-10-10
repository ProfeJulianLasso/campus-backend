// Libraries
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { StudentDomainEntity } from 'apps/students/src/domain/entities/student.domain-entity';
import { PersonalInformationEntity } from './personal-information.entity';
import { StudentCourseEntity } from './student-course.entity';
import { StudentDTO } from '../data-transfer-objects/student.dto';

@Entity('std_student', { schema: 'students' })
export class StudentEntity extends StudentDomainEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'std_id',
  })
  uuid: string;

  @Column({
    name: 'std_status',
    default: true,
  })
  status: boolean;

  @Column({
    name: 'std_created_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  createdBy: string;

  @Column({
    name: 'std_created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'std_updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string | null;

  @Column({
    name: 'std_updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({
    name: 'std_deleted_by',
    type: 'uuid',
    nullable: true,
  })
  deletedBy: string | null;

  @Column({
    name: 'std_deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(
    () => PersonalInformationEntity,
    (personalInformation) => personalInformation.studentId,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  personalInformation: PersonalInformationEntity;

  @OneToMany(
    () => StudentCourseEntity,
    (studentCourseEntity) => studentCourseEntity.student,
  )
  studentCourses: StudentCourseEntity[];

  constructor(student?: StudentDTO) {
    super(student);
  }
}
