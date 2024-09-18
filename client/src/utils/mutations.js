import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_THOUGHT = gql`
  mutation removeThought($thoughtId: ID!) {
    removeThought(thoughtId: $thoughtId) {
      _id
      thoughtText
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
export const UPDATE_THOUGHT = gql`
  mutation updateThought($thoughtId: ID!, $thoughtText: String!) {
    updateThought(thoughtId: $thoughtId, thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $github: String
    $linkedIn: String
    $currentJob: String
    $previousJob: String
    $yearGraduated: String
  ) {
    updateUser(
      username: $username
      email: $email
      github: $github
      linkedIn: $linkedIn
      currentJob: $currentJob
      previousJob: $previousJob
      yearGraduated: $yearGraduated
    ) {
      _id
      username
      email
      github
      linkedIn
      currentJob
      previousJob
      yearGraduated
    }
  }
`;
