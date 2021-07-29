import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({required: true, maxLength: 32, unique: true})
  @Field()
  username: string;

  @Prop({required: true, maxLength: 255})
  @Field()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
