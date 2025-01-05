import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postSlice';

function PostForm() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    dispatch(createPost(formData));

    setText('');
    setImage(null);
    setImagePreview('');
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    


      <section className="login-form">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="text"
              name="text"
              value={text}
              placeholder="Add post description"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="btn-submit">
              Add Post
            </button>
          </div>
        </form>
      </section>
    
  );
}

export default PostForm;
