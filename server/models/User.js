const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    linkedin: String,
    github: String,
    bio: String,
    bootcampClass: String,
    firstJobPath: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);
