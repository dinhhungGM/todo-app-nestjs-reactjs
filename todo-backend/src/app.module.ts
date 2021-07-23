import { Module} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { APP_GUARD } from '@nestjs/core';
import {AuthGuard} from './auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/my_todo_app_db?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.gql'],
      definitions: {path: join(process.cwd(), 'src/graphql.ts')},
      context: ({req}) => ({headers: req.headers}),
    }),
    UsersModule,
    TodosModule,
  ],
  
})
export class AppModule {}
