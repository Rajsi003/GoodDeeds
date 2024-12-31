const asyncHandler = require('express-async-handler')


const getPosts = asyncHandler(async(req,res) =>{
    res.status(200).json( {message: 'get post'})
}
)
const setPosts = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400).json( {message: 'please enter post'})
    }
    res.status(200).json( {message: 'set post'})
})
const updatePosts = asyncHandler(async(req,res) =>{
    res.status(200).json( {message: `update post ${req.params.id}`})
})
const deletePosts = asyncHandler(async(req,res) =>{
    res.status(200).json( {message: `delete post ${req.params.id}`})
})
module.exports = {
    getPosts,setPosts,updatePosts,deletePosts,
}