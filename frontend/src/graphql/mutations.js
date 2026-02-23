import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $body: String!) {
    createQuestion(title: $title, body: $body) {
      id
      title
      body
      author {
        id
        username
      }
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $body: String!) {
    createAnswer(questionId: $questionId, body: $body) {
      id
      body
      author {
        id
        username
      }
    }
  }
`;