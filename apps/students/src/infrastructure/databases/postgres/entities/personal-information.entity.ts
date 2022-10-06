import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonalInformationDTO } from '../data-transfer-objects/personal-information.dto';
import { StudentDTO } from '../data-transfer-objects/student.dto';
import { BaseInterface } from '../interfaces/base/base.interface';
import { PersonalInformationInterface } from '../interfaces/personal-information.interface';
import { StudentEntity } from './student.entity';

@Entity('std_personal_information', { schema: 'students' })
@Index(['email', 'deletedAt'], { unique: true })
export class PersonalInformationEntity
  implements BaseInterface, PersonalInformationInterface
{
  constructor(
    personalInformation?: PersonalInformationDTO,
    student?: StudentDTO,
  ) {
    this.uuid = personalInformation?.uuid ?? '';
    this.name = personalInformation?.name ?? '';
    this.lastName = personalInformation?.lastName ?? '';
    this.email = personalInformation?.email ?? '';
    this.photo = personalInformation?.photo ?? null;
    if (typeof personalInformation?.createdBy !== 'undefined')
      this.createdBy = personalInformation.createdBy;
    if (typeof personalInformation?.createdAt === 'object')
      this.createdAt = personalInformation.createdAt;
    if (student instanceof StudentEntity) this.student = student;
  }

  @PrimaryGeneratedColumn('uuid', {
    name: 'pif_id',
  })
  uuid: string;

  @Column({
    name: 'pif_student_id',
    nullable: false,
  })
  studentId: string;

  @Column({
    name: 'pif_name',
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'pif_lastname',
    length: 150,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'pif_email',
    length: 150,
    nullable: false,
  })
  email: string;

  @Column('character varying', {
    name: 'pif_photo',
    length: 500,
    nullable: true,
  })
  photo: string | null;

  @Column('timestamp without time zone', {
    name: 'pif_created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: number | Date;

  @Column({
    name: 'pif_created_by',
    nullable: false,
    length: 36,
    default: () => '0',
  })
  createdBy: string;

  @Column('timestamp without time zone', {
    name: 'pif_updated_at',
    nullable: true,
  })
  updatedAt: number | Date | null;

  @Column('character varying', {
    name: 'pif_updated_by',
    nullable: true,
    length: 36,
  })
  updatedBy: string | null;

  @Column('timestamp without time zone', {
    name: 'pif_deleted_at',
    nullable: true,
  })
  deletedAt: number | Date | null;

  @Column('character varying', {
    name: 'pif_deleted_by',
    nullable: true,
    length: 36,
  })
  deletedBy: string | null;

  @OneToOne(() => StudentEntity, (studentEntity) => studentEntity.uuid, {
    cascade: ['insert'],
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({
    name: 'pif_student_id',
    referencedColumnName: 'uuid',
  })
  student: StudentEntity;
}
