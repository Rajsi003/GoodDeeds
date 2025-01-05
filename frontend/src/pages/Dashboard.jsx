import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostForm from '../components/PostForm'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'
import { getPosts, reset } from '../features/posts/postSlice'
import { FaCoins } from 'react-icons/fa'; 
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    // Make sure to dispatch getPosts with the user token
    if (user) {
      dispatch(getPosts(user.token))
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Navbar  />
      <div className="login-container">
        <section className="login-heading">
          <h1>Welcome {user && user.name}</h1>
          <FaCoins style={{ color: 'gold', marginLeft: '10px' }} />
          {posts && posts.length > 0 && (
            <span style={{ marginLeft: '5px' }}>
              {posts.length} Points
            </span>
          )}
        </section>

        <section className="login-heading">
          <p>Done a good deed lately? Let us know...</p>
        </section>

        <PostForm />
      </div>

      <section className='content'>
        {posts.length > 0 ? (
          <div className='goals'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>You have no posts</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
