const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    github: String
    linkedIn: String
    currentJob: String
    previousJob: String
    thoughts: [Thought]!
    yearGraduated: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    updateUser(
      username: String!
      email: String!
      github: String
      linkedIn: String
      currentJob: String
      previousJob: String
      yearGraduated: String
    ): User
    updateThought(thoughtId: ID!, thoughtText: String!): Thought
  }
`;

module.exports = typeDefs;

