// Libraries
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Entities
import { PersonalInformationDomainEntity } from '../../../../domain/entities/personal-information.domain-entity';

export type PersonalInformationDocument = PersonalInformation & Document;

@Schema({ versionKey: false })
export class PersonalInformation extends PersonalInformationDomainEntity {
  @Prop({
    index: true,
    trim: true,
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    index: true,
    trim: true,
    required: [true, 'LastName is required'],
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

  @Prop({ trim: true })
  photo: string;
}

export const PersonalInformationSchema =
  SchemaFactory.createForClass(PersonalInformation);
