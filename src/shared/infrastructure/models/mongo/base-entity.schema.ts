// Libraries
import { v4 as uuidv4 } from 'uuid';
import { Prop } from '@nestjs/mongoose';

export abstract class BaseEntitySchema {
  @Prop({
    required: [true, 'ID is required'],
    unique: true,
    default: uuidv4(),
    index: true,
    validate: {
      validator: (value: string) => {
        return /[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/.test(
          value,
        );
      },
      message: (props: { value: any }) =>
        `"${props.value}" does not have the structure of a UUID v4`,
    },
  })
  readonly uuid: string = uuidv4();

  @Prop({
    default: new Date(),
  })
  readonly createdAt: Date = new Date();

  @Prop()
  updatedAt: Date;

  @Prop()
  readonly deletedAt: Date;
}
