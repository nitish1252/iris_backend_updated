const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    // index: true  // Optional: To create an index for faster queries
  },
  profession: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    
  },
  title: {
    type: String,
  },
  postImg: {
    type: String,
  },
  likes: {
    type: String,
  },
  comments: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('postn', postSchema);

module.exports = Post;