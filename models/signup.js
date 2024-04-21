const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
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
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define a pre-save hook to check if password and repeatPassword match before saving
userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
      if (this.password !== this.repeatPassword) {
        return next(new Error('Passwords do not match'));
      }
    }
    next();
  });

const SignUp = mongoose.model('signup', userSchema);

module.exports = SignUp;