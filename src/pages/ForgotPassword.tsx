import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/ForgotPassword.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPasswordFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }
  
      toast.success('Password reset email sent');

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email');
    }
  };

  return (
    <div className="background-login">
      <form className='form-login' onSubmit={handleForgotPasswordFormSubmit}>
      <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
        <label className='email-label'>
          Email:
          <input style={{ marginLeft: '20px', flex: 1 }} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <input style={{ marginTop: '20px' }} type="submit" value="Send password reset link" />
      </form>
    </div>
  );
};