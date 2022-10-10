// Libraries
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Entities
import { CourseDomainEntity } from '../../../../domain/entities/course.domain-entity';

export type CourseDocument = Course & Document;

@Schema({ versionKey: false })
export class Course extends CourseDomainEntity {
  @Prop({ index: true, type: String })
  uuid = uuidv4();

  @Prop({
    index: true,
    trim: true,
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    index: true,
    trim: true,
    required: [true, 'Description is required'],
  })
  description: string;

  @Prop({ trim: true })
  photo: string;

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

export const CourseSchema = SchemaFactory.createForClass(Course);
