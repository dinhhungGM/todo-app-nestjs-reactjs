import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NewUser } from 'src/graphql';
import { AuthGuard } from '../auth.guard';
import { UsersService } from './users.service';
import { TodosService } from 'src/todos/todos.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import * as argon2 from 'argon2';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private todos_service: TodosService,
  ) {}

  @Query()
  @UseGuards(AuthGuard)
  me(@Context() ctx) {
    console.log(ctx.user);
    return ctx.user;
  }

  @Query()
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Mutation()
  async login(@Args('input') newUser: NewUser) {
    try {
      let user = await this.usersService.getUserByUsername(newUser.username);
      if (!user) {
        // user = await this.usersService.createUser(newUser);
        // throw new HttpException(
        //   'Username or password is not correctly',
        //   HttpStatus.NOT_ACCEPTABLE,
        // );
        throw new AuthenticationError('AuthenticationError');
      }
      if (await argon2.verify(user.password, newUser.password)) {
        return this.usersService.createToken(user);
      } else
        throw new HttpException(
          'Username or password is not correctly',
          HttpStatus.NOT_ACCEPTABLE,
        );
    } catch (error) {
      throw new AuthenticationError('AuthenticationError');
    }
  }

  @Mutation()
  async createSingleUser(@Args('input') newUser: NewUser) {
    console.log(newUser);
    let user = await this.usersService.findOneByUsername(newUser.username);
    if (user) {
      throw new HttpException('Username is existed', HttpStatus.NOT_ACCEPTABLE);
    }

    user = await this.usersService.createUser(newUser);
    if (user) {
      const response = {
        code: 201,
        message: 'Created successfully',
        user,
      };
      return JSON.stringify(response);
    } else {
      throw new HttpException(
        'Something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async deleteSingleUser(@Args('id') id: string) {
    try {
      const { deletedCount } = await this.todos_service.deleteTodoByUserId(id);
      await this.usersService.deleteOneById(id);
      return `deleted account and ${deletedCount} todos`;
    } catch (error) {
      
      return 'delete failed';
    }
  }
}
