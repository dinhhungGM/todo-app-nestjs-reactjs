import { Module} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://localhost:27017/test_database',
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
