import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { TodoSchema, Todo } from './todos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Todo.name, schema: TodoSchema}
    ])
  ],
  providers: [TodosService, TodosResolver, UsersService]
})
export class TodosModule {}
