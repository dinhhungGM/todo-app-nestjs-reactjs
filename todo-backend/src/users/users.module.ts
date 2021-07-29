import { Module, Global} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema, Todo } from 'src/todos/todos.schema';
import { TodosService } from 'src/todos/todos.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';


@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Todo.name, schema: TodoSchema}
    ])
  ],
  providers: [UsersService, UsersResolver, TodosService],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
