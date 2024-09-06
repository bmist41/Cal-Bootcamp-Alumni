const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    linkedin: String
    github: String
    description: String
    pathToFirstJob: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    user: User
    comments: [Comment]
    createdAt: String
  }

  type Comment {
    _id: ID
    content: String
    user: User
    post: Post
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    posts: [Post]
    post(_id: ID!): Post
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    createPost(title: String!, content: String!): Post
    updatePost(_id: ID!, title: String, content: String): Post
    deletePost(_id: ID!): Post
    createComment(postId: ID!, content: String!): Comment
    deleteComment(_id: ID!): Comment
  }
`;

module.exports = typeDefs;

