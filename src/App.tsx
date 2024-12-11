import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Login } from './pages/login&forgot/Login';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/persons/Employees';
import { Departments } from './pages/persons/Departments';
import { Categories } from './pages/persons/Categories';
import { ExternalEntities } from './pages/persons/ExternalEntities';
import { Groups } from './pages/persons/Groups';
import { Professions } from './pages/persons/Professions';
import { Zones } from './pages/persons/Zones';
import { NotFound } from './pages/errors/NotFound';
import { Persons } from './pages/persons/Persons';
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
import { NkioskDashboardLicensed } from './pages/nidtec/nkiosk/NkioskDashboardLicensed';
import { NaccessDashboardLicensed } from './pages/sisnid/naccess/NaccessDashboardLicensed';
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
import { NkioskMap } from './pages/nidtec/nkiosk/NkioskMap';
import { NkioskPayTerminal } from './pages/nidtec/nkiosk/NkioskPayTerminal';
import { NkioskPayCoins } from './pages/nidtec/nkiosk/NkioskPayCoins';
import { NkioskMoveCard } from './pages/nidtec/nkiosk/NkioskMoveCard';
import { NkioskMoveKiosk } from './pages/nidtec/nkiosk/NkioskMoveKiosk';
import { NkioskListMovements } from './pages/nidtec/nkiosk/NkioskListMovements';
import { NkioskListPayments } from './pages/nidtec/nkiosk/NkioskListPayments';
import { NledAdsLogs } from './pages/nidtec/nled/NledAdsLogs';
import { NewUsers } from './pages/configs/NewUsers';
import { TimePeriods } from './pages/devices/TimePeriods';
import { AccessControls } from './pages/devices/AccessControls';
import { NkioskMoveVP } from './pages/nidtec/nkiosk/NkioskMoveVP';
import { TerminalsMB } from './pages/devices/TerminalsMB';
import { TerminalCloseOpen } from './pages/devices/TerminalCloseOpen';
import { NkioskGraph } from './pages/nidtec/nkiosk/NkioskGraph';
import { NcaravanDashboard } from './pages/nidsof/ncaravan/NcaravanDashboard';
import { NclinicDashboard } from './pages/nidsof/nclinic/NclinicDashboard';
import { NcountDashboard } from './pages/nidsof/ncount/NcountDashboard';
import { NdocDashboard } from './pages/nidsof/ndoc/NdocDashboard';
import { NeventsDashboard } from './pages/nidsof/nevents/NeventsDashboard';
import { NgoldDashboard } from './pages/nidsof/ngold/NgoldDashboard';
import { NgymDashboard } from './pages/nidsof/ngym/NgymDashboard';
import { NinvoiceDashboard } from './pages/nidsof/ninvoice/NinvoiceDashboard';
import { NmechanicDashboard } from './pages/nidsof/nmechanic/NmechanicDashboard';
import { NopticsDashboard } from './pages/nidsof/noptics/NopticsDashboard';
import { NproductionDashboard } from './pages/nidsof/nproduction/NproductionDashboard';
import { NsalesDashboard } from './pages/nidsof/nsales/NsalesDashboard';
import { NschoolDashboard } from './pages/nidsof/nschool/NschoolDashboard';
import { NserviceDashboard } from './pages/nidsof/nservice/NserviceDashboard';
import { NsportsDashboard } from './pages/nidsof/nsports/NsportsDashboard';
import { NtaskDashboard } from './pages/nidsof/ntask/NtaskDashboard';
import { NticketDashboard } from './pages/nidsof/nticket/NticketDashboard';
import { NbuildDashboard } from './pages/nidsof/nbuild/NbuildDashboard';
import { LicenseProvider } from './context/LicenseContext';
import { NclockDashboard } from './pages/sisnid/nclock/NclockDashboard';
import { NaccessDashboard } from './pages/sisnid/naccess/NaccessDashboard';
import { NkioskDashboard } from './pages/nidtec/nkiosk/NkioskDashboard';
import { NkioskGetCoins } from './pages/nidtec/nkiosk/NkioskGetCoins';
import { NvisitorDashboardLicensed } from './pages/sisnid/nvisitor/NvisitorDashboardLicensed';
import { NviewDashboardLicensed } from './pages/sisnid/nview/NviewDashboardLicensed';
import { NsecurDashboardLicensed } from './pages/sisnid/nsecur/NsecurDashboardLicensed';
import { NledDashboardLicensed } from './pages/nidtec/nled/NledDashboardLicensed';
import { NledGraph } from './pages/nidtec/nled/NledGraph';
import { NsecurGraph } from './pages/sisnid/nsecur/NsecurGraph';
import { NviewGraph } from './pages/sisnid/nview/NviewGraph';
import { NvisitorGraph } from './pages/sisnid/nvisitor/NvisitorGraph';
import { NclockDashboardLicensed } from './pages/sisnid/nclock/NclockDashboardLicensed';
import { NclockGraph } from './pages/sisnid/nclock/NclockGraph';
import { NaccessGraph } from './pages/sisnid/naccess/NaccessGraph';
import { NkioskDoorOpen } from './pages/nidtec/nkiosk/NkioskDoorOpen';
import { NkioskCleaning } from './pages/nidtec/nkiosk/NkioskCleaning';
import { NkioskOccurrences } from './pages/nidtec/nkiosk/NkioskOccurrences';
import { NkioskCounter } from './pages/nidtec/nkiosk/NkioskCounter';
import { NledAds } from './pages/nidtec/nled/NledAds';
import { NkioskAlerts } from './pages/nidtec/nkiosk/NkioskAlerts';
import { LoginLogs } from './pages/configs/LoginLogs';
import { HistoryLogs } from './pages/configs/HistoryLogs';
import { PersonsProvider } from './context/PersonsContext';
import { AttendanceProvider } from './context/MovementContext';
import { TerminalsProvider } from './context/TerminalsContext';
import { AdsProvider } from './context/AdsContext';
import { ForgotPassword } from './pages/login&forgot/ForgotPassword';
import { ResetPassword } from './pages/login&forgot/PasswordReset';
import { NviewOnlineCameras } from './pages/sisnid/nview/NviewOnlineCameras';
import { Entities } from './pages/configs/Entities';
import { CustomSpinner } from './components/CustomSpinner';
import { EntityProvider } from './context/EntityContext';

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
      await delay(300);
      setLoading(false);
      setShowContent(true);
    };

    loadPage();
  }, [location]);

  return (
    <div>
      {loading && (
        <div className="loading-spinner">
          <CustomSpinner />
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
              <Route path="/login&forgot/forgotpassword" element={<ForgotPassword />} />
              <Route path='/login&forgot/resetpassword' element={<ResetPassword />} />
              <Route path="/errors/notfound" element={<NotFound />} />
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
              <Route path="/devices/terminalsmb" element={<PageProtection><TerminalsMB /></PageProtection>} />
              <Route path="/devices/terminalcloseopen" element={<PageProtection><TerminalCloseOpen /></PageProtection>} />
              <Route path="/devices/AccessControls" element={<PageProtection><AccessControls /></PageProtection>} />
              <Route path="/devices/timeperiods" element={<PageProtection><TimePeriods /></PageProtection>} />
              <Route path="/configs/newusers" element={<PageProtection><NewUsers /></PageProtection>} />
              <Route path="/configs/entities" element={<PageProtection><Entities /></PageProtection>} />
              <Route path="/configs/loginlogs" element={<PageProtection><LoginLogs /></PageProtection>} />
              <Route path="/configs/historylogs" element={<PageProtection><HistoryLogs /></PageProtection>} />
              <Route path="/nclock/nclockdashboard" element={<PageProtection><NclockDashboard /></PageProtection>} />
              <Route path="/nclock/nclockdashboardlicensed" element={<PageProtection><NclockDashboardLicensed /></PageProtection>} />
              <Route path="/nclock/nclockmovement" element={<PageProtection><NclockMovement /></PageProtection>} />
              <Route path="/nclock/nclockpresence" element={<PageProtection><NclockPresence /></PageProtection>} />
              <Route path="/nclock/nclockrequests" element={<PageProtection><NclockRequests /></PageProtection>} />
              <Route path="/nclock/nclockall" element={<PageProtection><NclockAll /></PageProtection>} />
              <Route path="/nclock/nclockgraph" element={<PageProtection><NclockGraph /></PageProtection>} />
              <Route path="/naccess/naccessdashboard" element={<PageProtection><NaccessDashboard /></PageProtection>} />
              <Route path="/naccess/naccessdashboardlicensed" element={<PageProtection><NaccessDashboardLicensed /></PageProtection>} />
              <Route path="/naccess/naccessgraph" element={<PageProtection><NaccessGraph /></PageProtection>} />
              <Route path="/nvisitor/nvisitordashboard" element={<PageProtection><NvisitorDashboard /></PageProtection>} />
              <Route path="/nvisitor/nvisitordashboardlicensed" element={<PageProtection><NvisitorDashboardLicensed /></PageProtection>} />
              <Route path="/nvisitor/nvisitorgraph" element={<PageProtection><NvisitorGraph /></PageProtection>} />
              <Route path="/nview/nviewdashboard" element={<PageProtection><NviewDashboard /></PageProtection>} />
              <Route path="/nview/nviewdashboardlicensed" element={<PageProtection><NviewDashboardLicensed /></PageProtection>} />
              <Route path="/nview/nviewgraph" element={<PageProtection><NviewGraph /></PageProtection>} />
              <Route path="/nview/nviewonlinecameras" element={<PageProtection><NviewOnlineCameras /></PageProtection>} />
              <Route path="/ncard/ncarddashboard" element={<PageProtection><NcardDashboard /></PageProtection>} />
              <Route path="/ndoor/ndoordashboard" element={<PageProtection><NdoorDashboard /></PageProtection>} />
              <Route path="/npark/nparkdashboard" element={<PageProtection><NparkDashboard /></PageProtection>} />
              <Route path="/npatrol/npatroldashboard" element={<PageProtection><NpatrolDashboard /></PageProtection>} />
              <Route path="/nsecur/nsecurdashboard" element={<PageProtection><NsecurDashboard /></PageProtection>} />
              <Route path="/nsecur/nsecurdashboardlicensed" element={<PageProtection><NsecurDashboardLicensed /></PageProtection>} />
              <Route path="/nsecur/nsecurgraph" element={<PageProtection><NsecurGraph /></PageProtection>} />
              <Route path="/nsoftware/nsoftwaredashboard" element={<PageProtection><NsoftwareDashboard /></PageProtection>} />
              <Route path="/nsystem/nsystemdashboard" element={<PageProtection><NsystemDashboard /></PageProtection>} />
              <Route path="/napp/nappdashboard" element={<PageProtection><NappDashboard /></PageProtection>} />
              <Route path="/ncyber/ncyberdashboard" element={<PageProtection><NcyberDashboard /></PageProtection>} />
              <Route path="/ndigital/ndigitaldashboard" element={<PageProtection><NdigitalDashboard /></PageProtection>} />
              <Route path="/nserver/nserverdashboard" element={<PageProtection><NserverDashboard /></PageProtection>} />
              <Route path="/naut/nautdashboard" element={<PageProtection><NautDashboard /></PageProtection>} />
              <Route path="/nequip/nequipdashboard" element={<PageProtection><NequipDashboard /></PageProtection>} />
              <Route path="/nproject/nprojectdashboard" element={<PageProtection><NprojectDashboard /></PageProtection>} />
              <Route path="/ncount/ncountdashboard" element={<PageProtection><NcountDashboard /></PageProtection>} />
              <Route path="/nbuild/nbuilddashboard" element={<PageProtection><NbuildDashboard /></PageProtection>} />
              <Route path="/ncaravan/ncaravandashboard" element={<PageProtection><NcaravanDashboard /></PageProtection>} />
              <Route path="/nmechanic/nmechanicdashboard" element={<PageProtection><NmechanicDashboard /></PageProtection>} />
              <Route path="/nevents/neventsdashboard" element={<PageProtection><NeventsDashboard /></PageProtection>} />
              <Route path="/nservice/nservicedashboard" element={<PageProtection><NserviceDashboard /></PageProtection>} />
              <Route path="/ntask/ntaskdashboard" element={<PageProtection><NtaskDashboard /></PageProtection>} />
              <Route path="/nproduction/nproductiondashboard" element={<PageProtection><NproductionDashboard /></PageProtection>} />
              <Route path="/nticket/nticketdashboard" element={<PageProtection><NticketDashboard /></PageProtection>} />
              <Route path="/nsales/nsalesdashboard" element={<PageProtection><NsalesDashboard /></PageProtection>} />
              <Route path="/ninvoice/ninvoicedashboard" element={<PageProtection><NinvoiceDashboard /></PageProtection>} />
              <Route path="/ndoc/ndocdashboard" element={<PageProtection><NdocDashboard /></PageProtection>} />
              <Route path="/nsports/nsportsdashboard" element={<PageProtection><NsportsDashboard /></PageProtection>} />
              <Route path="/ngym/ngymdashboard" element={<PageProtection><NgymDashboard /></PageProtection>} />
              <Route path="/nschool/nschooldashboard" element={<PageProtection><NschoolDashboard /></PageProtection>} />
              <Route path="/nclinic/nclinicdashboard" element={<PageProtection><NclinicDashboard /></PageProtection>} />
              <Route path="/noptics/nopticsdashboard" element={<PageProtection><NopticsDashboard /></PageProtection>} />
              <Route path="/ngold/ngolddashboard" element={<PageProtection><NgoldDashboard /></PageProtection>} />
              <Route path="/nsmart/nsmartdashboard" element={<PageProtection><NsmartDashboard /></PageProtection>} />
              <Route path="/nreality/nrealitydashboard" element={<PageProtection><NrealityDashboard /></PageProtection>} />
              <Route path="/nhologram/nhologramdashboard" element={<PageProtection><NhologramDashboard /></PageProtection>} />
              <Route path="/npower/npowerdashboard" element={<PageProtection><NpowerDashboard /></PageProtection>} />
              <Route path="/ncharge/nchargedashboard" element={<PageProtection><NchargeDashboard /></PageProtection>} />
              <Route path="/ncity/ncitydashboard" element={<PageProtection><NcityDashboard /></PageProtection>} />
              <Route path="/nkiosk/nkioskdashboard" element={<PageProtection><NkioskDashboard /></PageProtection>} />
              <Route path="/nkiosk/nkioskdashboardlicensed" element={<PageProtection><NkioskDashboardLicensed /></PageProtection>} />
              <Route path="/nkiosk/nkioskMap" element={<PageProtection><NkioskMap /></PageProtection>} />
              <Route path="/nkiosk/nkioskPayTerminal" element={<PageProtection><NkioskPayTerminal /></PageProtection>} />
              <Route path="/nkiosk/nkioskPayCoins" element={<PageProtection><NkioskPayCoins /></PageProtection>} />
              <Route path="/nkiosk/nkioskMoveCard" element={<PageProtection><NkioskMoveCard /></PageProtection>} />
              <Route path="/nkiosk/nkioskMoveKiosk" element={<PageProtection><NkioskMoveKiosk /></PageProtection>} />
              <Route path="/nkiosk/nkioskMoveVP" element={<PageProtection><NkioskMoveVP /></PageProtection>} />
              <Route path="/nkiosk/nkioskListPayments" element={<PageProtection><NkioskListPayments /></PageProtection>} />
              <Route path="/nkiosk/nkioskListMovements" element={<PageProtection><NkioskListMovements /></PageProtection>} />
              <Route path="/nkiosk/nkioskgraph" element={<PageProtection><NkioskGraph /></PageProtection>} />
              <Route path="/nkiosk/nkioskgetcoins" element={<PageProtection><NkioskGetCoins /></PageProtection>} />
              <Route path="/nkiosk/nkioskdooropen" element={<PageProtection><NkioskDoorOpen /></PageProtection>} />
              <Route path="/nkiosk/nkioskcleaning" element={<PageProtection><NkioskCleaning /></PageProtection>} />
              <Route path="/nkiosk/nkioskoccurrences" element={<PageProtection><NkioskOccurrences /></PageProtection>} />
              <Route path="/nkiosk/nkioskcounter" element={<PageProtection><NkioskCounter /></PageProtection>} />
              <Route path="/nkiosk/nkioskalerts" element={<PageProtection><NkioskAlerts /></PageProtection>} />
              <Route path="/nled/nleddashboard" element={<PageProtection><NledDashboard /></PageProtection>} />
              <Route path="/nled/nleddashboardlicensed" element={<PageProtection><NledDashboardLicensed /></PageProtection>} />
              <Route path="/nled/nledads" element={<PageProtection><NledAds /></PageProtection>} />
              <Route path="/nled/nledgraph" element={<PageProtection><NledGraph /></PageProtection>} />
              <Route path="/nled/nledadslogs" element={<PageProtection><NledAdsLogs /></PageProtection>} />
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
    <LicenseProvider>
      <ColorProvider>
        <EntityProvider>
          <PersonsProvider>
            <AttendanceProvider>
              <TerminalsProvider>
                <AdsProvider>
                  <Router>
                    <ToastContainer />
                    <AnimatedRoutes />
                  </Router>
                </AdsProvider>
              </TerminalsProvider>
            </AttendanceProvider>
          </PersonsProvider>
        </EntityProvider>
      </ColorProvider>
    </LicenseProvider >
  );
}

export default App;