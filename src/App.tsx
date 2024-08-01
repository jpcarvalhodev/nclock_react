import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Spinner } from 'react-bootstrap';
import { Login } from './pages/login&forgot/Login';
import { Dashboard } from './pages/Dashboard';
import { ForgotPassword } from './pages/login&forgot/ForgotPassword';
import { Employees } from './pages/persons/Employees';
import { Departments } from './pages/persons/Departments';
import { Categories } from './pages/persons/Categories';
import { ExternalEntities } from './pages/persons/ExternalEntities';
import { Groups } from './pages/persons/Groups';
import { Professions } from './pages/persons/Professions';
import { Zones } from './pages/persons/Zones';
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';
import { Persons } from './pages/persons/Persons';
import { ResetPassword } from './pages/login&forgot/PasswordReset';
import { ExternalEmployees } from './pages/persons/ExternalEmployees';
import { User } from './pages/persons/User';
import { Visitors } from './pages/persons/Visitors';
import { Contacts } from './pages/persons/Contacts';
import { Temporaries } from './pages/persons/Temporaries';
import { NclockMovement } from './pages/nclock/NclockMovement';
import { PageProtection } from './components/PageProtection';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NclockRequests } from './pages/nclock/NclockRequests';
import { NclockPresence } from './pages/nclock/NclockPresence';
import { NclockAll } from './pages/nclock/NclockAll';
import { Types } from './pages/persons/Types';
import { Terminals } from './pages/devices/Terminals';
import { NclockDashboard } from './pages/nclock/NClockDashboard';
import { NaccessDashboard } from './pages/naccess/NAccessDashboard';

// Define o tempo de delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Define a função de rotas com animação
function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Carrega a página com delay e mostra o conteúdo
  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setShowContent(false);
      await delay(500);
      setLoading(false);
      setShowContent(true);
    };

    loadPage();
  }, [location]);

  return (
    <div>
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" role="status" className="large-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          nodeRef={nodeRef}
          timeout={500}
          classNames="fade"
        >
          <div ref={nodeRef} style={{ display: showContent ? 'block' : 'none' }}>
            <Routes location={location}>
              <Route path="/" element={<Login />} />
              <Route path="/login&forgot/forgot-password" element={<ForgotPassword />} />
              <Route path='/login&forgot/reset-password' element={<ResetPassword />} />
              <Route path="*" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard" element={<PageProtection><Dashboard /></PageProtection>} />
              <Route path="/persons/persons" element={<PageProtection><Persons /></PageProtection>} />
              <Route path="/persons/employees" element={<PageProtection><Employees /></PageProtection>} />
              <Route path="/persons/externalemployees" element={<PageProtection><ExternalEmployees /></PageProtection>} />
              <Route path="/persons/user" element={<PageProtection><User /></PageProtection>} />
              <Route path="/persons/visitors" element={<PageProtection><Visitors /></PageProtection>} />
              <Route path="/persons/contacts" element={<PageProtection><Contacts /></PageProtection>} />
              <Route path="/persons/temporaries" element={<PageProtection><Temporaries /></PageProtection>} />
              <Route path="/persons/departments" element={<PageProtection><Departments /></PageProtection>} />
              <Route path="/persons/categories" element={<PageProtection><Categories /></PageProtection>} />
              <Route path="/persons/externalentities" element={<PageProtection><ExternalEntities /></PageProtection>} />
              <Route path="/persons/groups" element={<PageProtection><Groups /></PageProtection>} />
              <Route path="/persons/professions" element={<PageProtection><Professions /></PageProtection>} />
              <Route path="/persons/zones" element={<PageProtection><Zones /></PageProtection>} />
              <Route path="/persons/types" element={<PageProtection><Types /></PageProtection>} />
              <Route path="/devices/terminals" element={<PageProtection><Terminals /></PageProtection>} />
              <Route path="/nclock/nclockdashboard" element={<PageProtection><NclockDashboard /></PageProtection>} />
              <Route path="/nclock/nclockmovement" element={<PageProtection><NclockMovement /></PageProtection>} />
              <Route path="/nclock/nclockpresence" element={<PageProtection><NclockPresence /></PageProtection>} />
              <Route path="/nclock/nclockrequests" element={<PageProtection><NclockRequests /></PageProtection>} />
              <Route path="/nclock/nclockall" element={<PageProtection><NclockAll /></PageProtection>} />
              <Route path="/naccess/naccessdashboard" element={<PageProtection><NaccessDashboard /></PageProtection>} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;