import { gql } from "@apollo/client";

const SIGNUP_MUATION = gql`
  mutation signup($username: String!, $password: String!) {
    createSingleUser(input: { username: $username, password: $password })
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password })
  }
`;

const CREATE_TODO = gql`
  mutation createSingleTodo(
    $title: String!
    $description: String!
    $userId: ID!
  ) {
    createSingleTodo(
      input: { title: $title, description: $description, userId: $userId }
    ) {
      _id
      title
      description
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteSingleTodo(id: $id) {
      _id
      title
      description
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
   
    $_id: ID!,
    $title: String,
    $description: String,
  
  ){
  updateSingleTodo(input: {
     _id: $_id
    title: $title
    description: $description
    
    }){
      _id
    title
    description
  }
}
`;

export { LOGIN_MUTATION, SIGNUP_MUATION, CREATE_TODO, DELETE_TODO, UPDATE_TODO };
