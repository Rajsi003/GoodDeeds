
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deletePost } from '../features/posts/postSlice';
// import { FaHeart } from 'react-icons/fa';

// function PostItem({ post }) {
//   const dispatch = useDispatch();
//   const [showMore, setShowMore] = useState(false); // State to control the show more/less button

//   const handleShowMoreComments = () => {
//     setShowMore(!showMore); // Toggle showMore state
//   };

//   return (
//     <div className="post">
//       <div className="post-content">
//         {/* Display image if it exists */}
//         {post.image && (
//           <div className="post-image">
//             <img
//               src={`data:image/jpeg;base64,${post.image}`}
//               alt="Post"
//               className="image"
//             />
//           </div>
//         )}

//         <button className="like-button">
//           <FaHeart style={{ color: '#8B4513', marginRight: '5px' }} />
//           {post.likes}
//         </button>

//         <div className="post-text">
//           <h2>{post.text}</h2>
//         </div>
//       </div>

//       <div className="comments-section">
//         <h4>Comments</h4>
//         <div>
//           {post.comments.slice(0, showMore ? post.comments.length : 2).map((comment) => (
//             <div key={comment._id} style={styles.comment}>
//               <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
//             </div>
//           ))}
//         </div>

//         {post.comments.length > 2 && !showMore && (
//           <button onClick={handleShowMoreComments} style={styles.moreButton}>
//             Show more
//           </button>
//         )}

//         {showMore && (
//           <button onClick={handleShowMoreComments} style={styles.moreButton}>
//             Show less
//           </button>
//         )}
//       </div>

//       <div className="post-footer">
//         <span className="post-timestamp">
//           {new Date(post.createdAt).toLocaleString('en-US')}
//         </span>
//         <button
//           onClick={() => dispatch(deletePost(post._id))}
//           className="post-delete-button"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   comment: {
//     fontSize: '14px',
//     color: '#333',
//     marginBottom: '5px',
//   },
//   moreButton: {
//     padding: '5px 10px',
//     backgroundColor: '#f2bb4b',
//     color: '#472a2c',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     marginTop: '10px',
//   },
// };

// export default PostItem;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts,deletePost } from '../features/posts/postSlice';
import { FaHeart } from 'react-icons/fa';

function PostItem({ post }) {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreComments = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={styles.post}>
      <div style={styles.leftSection}>
        {post.image && (
          <div style={styles.imageContainer}>
            <img
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Post"
              style={styles.image}
            />
          </div>
        )}
        <button style={styles.likeButton}>
          <FaHeart style={{ color: '#8B4513', marginRight: '5px' }} />
          {post.likes}
        </button>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.timestamp}>
          {new Date(post.createdAt).toLocaleString('en-US')}
        </div>
        <div style={styles.text}>
          <p>{post.text}</p>
        </div>

        <div style={styles.commentsSection}>
          <h4>Comments:</h4>
          <div>
            {post.comments.slice(0, showMore ? post.comments.length : 2).map((comment) => (
              <div key={comment._id} style={styles.comment}>
                <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
              </div>
            ))}
          </div>

          {post.comments.length > 2 && !showMore && (
            <button onClick={handleShowMoreComments} style={styles.moreButton}>
              Show more
            </button>
          )}

          {showMore && (
            <button onClick={handleShowMoreComments} style={styles.moreButton}>
              Show less
            </button>
          )}
        </div>
      </div>

      <button
  onClick={() => {
    dispatch(deletePost(post._id))
      .unwrap()
      .then(() => {
        // Dispatch an action to refetch posts after deletion
        dispatch(getPosts());
      })
      .catch((error) => {
        console.error("Failed to delete post:", error);
      });
  }}
  style={styles.deleteButton}
>
  Delete
</button>

    </div>
  );
}

const styles = {
  post: {
    display: 'flex',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    alignItems: 'flex-start',
  },
  leftSection: {
    marginRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: '10px',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  likeButton: {
    padding: '5px 10px',
    backgroundColor: '#f2bb4b',
    color: '#472a2c',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
  },
  rightSection: {
    flex: 1,
  },
  timestamp: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '10px',
  },
  text: {
    marginBottom: '10px',
  },
  commentsSection: {
    marginTop: '10px',
  },
  comment: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  moreButton: {
    padding: '5px 10px',
    backgroundColor: '#f2bb4b',
    color: '#472a2c',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
};

export default PostItem;
