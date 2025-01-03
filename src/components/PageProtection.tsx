import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Define as propriedades do componente
interface PageProtectionProps {
  children: React.ReactNode;
}

// Define o componente
export const PageProtection: React.FC<PageProtectionProps> = ({ children }) => {
  const [redirectTo, setRedirectTo] = useState('');

  // Verifica se o usuário está autenticado
  useEffect(() => {
    function isAuthenticated() {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirectTo('/'); 
        return false;
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          localStorage.clear();
          setRedirectTo('/'); 
          return false;
        }
      } catch {
        localStorage.clear();
        setRedirectTo('/errors/notfound');
        return false;
      }
      return true;
    }

    isAuthenticated();
  }, []);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};