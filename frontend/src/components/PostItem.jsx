import { useDispatch } from 'react-redux';
import { deletePost } from '../features/posts/postSlice';

function PostItem({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="post-content">
        {/* Display image if it exists */}
        {post.image && (
          <div className="post-image">
            <img
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Post"
              className="image"
            />
          </div>
        )}

        <div className="post-text">
          <h2>{post.text}</h2>
        </div>
      </div>

      <div className="post-footer">
        <span className="post-timestamp">
          {new Date(post.createdAt).toLocaleString('en-US')}
        </span>
        <button
          onClick={() => dispatch(deletePost(post._id))}
          className="post-delete-button"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default PostItem;
