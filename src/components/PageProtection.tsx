import React from 'react';
import { Navigate } from 'react-router-dom';

interface PageProtectionProps {
  children: React.ReactNode;
}

export const PageProtection: React.FC<PageProtectionProps> = ({ children }) => {
  function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem('token');
        return false;
      }
    } catch {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/notfound" />;
  }

  return <>{children}</>;
};