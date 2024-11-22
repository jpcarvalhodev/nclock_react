import { useNavigate, Link } from 'react-router-dom';
import '../../css/Login.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchWithoutAuth } from '../../components/FetchWithoutAuth';
import profileAvatar from '../../assets/img/navbar/navbar/profileAvatar.png';
import no_entity from '../../assets/img/navbar/no_entity.png';

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
  const [rememberMe, setRememberMe] = useState(false);

  // Verifica se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      const savedUsername = localStorage.getItem('rememberMeUser');
      const savedPassword = localStorage.getItem('rememberMePassword');
      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRememberMe(true);
      }
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
        toast.error('Falha ao fazer login. Tente novamente.');
        throw new Error;
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

        toast.info(`Seja bem vindo ${username.toUpperCase()} aos Nsoftwares do NIDGROUP`);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Problema com o servidor, contacte o administrador.');
    }
  };

  return (
    <div className="background-login">
      <div className="login-container" id='login'>
        <form className='form-login form-login-entity'>
          <div className='header-entity'>
            <p style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>NIDGROUP - Business Solutions</p>
          </div>
          <div className='username-password-labels'>
            <Row className='row-username-password'>
              <Col className='col-profile-img'>
                <img className='profile-login' src={no_entity} alt="foto perfil" />
              </Col>
              <Col className='col-username-password'>
                <label className='username-label'>
                  <p>Licenciado a:</p>
                  <input className='input-username-password' type="text" name="username" readOnly />
                </label>
                <Button className='license-button' variant='outline-light'>Licenças</Button>
              </Col>
            </Row>
          </div>
          <footer className='footer-entity'>
            <div className='language-login'>
              <p style={{ fontSize: 10, margin: 0, color: 'white' }}>Idioma:</p>
              <Button className="button-language" variant='outline-light'>PT</Button>
            </div>
            <p style={{ fontSize: 10, margin: 0, color: 'white' }}>Versão Software: 1</p>
          </footer>
        </form>
        <form className='form-login' style={{ marginTop: 30 }} onSubmit={handleLoginFormSubmit}>
          <div className='username-password-labels'>
            <Row className='row-username-password'>
              <Col className='col-username-password'>
                <label className='username-label'>
                  <p>Nome de Utilizador:</p>
                  <input className='input-username-password' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className='password-label'>
                  <p>Password:</p>
                  <input className='input-username-password' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
              </Col>
              <Col className='col-profile-img'>
                <img className='profile-login' src={profileAvatar} alt="foto perfil" />
              </Col>
            </Row>
          </div>
          <div className='buttons-container'>
            <Button variant='outline-light' type='submit'>Login</Button>
            <label style={{ color: 'white' }}>
              Memorizar dados?
              <input style={{ marginLeft: '10px' }} type="checkbox" name="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            </label>
            <Link style={{ color: 'white' }} to="/login&forgot/forgotpassword">Recuperar password?</Link>
          </div>
          <footer className='footer-login'>
            <p style={{ fontSize: 10, margin: 0, color: 'white' }}>Developed by NIDGROUP - Smart Solutions</p>
            <p style={{ fontSize: 10, margin: 0, color: 'white' }}>www.nidgroup.pt</p>
          </footer>
        </form>
        <div className='div-logo-p'>
          <img className='logo-login' src="/logo_login.png" alt="Logo Login" />
          <p style={{ marginLeft: 20, marginTop: 15, color: 'white', fontSize: 16, fontWeight: 'bold' }}>Seja Bem Vindo!</p>
        </div>
      </div>
    </div>
  );
};