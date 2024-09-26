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
import { PageProtection } from './components/PageProtection';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Types } from './pages/persons/Types';
import { Terminals } from './pages/devices/Terminals';
import { NkioskDashboard } from './pages/nidtec/nkiosk/NkioskDashboard';
import { NclockDashboard } from './pages/sisnid/nclock/NclockDashboard';
import { NaccessDashboard } from './pages/sisnid/naccess/NaccessDashboard';
import { NclockAll } from './pages/sisnid/nclock/NclockAll';
import { NclockMovement } from './pages/sisnid/nclock/NclockMovement';
import { NclockPresence } from './pages/sisnid/nclock/NclockPresence';
import { NclockRequests } from './pages/sisnid/nclock/NclockRequests';
import { NviewDashboard } from './pages/sisnid/nview/NviewDashboard';
import { NvisitorDashboard } from './pages/sisnid/nvisitor/NvisitorDashboard';
import { NcardDashboard } from './pages/sisnid/ncard/NcardDashboard';
import { NdoorDashboard } from './pages/sisnid/ndoor/NdoorDashboard';
import { NparkDashboard } from './pages/sisnid/npark/NparkDashboard';
import { NpatrolDashboard } from './pages/sisnid/npatrol/NpatrolDashboard';
import { NsecurDashboard } from './pages/sisnid/nsecur/NsecurDashboard';
import { NappDashboard } from './pages/nidsof/napp/NappDashboard';
import { NautDashboard } from './pages/nidsof/naut/NautDashboard';
import { NcyberDashboard } from './pages/nidsof/ncyber/NcyberDashboard';
import { NdigitalDashboard } from './pages/nidsof/ndigital/NdigitalDashboard';
import { NequipDashboard } from './pages/nidsof/nequip/NequipDashboard';
import { NprojectDashboard } from './pages/nidsof/nproject/NprojectDashboard';
import { NserverDashboard } from './pages/nidsof/nserver/NserverDashboard';
import { NsoftwareDashboard } from './pages/nidsof/nsoftware/NsoftwareDashboard';
import { NsystemDashboard } from './pages/nidsof/nsystem/NsystemDashboard';
import { NsmartDashboard } from './pages/nidtec/nsmart/NsmartDashboard';
import { NchargeDashboard } from './pages/nidtec/ncharge/NchargeDashboard';
import { NcityDashboard } from './pages/nidtec/ncity/NcityDashboard';
import { NfireDashboard } from './pages/nidtec/nfire/NfireDashboard';
import { NhologramDashboard } from './pages/nidtec/nhologram/NhologramDashboard';
import { NledDashboard } from './pages/nidtec/nled/NledDashboard';
import { NpowerDashboard } from './pages/nidtec/npower/NpowerDashboard';
import { NrealityDashboard } from './pages/nidtec/nreality/NrealityDashboard';
import { NcomfortDashboard } from './pages/nidplace/ncomfort/NcomfortDashboard';
import { NconnectDashboard } from './pages/nidplace/nconnect/NconnectDashboard';
import { NdecorDashboard } from './pages/nidplace/ndecor/NdecorDashboard';
import { NfurnitureDashboard } from './pages/nidplace/nfurniture/NfurnitureDashboard';
import { NhomeDashboard } from './pages/nidplace/nhome/NhomeDashboard';
import { NlightDashboard } from './pages/nidplace/nlight/NlightDashboard';
import { NpartitionDashboard } from './pages/nidplace/npartition/NpartitionDashboard';
import { NpingDashboard } from './pages/nidplace/nping/NpingDashboard';
import { NsoundDashboard } from './pages/nidplace/nsound/NsoundDashboard';
import { ColorProvider } from './context/ColorContext';
import { NkioskAds } from './pages/nidtec/nkiosk/NkioskAds';
import { NkioskMap } from './pages/nidtec/nkiosk/NkioskMap';
import { NkioskPayTerminal } from './pages/nidtec/nkiosk/NkioskPayTerminal';
import { NkioskPayCoins } from './pages/nidtec/nkiosk/NkioskPayCoins';
import { NkioskMoveCard } from './pages/nidtec/nkiosk/NkioskMoveCard';
import { NkioskMoveDoorman } from './pages/nidtec/nkiosk/NkioskMoveDoorman';
import { NkioskListMovements } from './pages/nidtec/nkiosk/NkioskListMovements';
import { NkioskListPayments } from './pages/nidtec/nkiosk/NkioskListPayments';
import { NkioskLogs } from './pages/nidtec/nkiosk/NkioskLogs';
import { NewUsers } from './pages/configs/NewUsers';

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
              <Route path="/configs/newusers" element={<PageProtection><NewUsers /></PageProtection>} />
              <Route path="/nclock/nclockdashboard" element={<PageProtection><NclockDashboard /></PageProtection>} />
              <Route path="/nclock/nclockmovement" element={<PageProtection><NclockMovement /></PageProtection>} />
              <Route path="/nclock/nclockpresence" element={<PageProtection><NclockPresence /></PageProtection>} />
              <Route path="/nclock/nclockrequests" element={<PageProtection><NclockRequests /></PageProtection>} />
              <Route path="/nclock/nclockall" element={<PageProtection><NclockAll /></PageProtection>} />
              <Route path="/naccess/naccessdashboard" element={<PageProtection><NaccessDashboard /></PageProtection>} />
              <Route path="/nvisitor/nvisitordashboard" element={<PageProtection><NvisitorDashboard /></PageProtection>} />
              <Route path="/nview/nviewdashboard" element={<PageProtection><NviewDashboard /></PageProtection>} />
              <Route path="/ncard/ncarddashboard" element={<PageProtection><NcardDashboard /></PageProtection>} />
              <Route path="/ndoor/ndoordashboard" element={<PageProtection><NdoorDashboard /></PageProtection>} />
              <Route path="/npark/nparkdashboard" element={<PageProtection><NparkDashboard /></PageProtection>} />
              <Route path="/npatrol/npatroldashboard" element={<PageProtection><NpatrolDashboard /></PageProtection>} />
              <Route path="/nsecur/nsecurdashboard" element={<PageProtection><NsecurDashboard /></PageProtection>} />
              <Route path="/nsoftware/nsoftwaredashboard" element={<PageProtection><NsoftwareDashboard /></PageProtection>} />
              <Route path="/nsystem/nsystemdashboard" element={<PageProtection><NsystemDashboard /></PageProtection>} />
              <Route path="/napp/nappdashboard" element={<PageProtection><NappDashboard /></PageProtection>} />
              <Route path="/ncyber/ncyberdashboard" element={<PageProtection><NcyberDashboard /></PageProtection>} />
              <Route path="/ndigital/ndigitaldashboard" element={<PageProtection><NdigitalDashboard /></PageProtection>} />
              <Route path="/nserver/nserverdashboard" element={<PageProtection><NserverDashboard /></PageProtection>} />
              <Route path="/naut/nautdashboard" element={<PageProtection><NautDashboard /></PageProtection>} />
              <Route path="/nequip/nequipdashboard" element={<PageProtection><NequipDashboard /></PageProtection>} />
              <Route path="/nproject/nprojectdashboard" element={<PageProtection><NprojectDashboard /></PageProtection>} />
              <Route path="/nsmart/nsmartdashboard" element={<PageProtection><NsmartDashboard /></PageProtection>} />
              <Route path="/nreality/nrealitydashboard" element={<PageProtection><NrealityDashboard /></PageProtection>} />
              <Route path="/nhologram/nhologramdashboard" element={<PageProtection><NhologramDashboard /></PageProtection>} />
              <Route path="/npower/npowerdashboard" element={<PageProtection><NpowerDashboard /></PageProtection>} />
              <Route path="/ncharge/nchargedashboard" element={<PageProtection><NchargeDashboard /></PageProtection>} />
              <Route path="/ncity/ncitydashboard" element={<PageProtection><NcityDashboard /></PageProtection>} />
              <Route path="/nkiosk/nkioskdashboard" element={<PageProtection><NkioskDashboard /></PageProtection>} />
              <Route path="/nkiosk/NkioskAds" element={<PageProtection><NkioskAds /></PageProtection>} />
              <Route path="/nkiosk/NkioskMap" element={<PageProtection><NkioskMap /></PageProtection>} />
              <Route path="/nkiosk/NkioskPayTerminal" element={<PageProtection><NkioskPayTerminal /></PageProtection>} />
              <Route path="/nkiosk/NkioskPayCoins" element={<PageProtection><NkioskPayCoins /></PageProtection>} />
              <Route path="/nkiosk/NkioskMoveCard" element={<PageProtection><NkioskMoveCard /></PageProtection>} />
              <Route path="/nkiosk/NkioskMoveDoorman" element={<PageProtection><NkioskMoveDoorman /></PageProtection>} />
              <Route path="/nkiosk/NkioskListPayments" element={<PageProtection><NkioskListPayments /></PageProtection>} />
              <Route path="/nkiosk/NkioskListMovements" element={<PageProtection><NkioskListMovements /></PageProtection>} />
              <Route path="/nkiosk/NkioskLogs" element={<PageProtection><NkioskLogs /></PageProtection>} />
              <Route path="/nled/nleddashboard" element={<PageProtection><NledDashboard /></PageProtection>} />
              <Route path="/nfire/nfiredashboard" element={<PageProtection><NfireDashboard /></PageProtection>} />
              <Route path="/nfurniture/nfurnituredashboard" element={<PageProtection><NfurnitureDashboard /></PageProtection>} />
              <Route path="/npartition/npartitiondashboard" element={<PageProtection><NpartitionDashboard /></PageProtection>} />
              <Route path="/ndecor/ndecordashboard" element={<PageProtection><NdecorDashboard /></PageProtection>} />
              <Route path="/nping/npingdashboard" element={<PageProtection><NpingDashboard /></PageProtection>} />
              <Route path="/nconnect/nconnectdashboard" element={<PageProtection><NconnectDashboard /></PageProtection>} />
              <Route path="/nlight/nlightdashboard" element={<PageProtection><NlightDashboard /></PageProtection>} />
              <Route path="/ncomfort/ncomfortdashboard" element={<PageProtection><NcomfortDashboard /></PageProtection>} />
              <Route path="/nsound/nsounddashboard" element={<PageProtection><NsoundDashboard /></PageProtection>} />
              <Route path="/nhome/nhomedashboard" element={<PageProtection><NhomeDashboard /></PageProtection>} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <ColorProvider>
      <Router>
        <ToastContainer />
        <AnimatedRoutes />
      </Router>
    </ColorProvider>
  );
}

export default App;