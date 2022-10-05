import { CourseEntity } from 'apps/students/src/domain/entities/course.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseInterface } from '../interfaces/base/base.interface';
import { StudentInterface } from '../interfaces/student.interface';
import { PersonalInformationEntity } from './personal-information.entity';

@Entity({
  name: 'std_student',
  schema: 'students',
})
@Index(['email', 'deletedAt'], { unique: true })
export class StudentEntity implements BaseInterface, StudentInterface {
  // personalInformation: PersonEntity;
  courses: CourseEntity[];
  @PrimaryGeneratedColumn('uuid', {
    name: 'std_id',
  })
  uuid: string;

  @OneToOne(() => PersonalInformationEntity)
  @JoinColumn({
    name: 'std_personal_information_id',
    referencedColumnName
  })
  personalInformation: PersonalInformationEntity;

  // @Column({
  //   name: 'std_name',
  //   length: 150,
  //   nullable: false,
  // })
  // name: string;

  // @Column({
  //   name: 'std_last_name',
  //   length: 150,
  //   nullable: false,
  // })
  // lastName: string;

  // @Column({
  //   name: 'std_email',
  //   length: 150,
  //   nullable: false,
  // })
  // email: string;

  // @Column({
  //   name: 'std_photo',
  //   length: 500,
  //   nullable: true,
  // })
  // photo: string | null;

  @Column({
    name: 'std_status',
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column({
    name: 'std_created_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'std_created_by',
    nullable: false,
    length: 36,
    default: () => '0',
  })
  createdBy: string;

  @Column({
    name: 'std_updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt: Date | null;

  @Column({
    name: 'std_updated_by',
    nullable: false,
    length: 36,
  })
  updatedBy: string | null;

  @Column({
    name: 'std_deleted_at',
    nullable: true,
    type: 'timestamptz',
  })
  deletedAt: Date | null;

  @Column({
    name: 'std_deleted_by',
    nullable: false,
    length: 36,
  })
  deletedBy: string | null;
}
