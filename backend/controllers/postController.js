const asyncHandler = require('express-async-handler')
const Post = require('../models/postModal')
const User = require('../models/userModal')

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })


  res.status(200).json(posts)
})

// @desc    Set a new post
// @route   POST /api/posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  // Validate if text exists
  // if (!req.body.text) {
  //   res.status(400)
  //   throw new Error('Please add a text field')
  // }
  const photoBase64 = req.file ? req.file.buffer.toString('base64') : null
  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    image:photoBase64,
    
  })
  const Newpost = new Post({
    text: req.body.text,
    user: req.user.id,
    image: photoBase64,
  })
 // await Newpost.save();
  res.status(201).json(post)
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  // Check if the logged-in user is the same as the post's user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized to update this post')
  }

  // Update the post
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedPost)
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  // Check if the logged-in user is the same as the post's user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized to delete this post')
  }

  await post.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
}
