import { useState } from 'react';
import { FaSignInAlt} from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({

    email: '',

    password: '',

  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) =>{
      e.preventDefault()
  }
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  };

  const formStyle = {
    backgroundColor: '#f2bb4b', // Yellow square
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '300px',
  };

  const textStyle = {
    color: 'brown',
    marginBottom: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff', // White input box
    color: '#000',
  };

  const buttonStyle = {
    backgroundColor: 'brown',
    color: '#fff',
    padding: '0.5rem',
    border: '1px solid',
    borderRadius: '5px',
    margin: '0.5rem 0',
    cursor: 'pointer',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={textStyle}>
          <FaSignInAlt /> Login
        </h1>
        <p style={textStyle}>Please log into your account</p>
        <form onSubmit = {onSubmit}>

          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={onChange}
            style={inputStyle}
          />
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
            style={inputStyle}
          />

          
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
