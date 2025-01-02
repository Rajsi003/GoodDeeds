const asyncHandler = require('express-async-handler')
const Post = require('../models/postModal')
const User = require('../models/userModal')

// const getAllPosts = asyncHandler(async (req, res) => {
//     const posts = await Post.find().populate('user', 'name email profilePic');
//     res.status(200).json(posts);
// });

const getPosts = asyncHandler(async(req,res) =>{
    const posts = await Post.find({user: req.user.id})
    res.status(200).json(posts)
}
)
const setPosts = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400).json( {message: 'please enter post'})
    }
     const post = await Post.create({
         text : req.body.text,
         user: req.user.id,
         image: req.body.text,
     })
    res.status(200).json( post)
})
const updatePosts = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(400)
        throw new Error('Post description not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error ('user not found')
    }
    if(post.user.toString() != user.id){
        res.status(401)
        throw new Error ('user not authorised')
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
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error ('user not found')
    }
    if(post.user.toString() != user.id){
        res.status(401)
        throw new Error ('user not authorised')
    }
    await post.deleteOne()
    res.status(200).json( {id: req.params.id})
})
module.exports = {
    getPosts,setPosts,updatePosts,deletePosts,
}