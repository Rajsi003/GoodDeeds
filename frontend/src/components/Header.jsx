import React from 'react';
import topimg from '../assets/images/topimg.jpg';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser } from 'react-icons/fa';

const Header = () => {
  // Styling for the main container
  const topContainer = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '40vh',
    overflow: 'hidden',
  };

  // Styling for the image
  const toppingImage = {
    width: '100%',
    objectFit: 'cover',
    height: '100%',
  };

  // Styling for navigation container
  const navContainer = {
    display: 'flex',
    justifyContent: 'space-between', // Separates left and right sections
    position: 'absolute',
    top: '1rem',
    width: '100%',
    padding: '0 2rem', // Increased padding for more space
    boxSizing: 'border-box', // Ensures padding is included in width
  };

  // Styling for button groups
  const buttonGroup = {
    display: 'flex',
    gap: '1rem',
  };

  // Styling for buttons
  const styles = {
    button: {
      backgroundColor: '#f2bb4b',
      color: '#472a2c',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: 'brown', // Text in brown
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={topContainer}>
      {/* Top Image */}
      <img src={topimg} alt="Good Deeds" style={toppingImage} />
      
      {/* Navigation Links */}
      <div style={navContainer}>
        {/* Left Section - Dashboard */}
        <div style={buttonGroup}>
          <button style={styles.button}>
            <Link to="/" style={styles.link}>
               Dashboard
            </Link>
          </button>
        </div>
        
        {/* Right Section - Login & Register */}
        <div style={buttonGroup}>
          <button style={styles.button}>
            <Link to="/login" style={styles.link}>
              <FaSignInAlt /> Login
            </Link>
          </button>
          <button style={styles.button}>
            <Link to="/register" style={styles.link}>
              <FaUser /> Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
