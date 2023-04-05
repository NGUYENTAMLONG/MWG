import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({
    type: 'string',
  })
  owner: string;

  @Prop({
    default: 'Word match game',
  })
  name: string;

  @Prop({
    type: 'object',
    default: [],
  })
  usedWordsOfUser: object;

  @Prop([String])
  usedWordsOfServer: string[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
