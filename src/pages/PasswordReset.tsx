import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PasswordReset.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setEmail(query.get('email') || '');
    setToken(query.get('token') || '');
  }, [location]);

  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const handleResetPasswordFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isPasswordValid(password)) {
      toast.error('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (!doPasswordsMatch(password, confirmPassword)) {
      toast.error('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7129/api/Authentication/ResetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        toast.error('Ocorreu um erro. Tente novamente: ' + errorMsg);
        return;
      }

      toast.success('Senha alterada com sucesso!', { progressClassName: 'custom-progress-bar' });
      navigate('/login');

    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="background-login">
      <form className='form-login' onSubmit={handleResetPasswordFormSubmit}>
        <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
        <div className='password-field'>
          <p>Nova Senha:</p>
          <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='password-field'>
          <p>Confirme a Senha:</p>
          <input type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <Button className="btn-my-custom-button" type='submit'>Redefinir Senha</Button>
      </form>
    </div>
  );
};
