const asyncHandler = require('express-async-handler');
const Post = require('../models/postModal');
const User = require('../models/userModal');

// @desc    Get all posts of all users
// @route   GET /api/posts/all
// @access  Private
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name email') // Populate user details
    .populate('comments.user', 'name'); // Populate comment user details

  if (!posts) {
    res.status(404);
    throw new Error('No posts found');
  }

  res.status(200).json(posts);
});

// @desc    Get posts of the logged-in user
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id }).populate('comments.user', 'name');
  res.status(200).json(posts);
});

// @desc    Set a new post
// @route   POST /api/posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  const photoBase64 = req.file ? req.file.buffer.toString('base64') : null;

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    image: photoBase64,
  });

  res.status(201).json(post);
});

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// // @access  Private
// const addComment = asyncHandler(async (req, res) => {
//   const { text } = req.body;

//   // Validate that comment text is provided
//   if (!text) {
//     res.status(400);
//     throw new Error('Comment text is required');
//   }

//   // Find the post by ID
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     res.status(404);
//     throw new Error('Post not found');
//   }

//   // Create a new comment
//   const newComment = {
//     user: req.user.id, // The user adding the comment
//     text: text,
//   };

//   // Add the comment to the post's comments array
//   post.comments.push(newComment);

//   // Save the updated post
//   await post.save();

//   res.status(201).json({
//     message: 'Comment added successfully',
//     post,
//   });
// });
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  // Validate that comment text is provided
  if (!text) {
    res.status(400);
    throw new Error('Comment text is required');
  }

  // Find the post by ID
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Create a new comment
  const newComment = {
    user: req.user.id, // The user adding the comment
    text: text,
  };

  // Add the comment to the post's comments array
  post.comments.push(newComment);

  // Save the updated post
  await post.save();

  // Return the updated post with comments
  res.status(201).json({
    message: 'Comment added successfully',
    comments: post.comments, // Return the updated comments array
  });
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if the logged-in user is the same as the post's user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this post');
  }

  // Update the post
  const updatedData = {
    text: req.body.text || post.text,
    image: req.file ? req.file.buffer.toString('base64') : post.image,
  };

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.status(200).json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if the logged-in user is the same as the post's user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this post');
  }

  await post.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// @desc    Update likes for a post
// @route   PUT /api/posts/:id/likes
// @access  Private
const updateLikes = asyncHandler(async (req, res) => {
  const { increment } = req.body; // Pass `increment: true` or `increment: false` from frontend

  // Find the post by ID
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Update the likes count based on the increment value
  post.likes = increment ? post.likes + 1 : post.likes - 1;

  // Ensure likes do not go below 0
  post.likes = Math.max(post.likes, 0);

  await post.save();

  res.status(200).json({
    message: 'Likes updated successfully',
    _id: post._id, // Include post ID
    likes: post.likes, // Include updated likes count
  });
});

module.exports = {
  getPosts,
  setPost,
  addComment,
  updatePost,
  deletePost,
  getAllPosts,
  updateLikes,
};
