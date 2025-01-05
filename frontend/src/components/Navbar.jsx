import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine which button to display based on the current route
  const isOnAllPostsPage = location.pathname === '/all-posts';

  const handleNavigation = () => {
    if (isOnAllPostsPage) {
      navigate('/'); // Navigate to Dashboard (My Posts)
    } else {
      navigate('/all-posts'); // Navigate to All Posts
    }
  };

  return (
    <nav style={navbarStyles}>
      <button style={buttonStyles} onClick={handleNavigation}>
        {isOnAllPostsPage ? 'My Posts' : 'All Posts'}
      </button>
    </nav>
  );
};

const navbarStyles = {
  backgroundColor: '#f2bb4b',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'sticky',
  top: '0px',
  zIndex: 1000,
};

const buttonStyles = {
  backgroundColor: '#8B4513',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default Navbar;
