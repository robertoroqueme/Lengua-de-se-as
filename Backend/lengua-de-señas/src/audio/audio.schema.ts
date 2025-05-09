import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop()
  status: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: false })
  isFavorite: boolean;
  
  @Prop({ default: Date.now })
  createdAt: Date;

}

export const AudioSchema = SchemaFactory.createForClass(Audio);
