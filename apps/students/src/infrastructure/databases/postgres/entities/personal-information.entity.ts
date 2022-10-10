import { PersonalInformationDomainEntity } from 'apps/students/src/domain/entities/personal-information.domain-entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonalInformationDTO } from '../data-transfer-objects/personal-information.dto';
import { StudentEntity } from './student.entity';

@Index(['email', 'deletedAt'], { unique: true })
@Entity('std_personal_information', { schema: 'students' })
export class PersonalInformationEntity extends PersonalInformationDomainEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pif_id',
  })
  uuid: string;

  @Column({
    name: 'pif_student_id',
    type: 'uuid',
  })
  studentId: string;

  @Column({
    name: 'pif_name',
    length: 150,
  })
  name: string;

  @Column({
    name: 'pif_lastname',
    length: 150,
  })
  lastName: string;

  @Column({
    name: 'pif_email',
    length: 150,
  })
  email: string;

  @Column('character varying', {
    name: 'pif_photo',
    length: 500,
    nullable: true,
  })
  photo: string | null;

  @Column({
    name: 'pif_created_by',
    type: 'uuid',
    default: '00000000-0000-0000-0000-000000000000',
  })
  createdBy: string;

  @Column('timestamp without time zone', {
    name: 'pif_created_at',
    default: () => 'now()',
  })
  createdAt: number | Date;

  @Column({
    name: 'pif_updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string | null;

  @Column('timestamp without time zone', {
    name: 'pif_updated_at',
    nullable: true,
  })
  updatedAt: number | Date | null;

  @Column({
    name: 'pif_deleted_by',
    type: 'uuid',
    nullable: true,
  })
  deletedBy: string | null;

  @Column('timestamp without time zone', {
    name: 'pif_deleted_at',
    nullable: true,
  })
  deletedAt: number | Date | null;

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

  constructor(
    newPersonalInformation?: PersonalInformationDTO,
    newStudent?: StudentEntity,
  ) {
    super(newPersonalInformation);
    if (newStudent) this.student = newStudent;
  }
}
