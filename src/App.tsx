import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Spinner } from 'react-bootstrap';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NClockDashboard } from './pages/nclock/NClockDashboard';
import { ForgotPassword } from './pages/ForgotPassword';
import { Employees } from './pages/Employees';
import { Departments } from './pages/Departments';
import { Categories } from './pages/Categories';
import { ExternalEntities } from './pages/ExternalEntities';
import { Groups } from './pages/Groups';
import { Professions } from './pages/Professions';
import { Zones } from './pages/Zones';
import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import { Persons } from './pages/Persons';
import { ResetPassword } from './pages/PasswordReset';
import { ExternalEmployees } from './pages/ExternalEmployees';
import { User } from './pages/User';
import { Visitors } from './pages/Visitors';
import { Contacts } from './pages/Contacts';
import { Temporaries } from './pages/Temporaries';
import { NAccessDashboard } from './pages/naccess/NAccessDashboard';
import { Movement } from './pages/nclock/Movement';
import { PageProtection } from './components/PageProtection';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/dashboard" element={<PageProtection><Dashboard /></PageProtection>} />
              <Route path="/persons" element={<PageProtection><Persons /></PageProtection>} />
              <Route path="/employees" element={<PageProtection><Employees /></PageProtection>} />
              <Route path="/externalemployees" element={<PageProtection><ExternalEmployees /></PageProtection>} />
              <Route path="/user" element={<PageProtection><User /></PageProtection>} />
              <Route path="/visitors" element={<PageProtection><Visitors /></PageProtection>} />
              <Route path="/contacts" element={<PageProtection><Contacts /></PageProtection>} />
              <Route path="/temporaries" element={<PageProtection><Temporaries /></PageProtection>} />
              <Route path="/departments" element={<PageProtection><Departments /></PageProtection>} />
              <Route path="/categories" element={<PageProtection><Categories /></PageProtection>} />
              <Route path="/externalentities" element={<PageProtection><ExternalEntities /></PageProtection>} />
              <Route path="/groups" element={<PageProtection><Groups /></PageProtection>} />
              <Route path="/professions" element={<PageProtection><Professions /></PageProtection>} />
              <Route path="/zones" element={<PageProtection><Zones /></PageProtection>} />
              <Route path="/nclockdashboard" element={<PageProtection><NClockDashboard /></PageProtection>} />
              <Route path="/pages/movement" element={<PageProtection><Movement /></PageProtection>} />
              <Route path="/naccessdashboard" element={<PageProtection><NAccessDashboard /></PageProtection>} />
              <Route path="*" element={<NotFound />} />
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