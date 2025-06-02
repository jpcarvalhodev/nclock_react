import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { ToastContainer } from 'react-toastify';
import { AdsProvider } from './context/AdsContext';
import { CardScrollProvider } from './context/CardScrollContext';
import { EntityProvider } from './context/EntityContext';
import { KioskProvider } from './context/KioskContext';
import { LicenseProvider } from './context/LicenseContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { NavbarProvider } from './context/NavbarContext';
import { PersonsProvider } from './context/PersonsContext';
import { TerminalsProvider } from './context/TerminalsContext';
import { AppRoutes } from './routes/routes';


function App() {
  return (
    <LicenseProvider>
      <NavbarProvider>
        <CardScrollProvider>
          <EntityProvider>
            <PersonsProvider>
              <AttendanceProvider>
                <TerminalsProvider>
                  <AdsProvider>
                    <KioskProvider>
                      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                        <ToastContainer />
                        <AppRoutes />
                      </Router>
                    </KioskProvider>
                  </AdsProvider>
                </TerminalsProvider>
              </AttendanceProvider>
            </PersonsProvider>
          </EntityProvider>
        </CardScrollProvider>
      </NavbarProvider>
    </LicenseProvider >
  );
}

export default App;