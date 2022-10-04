import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BadgeEntity } from '../../../data-transfer-objects/interfaces/badge.entity';

export type BadgeDocument = Badge & Document;

@Schema({ collection: 'badges', versionKey: false })
export class Badge implements BadgeEntity {
  @Prop({ index: true, type: String })
  uuid? = uuidv4();

  @Prop({
    trim: true,
    required: [true, 'Badge name is required'],
  })
  name: string;

  @Prop({
    trim: true,
    required: [true, 'Badge description is required'],
  })
  description: string;

  @Prop({
    trim: true,
    required: [true, 'Badge photo is required'],
  })
  photo: string;
  status?: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deletedBy?: string;
  deletedAt?: Date;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
