import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hung:1@cluster0.sxlyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.gql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      context: ({ req }) => ({ headers: req.headers }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
