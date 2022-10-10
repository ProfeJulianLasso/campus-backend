// Libraries
import {
  Column,
  Entity,
  // Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { CourseDomainEntity } from '../../../../domain/entities/course.domain-entity';
import { StudentCourseEntity } from './student-course.entity';

// @Index(['studentId', 'courseId', 'deletedAt'], { unique: true })
@Entity('crs_course', { schema: 'courses' })
export class CourseEntity extends CourseDomainEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'crs_id',
  })
  uuid: string;

  @Column({
    name: 'crs_name',
    length: 200,
  })
  name: string;

  @Column({
    name: 'crs_description',
    length: 2048,
  })
  description: string;

  @Column({
    name: 'crs_photo',
    length: 500,
    nullable: true,
  })
  photo: string;

  @Column({
    name: 'crs_status',
    default: true,
  })
  status: boolean;

  @Column({
    name: 'crs_created_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  createdBy: string;

  @Column({
    name: 'crs_created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'crs_updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string | null;

  @Column({
    name: 'crs_updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({
    name: 'crs_deleted_by',
    type: 'uuid',
    nullable: true,
  })
  deletedBy: string | null;

  @Column({
    name: 'crs_deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => StudentCourseEntity,
    (studentCourseEntity) => studentCourseEntity.course,
  )
  studentCourses: StudentCourseEntity[];
}
