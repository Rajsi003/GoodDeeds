import React from 'react';
import topimg from '../assets/images/topimg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const topContainer = {
    display: 'flex',
    height: '30vh',
    border:'none',
    overflow: 'hidden',
  };

  const toppingImage = {
    width: '100%',
    border:'none',
   
    //objectFit: 'cover',
  };

  const navContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '1rem',
    width: '100%',
    padding: '0 2rem',
    boxSizing: 'border-box',
  };

  const buttonGroup = {
    display: 'flex',
    gap: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#f2bb4b',
    color: '#472a2c',
    border: 'none',
   padding: '10px 15px', // Consistent padding for all buttons
    cursor: 'pointer',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2 rem', // Space between icon and text
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#472a2c',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  return (
    <div style={topContainer}>
      <img src={topimg} alt="Good Deeds" style={toppingImage} />

      <div style={navContainer}>
        <div style={buttonGroup}>
          <button style={buttonStyle}>
            <Link to="/" style={linkStyle}>
              Dashboard
            </Link>
          </button>
        </div>
        <ul>
          {user ? (
            <div style={buttonGroup}>
              <button style={buttonStyle} onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            <div style={buttonGroup}>
              <button style={buttonStyle}>
                <Link to="/login" style={linkStyle}>
                  <FaSignInAlt />
                  Login
                </Link>
              </button>
              <button style={buttonStyle}>
                <Link to="/register" style={linkStyle}>
                  <FaUser />
                  Register
                </Link>
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
