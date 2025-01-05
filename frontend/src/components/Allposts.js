import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../features/posts/postSlice';
import { addComment, updateLikes } from '../features/posts/postSlice';
import Spinner from '../components/Spinner';
import Navbar from './Navbar';

const AllPosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts);
  const [comments, setComments] = useState({});
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleLikeClick = (postId, increment) => {
    dispatch(updateLikes({ postId, increment }));
  };

  const handleCommentChange = (postId, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentText = comments[postId];

    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }))
        .unwrap()
        .then(() => {
          setComments((prevComments) => ({ ...prevComments, [postId]: '' }));
          dispatch(getAllPosts()); // Refetch posts after adding a comment
        })
        .catch((error) => {
          console.error("Failed to add comment:", error);
        });
    }
  };

  const handleShowMoreComments = (postId) => {
    setShowMore((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div style={{ color: 'red' }}>Error: {message}</div>;
  }

  return (
    <>
      <Navbar/>
      <h1>All Posts</h1>
      <div className='post' >
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={styles.postBox}>
              <div style={styles.postHeader}>
                <div style={styles.postImageContainer}>
                  {post.image && (
                    <img
                      src={`data:image/jpeg;base64,${post.image}`}
                      alt="Post Image"
                      style={styles.postImage}
                    />
                  )}

                  <button
                    onClick={() => handleLikeClick(post._id, true)}
                    style={styles.likeButton}
                  >
                    <FaHeart style={{ color: '#8B4513', marginRight: '5px' }} />
                    {post.likes}
                  </button>
                  </div>
                <div style={styles.postContent}>
                  <div style={styles.userInfo}>
                    <h3>{post.user.name}</h3>
                    <div>{new Date(post.createdAt).toLocaleString()}</div>
                  </div>
                  <div style={styles.postText}>
                    <p>{post.text}</p>
                  </div>

                  <div style={styles.commentSection}>
                    <h4>Comments</h4>
                    <div style={styles.commentList}>
                      {post.comments.slice(0, showMore[post._id] ? post.comments.length : 2).map((comment) => (
                        <div key={comment._id} style={styles.comment}>
                          <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
                        </div>
                      ))}
                    </div>
                    {post.comments.length > 2 && !showMore[post._id] && (
                      <button
                        onClick={() => handleShowMoreComments(post._id)}
                        style={styles.moreButton}
                      >
                        Show more
                      </button>
                    )}
                    {showMore[post._id] && (
                      <button
                        onClick={() => handleShowMoreComments(post._id)}
                        style={styles.moreButton}
                      >
                        Show less
                      </button>
                    )}
                    <form onSubmit={(e) => handleCommentSubmit(e, post._id)} style={styles.commentForm}>
                      <input
                        type="text"
                        value={comments[post._id] || ''}
                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                        placeholder="Add a comment"
                        style={styles.commentInput}
                      />
                      <button type="submit" style={styles.commentButton}>
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

const styles = {
  postsContainer: {
    width: '40%',
    margin: '0 auto',
    alignItems: 'center',
  },
  postBox: {
    
    backgroundColor:'#faf3f0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',

  },
  postHeader: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  postImageContainer: {
    flexBasis: '40%', // Image takes up 35% of the post box
    marginRight: '15px',
    marginRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  postImage: {
    borderRadius: '10px',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  likeButton: {
    padding: '5px 10px',
    backgroundColor: '#f2bb4b',
    color: '#472a2c',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
    marginTop:'10px',
    //enter the button below the image
  },
  
    
  
  postContent: {
    flex: 1,
  },
  userInfo: {
    marginBottom: '10px',
  },
  postText: {
    marginBottom: '15px',
  },
  commentSection: {
    marginTop: '15px',
  },
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  comment: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  commentForm: {
    display: 'flex',
    alignItems: 'center',
  },
  commentInput: {
    padding: '5px',
    width: '80%',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  commentButton: {
    padding: '5px 10px',
    backgroundColor: '#f2bb4b',
    color: '#472a2c',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  moreButton: {
    backgroundColor:  '#f2bb4b',
    color: '#472a2c',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default AllPosts;
