import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/ForgotPassword.css';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { fetchWithoutAuth } from '../../components/FetchWithoutAuth';
import hidepass from "../../assets/img/login/hidepass.png";
import showpass from "../../assets/img/login/showpass.png";

// Define a página de redefinição de senha
export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // Atualiza os estados de email e token
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setEmail(query.get('email') || '');
    setToken(query.get('token') || '');
  }, [location]);

  // Verifica se a senha é válida
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 6 && validatePassword(password);
  };

  // Função para validar a senha
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.{6,})/;
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

  // Função para alternar a visibilidade da password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background-login">
      <div className='forgot-container' id='forgot'>
        <form className='form-login' onSubmit={handleResetPasswordFormSubmit}>
          <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
          <div className='email-label' style={{ height: '120px' }}>
            <p>Nova Password:</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputGroup className='mb-3'>
                <FormControl
                  type={showPassword ? 'text' : 'password'}
                  aria-label='Nova Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className='input-email'
                  minLength={6}
                />
                <InputGroup.Text
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    height: '38px',
                    marginLeft: '-45px',
                    zIndex: 10,
                  }}
                  onClick={togglePasswordVisibility}
                >
                  <img src={showPassword ? hidepass : showpass} alt={showPassword ? "Esconder password" : "Mostrar password"} style={{ width: 20, height: 20 }} />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <Button variant='outline-light' type='submit'>Redefinir Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
