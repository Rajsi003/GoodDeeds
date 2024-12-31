const asyncHandler = require('express-async-handler')
const Post = require('../models/postModal')
const getPosts = asyncHandler(async(req,res) =>{
    const posts = await Post.find()
    res.status(200).json(posts)
}
)
const setPosts = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400).json( {message: 'please enter post'})
    }
     const post = await Post.create({
         text : req.body.text
     })
    res.status(200).json( post)
})
const updatePosts = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post description not found')
    }
    const updatePost = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatePost)
})
const deletePosts = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post description not found')
    }
    await post.deleteOne()
    res.status(200).json( {message: `delete post ${req.params.id}`})
})
module.exports = {
    getPosts,setPosts,updatePosts,deletePosts,
}