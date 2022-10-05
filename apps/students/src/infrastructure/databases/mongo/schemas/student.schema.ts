import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PersonalInformation } from './personal-information.schema';
import { v4 as uuidv4 } from 'uuid';
import { StudentEntity } from '../interfaces/student.entity';

export type StudentDocument = Student & Document;

@Schema({ collection: 'students', versionKey: false })
// export class Student implements StudentEntity {
export class Student {
  @Prop({ index: true, type: String })
  uuid? = uuidv4();

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

  @Prop({ _id: false, required: true })
  personalInformation: PersonalInformation;

  // @Prop({ _id: false })
  // courses: CourseEntity[];

  @Prop({ type: String })
  createdBy = '0';

  @Prop({ type: Date })
  createdAt = new Date();

  @Prop()
  updatedBy?: string;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedBy?: string;

  @Prop()
  readonly deletedAt?: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
