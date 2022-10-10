// Libraries
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Entities
import { StudentDomainEntity } from '../../../../domain/entities/student.domain-entity';

// Schemas
import { Course } from './course.schema';
import { PersonalInformation } from './personal-information.schema';

export type StudentDocument = Student & Document;

@Schema({ collection: 'students', versionKey: false })
export class Student extends StudentDomainEntity {
  @Prop({ index: true, type: String })
  uuid = uuidv4();

  @Prop({ _id: false, required: true })
  personalInformation: PersonalInformation;

  @Prop({ _id: false })
  courses: Course[];

  @Prop({
    type: Boolean,
    required: [true, 'Status is required'],
    default: true,
    enum: {
      values: [1, 0, 'true', 'false'],
      message: 'The data "{VALUE}" is not a valid value',
    },
  })
  status = true;

  @Prop({ type: String })
  createdBy = '00000000-0000-0000-0000-000000000000';

  @Prop({ type: Date })
  createdAt = new Date();

  @Prop()
  updatedBy?: string;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedBy?: string;

  @Prop()
  deletedAt?: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
