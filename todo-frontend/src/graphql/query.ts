import { gql } from "@apollo/client";

const AUTHENTICATION = gql`
  query authentication {
    me {
      _id
      username
    }
  }
`;

const GET_ALL_TODOS = gql`
  query GetAllTodos($userId: ID!) {
    getAllTodosOfUser(userId: $userId) {
      _id
      title
      description
    }
  }
`;

export { AUTHENTICATION, GET_ALL_TODOS};
