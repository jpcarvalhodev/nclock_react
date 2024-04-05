import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface PageProtectionProps {
  children: React.ReactNode;
}

export const PageProtection: React.FC<PageProtectionProps> = ({ children }) => {
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    function isAuthenticated() {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirectTo('/notfound'); 
        return false;
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (Date.now() >= payload.exp * 1000) {
          localStorage.removeItem('token');
          setRedirectTo('/unauthorized'); 
          return false;
        }
      } catch {
        localStorage.removeItem('token');
        setRedirectTo('/notfound');
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