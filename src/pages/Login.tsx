import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchWithoutAuth } from '../components/FetchWithoutAuth';

// Interface para o usuário
type User = {
  username: string;
  password: string;
};

// Define a página de login
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Verifica se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Função para fazer login
  const handleLoginFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user: User = {
      username,
      password,
    };

    try {
      const response = await fetchWithoutAuth('Authentication/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        toast.error('Dados incorretos. Tente novamente.');
      } else if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        toast.error('Ocorreu um erro ao fazer login. Tente novamente.');
      } else {
        const data = await response.json();

        if (data.token == null) {
          toast.error('Ocorreu um erro ao fazer login. Tente novamente.');
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

        toast(`Seja bem vindo ${username}!`, {progressClassName: 'custom-progress-bar'});
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Problema com o servidor, contacte o administrador.');
    }
  };

  return (
    <div className="background-login">
      <div className="login-container">
        <form className='form-login' onSubmit={handleLoginFormSubmit}>
          <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
          <div className='username-password-labels'>
            <label className='username-label'>
              <p>Nome de Usuário:</p>
              <input type="text" name="username" value={username} placeholder='Nome de Usuário' onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className='password-label'>
              <p>Senha:</p>
              <input type={showPassword ? "text" : "password"} name="password" value={password} placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <label className='remember_me-label'>
            Guardar dados?
            <input style={{ marginLeft: '10px' }} type="checkbox" name="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          </label>
          <Link className="btn-my-custom-link" to="/forgot-password">Esqueceu sua senha?</Link>
          <Button className="btn-my-custom-button" type='submit'>Login</Button>
        </form>
      </div>
    </div>
  );
};