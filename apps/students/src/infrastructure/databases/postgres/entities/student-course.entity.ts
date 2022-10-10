// Libraries
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { BaseDomainEntity } from '../../../../domain/entities/base/base.domain-entity';
import { StudentDTO } from '../data-transfer-objects/student.dto';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';
import { StudentCourseDTO } from '../data-transfer-objects/student-course.dto';

@Index(['studentId', 'courseId', 'deletedAt'], { unique: true })
@Entity('std_student_course', { schema: 'students' })
export class StudentCourseEntity extends BaseDomainEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'scs_id',
  })
  uuid: string;

  @Column({
    name: 'scs_student_id',
    type: 'uuid',
  })
  studentId: string;

  @Column({
    name: 'scs_course_id',
    type: 'uuid',
  })
  courseId: string;

  @Column({
    name: 'scs_status',
    default: true,
  })
  status: boolean;

  @Column({
    name: 'scs_created_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  createdBy: string;

  @Column({
    name: 'scs_created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'scs_updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string | null;

  @Column({
    name: 'scs_updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({
    name: 'scs_deleted_by',
    type: 'uuid',
    nullable: true,
  })
  deletedBy: string | null;

  @Column({
    name: 'scs_deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => StudentEntity,
    (studentEntity) => studentEntity.studentCourses,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'scs_student_id', referencedColumnName: 'uuid' }])
  student: StudentEntity;

  @ManyToOne(
    () => CourseEntity,
    (courseEntity) => courseEntity.studentCourses,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'scs_course_id', referencedColumnName: 'uuid' }])
  course: CourseEntity;

  constructor(
    studentCourse?: StudentCourseDTO,
    student?: StudentEntity,
    course?: CourseEntity,
  ) {
    super(student);
    if (studentCourse?.status) this.status = studentCourse.status;
    if (student) this.student = student;
    if (course) this.course = course;
  }
}
