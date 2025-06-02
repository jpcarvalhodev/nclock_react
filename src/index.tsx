import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './index.css';
import App from './App';
import { AdsProvider } from './context/AdsContext';
import { CardScrollProvider } from './context/CardScrollContext';
import { EntityProvider } from './context/EntityContext';
import { KioskProvider } from './context/KioskContext';
import { LicenseProvider } from './context/LicenseContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { NavbarProvider } from './context/NavbarContext';
import { PersonsProvider } from './context/PersonsContext';
import { TerminalsProvider } from './context/TerminalsContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LicenseProvider>
      <NavbarProvider>
        <CardScrollProvider>
          <EntityProvider>
            <PersonsProvider>
              <AttendanceProvider>
                <TerminalsProvider>
                  <AdsProvider>
                    <KioskProvider>
                      <App />
                    </KioskProvider>
                  </AdsProvider>
                </TerminalsProvider>
              </AttendanceProvider>
            </PersonsProvider>
          </EntityProvider>
        </CardScrollProvider>
      </NavbarProvider>
    </LicenseProvider>
  </React.StrictMode>
);

reportWebVitals();