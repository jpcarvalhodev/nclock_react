import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TerminalsProvider } from './context/TerminalsContext';
import { AttendanceProvider } from './context/MovementContext';
import { PersonsProvider } from './context/PersonsContext';
import { ColorProvider } from './context/ColorContext';
import { AdsProvider } from './context/AdsContext';
import { LicenseProvider } from './context/LicenseContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LicenseProvider>
      <ColorProvider>
        <PersonsProvider>
          <AttendanceProvider>
            <TerminalsProvider>
              <AdsProvider>
                <App />
              </AdsProvider>
            </TerminalsProvider>
          </AttendanceProvider>
        </PersonsProvider>
      </ColorProvider>
    </LicenseProvider>
  </React.StrictMode>
);

reportWebVitals();
