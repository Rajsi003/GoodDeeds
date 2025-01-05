import axios from 'axios';

const API_URL = '/api/posts/';

// Helper function to get authorization config
const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create new post
const createPost = async (postData, token) => {
  try {
    const config = getAuthConfig(token);
    const response = await axios.post(API_URL, postData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get user posts
const getPosts = async (token) => {
  try {
    const config = getAuthConfig(token);
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Delete a post
const deletePost = async (postId, token) => {
  try {
    const config = getAuthConfig(token);
    const response = await axios.delete(`${API_URL}${postId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Get all posts (assuming no pagination)
const getAllPosts = async () => {
  const response = await axios.get('/api/posts/all'); // This should fetch all posts from all users
  return response.data;
}


// Update likes
const updateLikes = async (postId,increment, token) => {
  const config = getAuthConfig(token);
  try {
    
    const response = await axios.put(`/api/posts/${postId}/likes`, { increment: true },config);
    return response.data;
  } catch (error) {
    console.error('Error updating likes:', error);
    throw error;
  }
};

// Add a comment to a post
const addComment = async (postId, comment, token) => {
  const config = getAuthConfig(token);
  try {
    
    const response = await axios.post(`/api/posts/${postId}/comments`, { text : comment }, config);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const PostService = {
  createPost,
  getPosts,
  deletePost,
  getAllPosts,
  addComment,
  updateLikes,
};

export default PostService;
