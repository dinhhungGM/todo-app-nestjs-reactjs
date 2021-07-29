import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';

export type TodoDocument = Todo & mongoose.Document;

@Schema()
@ObjectType()
export class Todo {
  @Field(() => ID)
  _id: string;

  @Prop({required: true})
  @Field()
  title: string;

  @Prop({required: true})
  @Field()
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field()
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);


