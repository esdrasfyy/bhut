import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  car_id: string;

  @Prop({ required: true, default: Date.now })
  data_hora_criacao: Date;

  @Prop({ required: true })
  data_hora_processamento: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
