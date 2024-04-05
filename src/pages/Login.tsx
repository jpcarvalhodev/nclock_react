import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React from 'react';
import { Button } from 'react-bootstrap';

type User = {
  username: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user: User = {
      username,
      password,
    };

    try {
      const response = await fetch('https://localhost:7129/api/Authentication/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        setMessage('Incorrect username or password. Please try again.');
      } else if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        setMessage('An error occurred while logging in. Please try again.');
      } else {
        const data = await response.json();

        if (data.token == null) {
          setMessage('An error occurred while logging in. Please try again.');
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);

        if (rememberMe) {
          localStorage.setItem('rememberMeUser', username);
          localStorage.setItem('rememberMePassword', password);
        } else {
          localStorage.removeItem('rememberMeUser');
          localStorage.removeItem('rememberMePassword');
        }

        setMessage('User logged in successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Problema com o servidor, contacte o administrador.');
    }
  };

  return (
    <div className="background-login">
      <div className="login-container">
        <form className='form-login' onSubmit={handleLoginFormSubmit}>
          <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
          <div className='username-password-labels'>
            <label className='username-label'>
              Username:
              <input style={{ marginLeft: '20px' }} type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className='password-label'>
              Password:
              <input style={{ marginLeft: '20px' }} type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>
            </label>
          </div>
          <label className='remember_me-label'>
            Remember me?
            <input style={{ marginLeft: '10px' }} type="checkbox" name="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          </label>
          <Link className="btn-my-custom-link" to="/forgot-password">Forgot your password?</Link>
          <Button className="btn-my-custom-button" type='submit'>Login</Button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};