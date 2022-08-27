// Libraries
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Enums
import { State } from '../../../shared/utilities/enums/state.enum';

// Entities
import { StudentEntity } from '../../../contexts/students/domain/entities/student.entity';

// Schemas
import { BaseEntitySchema } from '../../../shared/infrastructure/models/mongo/base-entity.schema';

export type StudentDocument = Student & Document;

@Schema({ collection: 'students', versionKey: false })
export class Student extends BaseEntitySchema implements StudentEntity {
  @Prop({
    index: true,
    trim: true,
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    index: true,
    trim: true,
    required: [true, 'Last name is required'],
  })
  lastName: string;

  @Prop({
    index: true,
    trim: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value,
        );
      },
      message: (props: { value: any }) =>
        `"${props.value}" is not a valid email address`,
    },
  })
  email: string;

  @Prop({
    trim: true,
  })
  photo: string;

  @Prop({
    type: Boolean,
    required: [true, 'Status is required'],
    default: State.ACTIVE,
    enum: {
      values: [State.ACTIVE, State.INACTIVE],
      message: 'The data "{VALUE}" is not a valid value',
    },
  })
  status = Boolean(State.ACTIVE);
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ email: 1, deletedAt: 1 }, { unique: true });

export { StudentSchema };
