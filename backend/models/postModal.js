const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please enter post description'],
    },
    image: {
      type: String, 
      default: '',
    },
    likes: {
      type: Number,
      default: 0, 
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true,
        },
        text: {
          type: String,
          required: [true, 'Comment text is required'],
        },
        createdAt: {
          type: Date,
          default: Date.now, 
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
