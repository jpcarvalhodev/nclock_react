import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TerminalsProvider } from './context/TerminalsContext';
import { AttendanceProvider } from './context/MovementContext';
import { PersonsProvider } from './context/PersonsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PersonsProvider>
      <AttendanceProvider>
        <TerminalsProvider>
          <App />
        </TerminalsProvider>
      </AttendanceProvider>
    </PersonsProvider>
  </React.StrictMode>
);

reportWebVitals();
