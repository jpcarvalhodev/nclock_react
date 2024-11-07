import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ForgotPassword.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchWithoutAuth } from '../../components/FetchWithoutAuth';

// Define a página de recuperação de password
export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Função para validar o email
  const isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  // Função para submeter o formulário
  const handleForgotPasswordFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    } else {
      try {
        const response = await fetchWithoutAuth(`Authentication/ForgotPassword?emailAddress=${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          toast.error('Falha ao enviar e-mail de recuperação de password. Tente novamente.');
          throw new Error;
        }

        toast.success('E-mail de redefinição de password enviado!');
        navigate('/');

      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  // Função para retornar para a página de login
  const returnToLogin = () => {
    navigate('/');
  }

  return (
    <div className="background-login">
      <form className='form-login' onSubmit={handleForgotPasswordFormSubmit}>
        <img className='logo-login' src="/logo_login.png" alt="Logo Login" onClick={returnToLogin} style={{ cursor: 'pointer' }} />
        <label className='email-label'>
          Email:
          <input style={{ marginLeft: '20px', flex: 1 }} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <Button className="btn-my-custom-button" type='submit'>Enviar</Button>
      </form>
    </div>
  );
};