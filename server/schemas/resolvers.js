const { User, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('posts');
      }
      throw new AuthenticationError('Not logged in');
    },
    posts: async () => {
      return Post.find().populate('user comments');
    },
    post: async (parent, { id }) => {
      return Post.findById(id).populate('user comments');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('User not found');
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect password');
      const token = signToken(user);
      return { token, user };
    },
    createProfile: async (parent, { linkedin, github, bio, bootcampClass, firstJobPath }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, {
          profile: { linkedin, github, bio, bootcampClass, firstJobPath },
        }, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    createPost: async (parent, { title, content }, context) => {
      if (context.user) {
        return Post.create({ title, content, user: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
    createComment: async (parent, { postId, content }, context) => {
      if (context.user) {
        return Comment.create({ content, post: postId, user: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
