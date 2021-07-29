import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthGuard } from '../auth.guard';
import { TodosService } from './todos.service';
import { UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Todo } from './todos.schema';
import {NewTodo, UpdateTodoData} from 'src/graphql'

@Resolver(of => Todo)
export class TodosResolver {
  constructor(
    private todos_service: TodosService,
    private users_service: UsersService,
  ) {}

  @Query()
  @UseGuards(AuthGuard)
  async getOneTodo(@Args('id') id: string) {
    return await this.todos_service.getTodoById(id);
  }

  @Mutation(() => Todo)
  async createSingleTodo(@Args('input') newTodo: NewTodo) {
    // console.log(newTodo);
    return await this.todos_service.createOneTodo(newTodo);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteSingleTodo(@Args('id') id: string) {
    return await this.todos_service.deleteOneTodo(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateSingleTodo(@Args('input') todo: UpdateTodoData) {
    return await this.todos_service.updateOneTodo(todo);
  }

  
  @Query(() => [Todo])
  @UseGuards(AuthGuard)
  async getAllTodos() {
    return await this.todos_service.getAllTodos();
  }

  @Query(() => [Todo])
  @UseGuards(AuthGuard)
  async getAllTodosOfUser(@Args('userId') userId: string) {
    return await this.todos_service.getAllTodosByUserId(userId);
  }

  @ResolveField()
  async user(@Parent() todo: Todo) {
    // console.log(todo);
    return await this.users_service.findOneById(todo.userId);
  }
}
