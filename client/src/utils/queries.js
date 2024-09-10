import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      content
      user {
        username
      }
      createdAt
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      username
      email
      profile {
        linkedin
        github
        bio
        bootcampClass
        firstJobPath
      }
      posts {
        _id
        title
        content
      }
    }
  }
`;
