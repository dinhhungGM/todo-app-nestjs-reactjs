
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewUser {
    username: string;
    password: string;
}

export interface NewTodo {
    title: string;
    description?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface UpdateTodoData {
    _id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface User {
    _id?: Nullable<string>;
    username: string;
    password: string;
}

export interface Todo {
    _id?: Nullable<string>;
    title: string;
    description?: Nullable<string>;
    user?: Nullable<User>;
}

export interface IQuery {
    me(): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getAllTodos(): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;
    getAllTodosOfUser(userId?: Nullable<string>): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;
    getOneTodo(_id?: Nullable<string>): Nullable<Todo> | Promise<Nullable<Todo>>;
}

export interface IMutation {
    login(input?: Nullable<NewUser>): Nullable<string> | Promise<Nullable<string>>;
    createSingleUser(input?: Nullable<NewUser>): Nullable<string> | Promise<Nullable<string>>;
    createSingleTodo(input?: Nullable<NewTodo>): Nullable<Todo> | Promise<Nullable<Todo>>;
    updateSingleTodo(input?: Nullable<UpdateTodoData>): Nullable<Todo> | Promise<Nullable<Todo>>;
    deleteSingleTodo(id?: Nullable<string>): Nullable<Todo> | Promise<Nullable<Todo>>;
    deleteSingleUser(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
