import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
        toast.error('Ocorreu um erro. Tente novamente.');
      }
  
      toast('Password reset email sent', {progressClassName: 'custom-progress-bar'});
      navigate('/');
      
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro. Tente novamente.');
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
        <Button className="btn-my-custom-button" type='submit'>Enviar</Button>
      </form>
    </div>
  );
};