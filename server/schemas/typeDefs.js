const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    profile: Profile
    posts: [Post]
  }

  type Profile {
    linkedin: String
    github: String
    bio: String
    bootcampClass: String
    firstJobPath: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    user: User
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    content: String
    user: User
    post: Post
    createdAt: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createProfile(linkedin: String!, github: String!, bio: String!, bootcampClass: String!, firstJobPath: String!): Profile
    createPost(title: String!, content: String!): Post
    createComment(postId: ID!, content: String!): Comment
  }
`;

module.exports = typeDefs;