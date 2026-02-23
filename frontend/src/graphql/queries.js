import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      title
      body
      author {
        id
        username
      }
      createdAt
    }
  }
`;

export const GET_QUESTION = gql`
  query GetQuestion($id: ID!) {
    question(id: $id) {
      id
      title
      body
      author {
        id
        username
      }
      answers {
        id
        body
        author {
          id
          username
        }
      }
    }
  }
`;
