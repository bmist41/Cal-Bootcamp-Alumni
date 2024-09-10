const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Comment', commentSchema);


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
