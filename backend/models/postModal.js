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
      type: String, // URL or path to an image
      default: '',
    },
    likes: {
      type: Number,
      default: 0, // Initialize with 0 likes
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the user who made the comment
          required: true,
        },
        text: {
          type: String,
          required: [true, 'Comment text is required'],
        },
        createdAt: {
          type: Date,
          default: Date.now, // Timestamp for the comment
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
