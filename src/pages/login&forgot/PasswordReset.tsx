import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/ForgotPassword.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { fetchWithoutAuth } from '../../components/FetchWithoutAuth';

// Define a página de redefinição de senha
export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Atualiza os estados de email e token
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setEmail(query.get('email') || '');
    setToken(query.get('token') || '');
  }, [location]);

  // Verifica se a senha é válida
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8 && validatePassword(password);
  };

  // Função para validar a senha
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(password);
  };

  // Função para enviar o formulário de redefinição de senha
  const handleResetPasswordFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isPasswordValid(newPassword)) {
      toast.error('Obrigatório a password ter 6 caracteres, uma letra maiúscula, uma minúscula e um caractere especial');
      return;
    }

    try {
      const response = await fetchWithoutAuth(`Authentication/ResetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          newPassword,
        }),
      });

      if (!response.ok) {
        return;
      }

      toast.success('Password alterada com sucesso!', { progressClassName: 'custom-progress-bar' });
      navigate('/');

    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <div className="background-login">
      <div className='forgot-container' id='forgot'>
        <form className='form-login' onSubmit={handleResetPasswordFormSubmit}>
          <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
          <div className='email-label' style={{ height: '80px' }}>
            <p>Nova Password:</p>
            <input className='input-email' style={{ flex: 1 }} type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <Button style={{ marginTop: 30 }} variant='outline-light' type='submit'>Redefinir Password</Button>
        </form>
      </div>
    </div>
  );
};
