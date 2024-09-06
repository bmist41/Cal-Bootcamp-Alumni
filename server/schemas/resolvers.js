const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find().populate('user').populate('comments');
    },
    post: async (parent, { _id }) => {
      return await Post.findById(_id).populate('user').populate({
        path: 'comments',
        populate: 'user'
      });
    },
    user: async (parent, { _id }) => {
      return await User.findById(_id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    createPost: async (parent, { title, content }, context) => {
      if (context.user) {
        const post = await Post.create({
          title,
          content,
          user: context.user._id
        });
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updatePost: async (parent, { _id, title, content }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id, user: context.user._id },
          { title, content },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deletePost: async (parent, { _id }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id,
          user: context.user._id
        });
        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    createComment: async (parent, { postId, content }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          content,
          user: context.user._id,
          post: postId
        });
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteComment: async (parent, { _id }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id,
          user: context.user._id
        });
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;