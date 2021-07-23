import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todos.schema';
import {NewTodo, UpdateTodoData} from 'src/graphql'


@Injectable()
export class TodosService {
   constructor(
       @InjectModel(Todo.name) private todoModel: Model<TodoDocument>
   ){}

   async getAllTodos(): Promise<TodoDocument[]>{
       return await this.todoModel.find()
   }
   async getTodoById(id: string): Promise<TodoDocument>{
       return await this.todoModel.findById(id);
   }

   async getAllTodosByUserId(userId: string): Promise<TodoDocument[]> {
       return await this.todoModel.find({userId: userId})
   }
   async updateOneTodo(todo: UpdateTodoData): Promise<TodoDocument> {
       return await this.todoModel.findByIdAndUpdate(todo._id, {title: todo.title, description: todo.description});
   }
   async createOneTodo(todo: NewTodo): Promise<TodoDocument>{
       return await this.todoModel.create(todo)
   }
   async deleteOneTodo(id: string): Promise<TodoDocument>{
       return await this.todoModel.findByIdAndDelete(id)
   }
   async deleteTodoByUserId(userId: string){
       return (await this.todoModel.deleteMany({userId}))
   }
}
