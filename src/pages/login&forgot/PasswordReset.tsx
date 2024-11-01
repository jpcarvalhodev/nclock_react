import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/PasswordReset.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchWithoutAuth } from '../../components/FetchWithoutAuth';

// Define a página de redefinição de senha
export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    return password.length >= 8;
  };

  // Verifica se as senhas coincidem
  const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  // Função para enviar o formulário de redefinição de senha
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
      const response = await fetchWithoutAuth(`Authentication/ResetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return;
      }

      toast.success('Senha alterada com sucesso!', { progressClassName: 'custom-progress-bar' });
      navigate('/');

    } catch (error) {
      console.error("Erro:", error);
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
