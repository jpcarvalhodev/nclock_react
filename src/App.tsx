import { useRef } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { LayoutWithNavBar } from './components/LayoutWithNavbar';
import { PageProtection } from './components/PageProtection';
import { AdsProvider } from './context/AdsContext';
import { CardScrollProvider } from './context/CardScrollContext';
import { EntityProvider } from './context/EntityContext';
import { KioskProvider } from './context/KioskContext';
import { LicenseProvider } from './context/LicenseContext';
import { AttendanceProvider } from './context/MovementContext';
import { NavbarProvider } from './context/NavbarContext';
import { PersonsProvider } from './context/PersonsContext';
import { TerminalsProvider } from './context/TerminalsContext';
import { Entities } from './pages/configs/Entities';
import { HistoryLogs } from './pages/configs/HistoryLogs';
import { LoginLogs } from './pages/configs/LoginLogs';
import { NewUsers } from './pages/configs/NewUsers';
import { Dashboard } from './pages/Dashboard';
import { AccessControls } from './pages/devices/AccessControls';
import { TerminalCloseOpen } from './pages/devices/TerminalCloseOpen';
import { Terminals } from './pages/devices/Terminals';
import { TerminalsMB } from './pages/devices/TerminalsMB';
import { TimePeriods } from './pages/devices/TimePeriods';
import { TimePlans } from './pages/devices/TimePlans';
import { NotFound } from './pages/errors/NotFound';
import { ForgotPassword } from './pages/login&forgot/ForgotPassword';
import { Login } from './pages/login&forgot/Login';
import { ResetPassword } from './pages/login&forgot/PasswordReset';
import { NcomfortDashboard } from './pages/nidplace/ncomfort/NcomfortDashboard';
import { NcomfortDashboardLicensed } from './pages/nidplace/ncomfort/NcomfortDashboardLicensed';
import { NcomfortGraph } from './pages/nidplace/ncomfort/NcomfortGraph';
import { NconnectDashboard } from './pages/nidplace/nconnect/NconnectDashboard';
import { NconnectDashboardLicensed } from './pages/nidplace/nconnect/NconnectDashboardLicensed';
import { NconnectGraph } from './pages/nidplace/nconnect/NconnectGraph';
import { NdecorDashboard } from './pages/nidplace/ndecor/NdecorDashboard';
import { NdecorDashboardLicensed } from './pages/nidplace/ndecor/NdecorDashboardLicensed';
import { NdecorGraph } from './pages/nidplace/ndecor/NdecorGraph';
import { NfurnitureDashboard } from './pages/nidplace/nfurniture/NfurnitureDashboard';
import { NfurnitureDashboardLicensed } from './pages/nidplace/nfurniture/NfurnitureDashboardLicensed';
import { NfurnitureGraph } from './pages/nidplace/nfurniture/NfurnitureGraph';
import { NhomeDashboard } from './pages/nidplace/nhome/NhomeDashboard';
import { NhomeDashboardLicensed } from './pages/nidplace/nhome/NhomeDashboardLicensed';
import { NhomeGraph } from './pages/nidplace/nhome/NhomeGraph';
import { NlightDashboard } from './pages/nidplace/nlight/NlightDashboard';
import { NlightDashboardLicensed } from './pages/nidplace/nlight/NlightDashboardLicensed';
import { NlightGraph } from './pages/nidplace/nlight/NlightGraph';
import { NpartitionDashboard } from './pages/nidplace/npartition/NpartitionDashboard';
import { NpartitionDashboardLicensed } from './pages/nidplace/npartition/NpartitionDashboardLicensed';
import { NpartitionGraph } from './pages/nidplace/npartition/NpartitionGraph';
import { NpingDashboard } from './pages/nidplace/nping/NpingDashboard';
import { NpingDashboardLicensed } from './pages/nidplace/nping/NpingDashboardLicensed';
import { NpingGraph } from './pages/nidplace/nping/NpingGraph';
import { NsoundDashboard } from './pages/nidplace/nsound/NsoundDashboard';
import { NsoundDashboardLicensed } from './pages/nidplace/nsound/NsoundDashboardLicensed';
import { NsoundGraph } from './pages/nidplace/nsound/NsoundGraph';
import { NappDashboard } from './pages/nidsof/napp/NappDashboard';
import { NappDashboardLicensed } from './pages/nidsof/napp/NappDashboardLicensed';
import { NappGraph } from './pages/nidsof/napp/NappGraph';
import { NautDashboard } from './pages/nidsof/naut/NautDashboard';
import { NautDashboardLicensed } from './pages/nidsof/naut/NautDashboardLicensed';
import { NautGraph } from './pages/nidsof/naut/NautGraph';
import { NbuildDashboard } from './pages/nidsof/nbuild/NbuildDashboard';
import { NbuildDashboardLicensed } from './pages/nidsof/nbuild/NbuildDashboardLicensed';
import { NbuildGraph } from './pages/nidsof/nbuild/NbuildGraph';
import { NcaravanDashboard } from './pages/nidsof/ncaravan/NcaravanDashboard';
import { NcaravanDashboardLicensed } from './pages/nidsof/ncaravan/NcaravanDashboardLicensed';
import { NcaravanGraph } from './pages/nidsof/ncaravan/NcaravanGraph';
import { NclinicDashboard } from './pages/nidsof/nclinic/NclinicDashboard';
import { NclinicDashboardLicensed } from './pages/nidsof/nclinic/NclinicDashboardLicensed';
import { NclinicGraph } from './pages/nidsof/nclinic/NclinicGraph';
import { NcountDashboard } from './pages/nidsof/ncount/NcountDashboard';
import { NcountDashboardLicensed } from './pages/nidsof/ncount/NcountDashboardLicensed';
import { NcountGraph } from './pages/nidsof/ncount/NcountGraph';
import { NcyberDashboard } from './pages/nidsof/ncyber/NcyberDashboard';
import { NcyberDashboardLicensed } from './pages/nidsof/ncyber/NcyberDashboardLicensed';
import { NcyberGraph } from './pages/nidsof/ncyber/NcyberGraph';
import { NdigitalDashboard } from './pages/nidsof/ndigital/NdigitalDashboard';
import { NdigitalDashboardLicensed } from './pages/nidsof/ndigital/NdigitalDashboardLicensed';
import { NdigitalGraph } from './pages/nidsof/ndigital/NdigitalGraph';
import { NdocDashboard } from './pages/nidsof/ndoc/NdocDashboard';
import { NdocDashboardLicensed } from './pages/nidsof/ndoc/NdocDashboardLicensed';
import { NdocGraph } from './pages/nidsof/ndoc/NdocGraph';
import { NequipDashboard } from './pages/nidsof/nequip/NequipDashboard';
import { NequipDashboardLicensed } from './pages/nidsof/nequip/NequipDashboardLicensed';
import { NequipGraph } from './pages/nidsof/nequip/NequipGraph';
import { NeventsDashboard } from './pages/nidsof/nevents/NeventsDashboard';
import { NeventsDashboardLicensed } from './pages/nidsof/nevents/NeventsDashboardLicensed';
import { NeventsGraph } from './pages/nidsof/nevents/NeventsGraph';
import { NgoldDashboard } from './pages/nidsof/ngold/NgoldDashboard';
import { NgoldDashboardLicensed } from './pages/nidsof/ngold/NgoldDashboardLicensed';
import { NgoldGraph } from './pages/nidsof/ngold/NgoldGraph';
import { NgymDashboard } from './pages/nidsof/ngym/NgymDashboard';
import { NgymDashboardLicensed } from './pages/nidsof/ngym/NgymDashboardLicensed';
import { NgymGraph } from './pages/nidsof/ngym/NgymGraph';
import { NinvoiceDashboard } from './pages/nidsof/ninvoice/NinvoiceDashboard';
import { NinvoiceDashboardLicensed } from './pages/nidsof/ninvoice/NinvoiceDashboardLicensed';
import { NinvoiceGraph } from './pages/nidsof/ninvoice/NinvoiceGraph';
import { NmechanicDashboard } from './pages/nidsof/nmechanic/NmechanicDashboard';
import { NmechanicDashboardLicensed } from './pages/nidsof/nmechanic/NmechanicDashboardLicensed';
import { NmechanicGraph } from './pages/nidsof/nmechanic/NmechanicGraph';
import { NopticsDashboard } from './pages/nidsof/noptics/NopticsDashboard';
import { NopticsDashboardLicensed } from './pages/nidsof/noptics/NopticsDashboardLicensed';
import { NopticsGraph } from './pages/nidsof/noptics/NopticsGraph';
import { NproductionDashboard } from './pages/nidsof/nproduction/NproductionDashboard';
import { NproductionDashboardLicensed } from './pages/nidsof/nproduction/NproductionDashboardLicensed';
import { NproductionGraph } from './pages/nidsof/nproduction/NproductionGraph';
import { NprojectDashboard } from './pages/nidsof/nproject/NprojectDashboard';
import { NprojectDashboardLicensed } from './pages/nidsof/nproject/NprojectDashboardLicensed';
import { NprojectGraph } from './pages/nidsof/nproject/NprojectGraph';
import { NsalesDashboard } from './pages/nidsof/nsales/NsalesDashboard';
import { NsalesDashboardLicensed } from './pages/nidsof/nsales/NsalesDashboardLicensed';
import { NsalesGraph } from './pages/nidsof/nsales/NsalesGraph';
import { NschoolDashboard } from './pages/nidsof/nschool/NschoolDashboard';
import { NschoolDashboardLicensed } from './pages/nidsof/nschool/NschoolDashboardLicensed';
import { NschoolGraph } from './pages/nidsof/nschool/NschoolGraph';
import { NserverDashboard } from './pages/nidsof/nserver/NserverDashboard';
import { NserverDashboardLicensed } from './pages/nidsof/nserver/NserverDashboardLicensed';
import { NserverGraph } from './pages/nidsof/nserver/NserverGraph';
import { NserviceDashboard } from './pages/nidsof/nservice/NserviceDashboard';
import { NserviceDashboardLicensed } from './pages/nidsof/nservice/NserviceDashboardLicensed';
import { NserviceGraph } from './pages/nidsof/nservice/NserviceGraph';
import { NsoftwareDashboard } from './pages/nidsof/nsoftware/NsoftwareDashboard';
import { NsoftwareDashboardLicensed } from './pages/nidsof/nsoftware/NsoftwareDashboardLicensed';
import { NsoftwareGraph } from './pages/nidsof/nsoftware/NsoftwareGraph';
import { NsportsDashboard } from './pages/nidsof/nsports/NsportsDashboard';
import { NsportsDashboardLicensed } from './pages/nidsof/nsports/NsportsDashboardLicensed';
import { NsportsGraph } from './pages/nidsof/nsports/NsportsGraph';
import { NsystemDashboard } from './pages/nidsof/nsystem/NsystemDashboard';
import { NsystemDashboardLicensed } from './pages/nidsof/nsystem/NsystemDashboardLicensed';
import { NsystemGraph } from './pages/nidsof/nsystem/NsystemGraph';
import { NtaskDashboard } from './pages/nidsof/ntask/NtaskDashboard';
import { NtaskDashboardLicensed } from './pages/nidsof/ntask/NtaskDashboardLicensed';
import { NtaskGraph } from './pages/nidsof/ntask/NtaskGraph';
import { NticketDashboard } from './pages/nidsof/nticket/NticketDashboard';
import { NticketDashboardLicensed } from './pages/nidsof/nticket/NticketDashboardLicensed';
import { NticketGraph } from './pages/nidsof/nticket/NticketGraph';
import { NchargeDashboard } from './pages/nidtec/ncharge/NchargeDashboard';
import { NchargeDashboardLicensed } from './pages/nidtec/ncharge/NchargeDashboardLicensed';
import { NchargeGraph } from './pages/nidtec/ncharge/NchargeGraph';
import { NcityDashboard } from './pages/nidtec/ncity/NcityDashboard';
import { NcityDashboardLicensed } from './pages/nidtec/ncity/NcityDashboardLicensed';
import { NcityGraph } from './pages/nidtec/ncity/NcityGraph';
import { NfireDashboard } from './pages/nidtec/nfire/NfireDashboard';
import { NfireDashboardLicensed } from './pages/nidtec/nfire/NfireDashboardLicensed';
import { NfireGraph } from './pages/nidtec/nfire/NfireGraph';
import { NhologramDashboard } from './pages/nidtec/nhologram/NhologramDashboard';
import { NhologramDashboardLicensed } from './pages/nidtec/nhologram/NhologramDashboardLicensed';
import { NhologramGraph } from './pages/nidtec/nhologram/NhologramGraph';
import { NkioskAlerts } from './pages/nidtec/nkiosk/NkioskAlerts';
import { NkioskCleaning } from './pages/nidtec/nkiosk/NkioskCleaning';
import { NkioskCounter } from './pages/nidtec/nkiosk/NkioskCounter';
import { NkioskDashboard } from './pages/nidtec/nkiosk/NkioskDashboard';
import { NkioskDashboardLicensed } from './pages/nidtec/nkiosk/NkioskDashboardLicensed';
import { NkioskDoorOpen } from './pages/nidtec/nkiosk/NkioskDoorOpen';
import { NkioskGetCoins } from './pages/nidtec/nkiosk/NkioskGetCoins';
import { NkioskGraph } from './pages/nidtec/nkiosk/NkioskGraph';
import { NkioskListMovements } from './pages/nidtec/nkiosk/NkioskListMovements';
import { NkioskListPayments } from './pages/nidtec/nkiosk/NkioskListPayments';
import { NkioskMap } from './pages/nidtec/nkiosk/NkioskMap';
import { NkioskMoveCard } from './pages/nidtec/nkiosk/NkioskMoveCard';
import { NkioskMoveKiosk } from './pages/nidtec/nkiosk/NkioskMoveKiosk';
import { NkioskMoveVP } from './pages/nidtec/nkiosk/NkioskMoveVP';
import { NkioskOccurrences } from './pages/nidtec/nkiosk/NkioskOccurrences';
import { NkioskPayCoins } from './pages/nidtec/nkiosk/NkioskPayCoins';
import { NkioskPayTerminal } from './pages/nidtec/nkiosk/NkioskPayTerminal';
import { NledAds } from './pages/nidtec/nled/NledAds';
import { NledAdsLogs } from './pages/nidtec/nled/NledAdsLogs';
import { NledDashboard } from './pages/nidtec/nled/NledDashboard';
import { NledDashboardLicensed } from './pages/nidtec/nled/NledDashboardLicensed';
import { NledGraph } from './pages/nidtec/nled/NledGraph';
import { NpowerDashboard } from './pages/nidtec/npower/NpowerDashboard';
import { NpowerDashboardLicensed } from './pages/nidtec/npower/NpowerDashboardLicensed';
import { NpowerGraph } from './pages/nidtec/npower/NpowerGraph';
import { NrealityDashboard } from './pages/nidtec/nreality/NrealityDashboard';
import { NrealityDashboardLicensed } from './pages/nidtec/nreality/NrealityDashboardLicensed';
import { NrealityGraph } from './pages/nidtec/nreality/NrealityGraph';
import { NsmartDashboard } from './pages/nidtec/nsmart/NsmartDashboard';
import { NsmartDashboardLicensed } from './pages/nidtec/nsmart/NsmartDashboardLicensed';
import { NsmartGraph } from './pages/nidtec/nsmart/NsmartGraph';
import { Categories } from './pages/persons/Categories';
import { Contacts } from './pages/persons/Contacts';
import { Departments } from './pages/persons/Departments';
import { Employees } from './pages/persons/Employees';
import { ExternalEmployees } from './pages/persons/ExternalEmployees';
import { ExternalEntities } from './pages/persons/ExternalEntities';
import { Groups } from './pages/persons/Groups';
import { Persons } from './pages/persons/Persons';
import { Professions } from './pages/persons/Professions';
import { Temporaries } from './pages/persons/Temporaries';
import { Types } from './pages/persons/Types';
import { User } from './pages/persons/User';
import { Visitors } from './pages/persons/Visitors';
import { Zones } from './pages/persons/Zones';
import { NaccessAccesses } from './pages/sisnid/naccess/NaccessAccesses';
import { NaccessDashboard } from './pages/sisnid/naccess/NaccessDashboard';
import { NaccessDashboardLicensed } from './pages/sisnid/naccess/NaccessDashboardLicensed';
import { NaccessGraph } from './pages/sisnid/naccess/NaccessGraph';
import { NcardDashboard } from './pages/sisnid/ncard/NcardDashboard';
import { NcardDashboardLicensed } from './pages/sisnid/ncard/NcardDashboardLicensed';
import { NcardGraph } from './pages/sisnid/ncard/NcardGraph';
import { NclockAll } from './pages/sisnid/nclock/NclockAll';
import { NclockDashboard } from './pages/sisnid/nclock/NclockDashboard';
import { NclockDashboardLicensed } from './pages/sisnid/nclock/NclockDashboardLicensed';
import { NclockGraph } from './pages/sisnid/nclock/NclockGraph';
import { NclockMovement } from './pages/sisnid/nclock/NclockMovement';
import { NclockPresence } from './pages/sisnid/nclock/NclockPresence';
import { NclockRequests } from './pages/sisnid/nclock/NclockRequests';
import { NdoorDashboard } from './pages/sisnid/ndoor/NdoorDashboard';
import { NdoorDashboardLicensed } from './pages/sisnid/ndoor/NdoorDashboardLicensed';
import { NdoorGraph } from './pages/sisnid/ndoor/NdoorGraph';
import { NparkDashboard } from './pages/sisnid/npark/NparkDashboard';
import { NparkDashboardLicensed } from './pages/sisnid/npark/NparkDashboardLicensed';
import { NparkGraph } from './pages/sisnid/npark/NparkGraph';
import { NpatrolDashboard } from './pages/sisnid/npatrol/NpatrolDashboard';
import { NpatrolDashboardLicensed } from './pages/sisnid/npatrol/NpatrolDashboardLicensed';
import { NpatrolGraph } from './pages/sisnid/npatrol/NpatrolGraph';
import { NsecurDashboard } from './pages/sisnid/nsecur/NsecurDashboard';
import { NsecurDashboardLicensed } from './pages/sisnid/nsecur/NsecurDashboardLicensed';
import { NsecurGraph } from './pages/sisnid/nsecur/NsecurGraph';
import { NviewDashboard } from './pages/sisnid/nview/NviewDashboard';
import { NviewDashboardLicensed } from './pages/sisnid/nview/NviewDashboardLicensed';
import { NviewGraph } from './pages/sisnid/nview/NviewGraph';
import { NviewOnlineCameras } from './pages/sisnid/nview/NviewOnlineCameras';
import { NvisitorDashboard } from './pages/sisnid/nvisitor/NvisitorDashboard';
import { NvisitorDashboardLicensed } from './pages/sisnid/nvisitor/NvisitorDashboardLicensed';
import { NvisitorGraph } from './pages/sisnid/nvisitor/NvisitorGraph';
import { NvisitorListMovements } from './pages/sisnid/nvisitor/NvisitorListMovements';
import { NvisitorMoveCard } from './pages/sisnid/nvisitor/NvisitorMoveCard';
import { NvisitorMoveKiosk } from './pages/sisnid/nvisitor/NvisitorMoveKiosk';
import { NaccessPresence } from './pages/sisnid/naccess/NaccessPresence';
import { NaccessDoorOpen } from './pages/sisnid/naccess/NaccessDoorOpen';
import { NclockAlerts } from './pages/sisnid/nclock/NclockAlerts';
import { NaccessAlerts } from './pages/sisnid/naccess/NaccessAlerts';
import { NvisitorAlerts } from './pages/sisnid/nvisitor/NvisitorAlerts';
import { NviewAlerts } from './pages/sisnid/nview/NviewAlerts';
import { NledAlerts } from './pages/nidtec/nled/NledAlerts';
import { NclockAccess } from './pages/sisnid/nclock/NclockAccess';
import { NclockAccessPresence } from './pages/sisnid/nclock/NclockAccessPresence';

// Define a função de rotas com animação
function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div ref={nodeRef}>
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/login&forgot/forgotpassword" element={<ForgotPassword />} />
        <Route path='/login&forgot/resetpassword' element={<ResetPassword />} />
        <Route path="/errors/notfound" element={<NotFound />} />

        <Route element={<LayoutWithNavBar />}>
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
          <Route path="/devices/accesscontrols" element={<PageProtection><AccessControls /></PageProtection>} />
          <Route path="/devices/timeperiods" element={<PageProtection><TimePeriods /></PageProtection>} />
          <Route path="/devices/timeplans" element={<PageProtection><TimePlans /></PageProtection>} />

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
          <Route path="/nclock/nclockalerts" element={<PageProtection><NclockAlerts /></PageProtection>} />
          <Route path="/nclock/nclockaccess" element={<PageProtection><NclockAccess /></PageProtection>} />
          <Route path="/nclock/nclockaccesspresence" element={<PageProtection><NclockAccessPresence /></PageProtection>} />

          <Route path="/naccess/naccessdashboard" element={<PageProtection><NaccessDashboard /></PageProtection>} />
          <Route path="/naccess/naccessdashboardlicensed" element={<PageProtection><NaccessDashboardLicensed /></PageProtection>} />
          <Route path="/naccess/naccessgraph" element={<PageProtection><NaccessGraph /></PageProtection>} />
          <Route path="/naccess/naccessaccesses" element={<PageProtection><NaccessAccesses /></PageProtection>} />
          <Route path="/naccess/naccesspresence" element={<PageProtection><NaccessPresence /></PageProtection>} />
          <Route path="/naccess/naccessdooropen" element={<PageProtection><NaccessDoorOpen /></PageProtection>} />
          <Route path="/naccess/naccessalerts" element={<PageProtection><NaccessAlerts /></PageProtection>} />

          <Route path="/nvisitor/nvisitordashboard" element={<PageProtection><NvisitorDashboard /></PageProtection>} />
          <Route path="/nvisitor/nvisitordashboardlicensed" element={<PageProtection><NvisitorDashboardLicensed /></PageProtection>} />
          <Route path="/nvisitor/nvisitorgraph" element={<PageProtection><NvisitorGraph /></PageProtection>} />
          <Route path="/nvisitor/nvisitorMoveCard" element={<PageProtection><NvisitorMoveCard /></PageProtection>} />
          <Route path="/nvisitor/nvisitorMoveKiosk" element={<PageProtection><NvisitorMoveKiosk /></PageProtection>} />
          <Route path="/nvisitor/nvisitorListMovements" element={<PageProtection><NvisitorListMovements /></PageProtection>} />
          <Route path="/nvisitor/nvisitoralerts" element={<PageProtection><NvisitorAlerts /></PageProtection>} />

          <Route path="/nview/nviewdashboard" element={<PageProtection><NviewDashboard /></PageProtection>} />
          <Route path="/nview/nviewdashboardlicensed" element={<PageProtection><NviewDashboardLicensed /></PageProtection>} />
          <Route path="/nview/nviewgraph" element={<PageProtection><NviewGraph /></PageProtection>} />
          <Route path="/nview/nviewonlinecameras" element={<PageProtection><NviewOnlineCameras /></PageProtection>} />
          <Route path="/nview/nviewalerts" element={<PageProtection><NviewAlerts /></PageProtection>} />

          <Route path="/ncard/ncarddashboard" element={<PageProtection><NcardDashboard /></PageProtection>} />
          <Route path="/ncard/ncarddashboardlicensed" element={<PageProtection><NcardDashboardLicensed /></PageProtection>} />
          <Route path="/ncard/ncardgraph" element={<PageProtection><NcardGraph /></PageProtection>} />

          <Route path="/ndoor/ndoordashboard" element={<PageProtection><NdoorDashboard /></PageProtection>} />
          <Route path="/ndoor/ndoordashboardlicensed" element={<PageProtection><NdoorDashboardLicensed /></PageProtection>} />
          <Route path="/ndoor/ndoorgraph" element={<PageProtection><NdoorGraph /></PageProtection>} />

          <Route path="/npark/nparkdashboard" element={<PageProtection><NparkDashboard /></PageProtection>} />
          <Route path="/npark/nparkdashboardlicensed" element={<PageProtection><NparkDashboardLicensed /></PageProtection>} />
          <Route path="/npark/nparkgraph" element={<PageProtection><NparkGraph /></PageProtection>} />

          <Route path="/npatrol/npatroldashboard" element={<PageProtection><NpatrolDashboard /></PageProtection>} />
          <Route path="/npatrol/npatroldashboardlicensed" element={<PageProtection><NpatrolDashboardLicensed /></PageProtection>} />
          <Route path="/npatrol/npatrolgraph" element={<PageProtection><NpatrolGraph /></PageProtection>} />

          <Route path="/nsecur/nsecurdashboard" element={<PageProtection><NsecurDashboard /></PageProtection>} />
          <Route path="/nsecur/nsecurdashboardlicensed" element={<PageProtection><NsecurDashboardLicensed /></PageProtection>} />
          <Route path="/nsecur/nsecurgraph" element={<PageProtection><NsecurGraph /></PageProtection>} />

          <Route path="/nsoftware/nsoftwaredashboard" element={<PageProtection><NsoftwareDashboard /></PageProtection>} />
          <Route path="/nsoftware/nsoftwaredashboardlicensed" element={<PageProtection><NsoftwareDashboardLicensed /></PageProtection>} />
          <Route path="/nsoftware/nsoftwaregraph" element={<PageProtection><NsoftwareGraph /></PageProtection>} />

          <Route path="/nsystem/nsystemdashboard" element={<PageProtection><NsystemDashboard /></PageProtection>} />
          <Route path="/nsystem/nsystemdashboardlicensed" element={<PageProtection><NsystemDashboardLicensed /></PageProtection>} />
          <Route path="/nsystem/nsystemgraph" element={<PageProtection><NsystemGraph /></PageProtection>} />

          <Route path="/napp/nappdashboard" element={<PageProtection><NappDashboard /></PageProtection>} />
          <Route path="/napp/nappdashboardlicensed" element={<PageProtection><NappDashboardLicensed /></PageProtection>} />
          <Route path="/napp/nappgraph" element={<PageProtection><NappGraph /></PageProtection>} />

          <Route path="/ncyber/ncyberdashboard" element={<PageProtection><NcyberDashboard /></PageProtection>} />
          <Route path="/ncyber/ncyberdashboardlicensed" element={<PageProtection><NcyberDashboardLicensed /></PageProtection>} />
          <Route path="/ncyber/ncybergraph" element={<PageProtection><NcyberGraph /></PageProtection>} />

          <Route path="/ndigital/ndigitaldashboard" element={<PageProtection><NdigitalDashboard /></PageProtection>} />
          <Route path="/ndigital/ndigitaldashboardlicensed" element={<PageProtection><NdigitalDashboardLicensed /></PageProtection>} />
          <Route path="/ndigital/ndigitalgraph" element={<PageProtection><NdigitalGraph /></PageProtection>} />

          <Route path="/nserver/nserverdashboard" element={<PageProtection><NserverDashboard /></PageProtection>} />
          <Route path="/nserver/nserverdashboardlicensed" element={<PageProtection><NserverDashboardLicensed /></PageProtection>} />
          <Route path="/nserver/nservergraph" element={<PageProtection><NserverGraph /></PageProtection>} />

          <Route path="/naut/nautdashboard" element={<PageProtection><NautDashboard /></PageProtection>} />
          <Route path="/naut/nautdashboardlicensed" element={<PageProtection><NautDashboardLicensed /></PageProtection>} />
          <Route path="/naut/nautgraph" element={<PageProtection><NautGraph /></PageProtection>} />

          <Route path="/nequip/nequipdashboard" element={<PageProtection><NequipDashboard /></PageProtection>} />
          <Route path="/nequip/nequipdashboardlicensed" element={<PageProtection><NequipDashboardLicensed /></PageProtection>} />
          <Route path="/nequip/nequipgraph" element={<PageProtection><NequipGraph /></PageProtection>} />

          <Route path="/nproject/nprojectdashboard" element={<PageProtection><NprojectDashboard /></PageProtection>} />
          <Route path="/nproject/nprojectdashboardlicensed" element={<PageProtection><NprojectDashboardLicensed /></PageProtection>} />
          <Route path="/nproject/nprojectgraph" element={<PageProtection><NprojectGraph /></PageProtection>} />

          <Route path="/ncount/ncountdashboard" element={<PageProtection><NcountDashboard /></PageProtection>} />
          <Route path="/ncount/ncountdashboardlicensed" element={<PageProtection><NcountDashboardLicensed /></PageProtection>} />
          <Route path="/ncount/ncountgraph" element={<PageProtection><NcountGraph /></PageProtection>} />

          <Route path="/nbuild/nbuilddashboard" element={<PageProtection><NbuildDashboard /></PageProtection>} />
          <Route path="/nbuild/nbuilddashboardlicensed" element={<PageProtection><NbuildDashboardLicensed /></PageProtection>} />
          <Route path="/nbuild/nbuildgraph" element={<PageProtection><NbuildGraph /></PageProtection>} />

          <Route path="/ncaravan/ncaravandashboard" element={<PageProtection><NcaravanDashboard /></PageProtection>} />
          <Route path="/ncaravan/ncaravandashboardlicensed" element={<PageProtection><NcaravanDashboardLicensed /></PageProtection>} />
          <Route path="/ncaravan/ncaravangraph" element={<PageProtection><NcaravanGraph /></PageProtection>} />

          <Route path="/nmechanic/nmechanicdashboard" element={<PageProtection><NmechanicDashboard /></PageProtection>} />
          <Route path="/nmechanic/nmechanicdashboardlicensed" element={<PageProtection><NmechanicDashboardLicensed /></PageProtection>} />
          <Route path="/nmechanic/nmechanicgraph" element={<PageProtection><NmechanicGraph /></PageProtection>} />

          <Route path="/nevents/neventsdashboard" element={<PageProtection><NeventsDashboard /></PageProtection>} />
          <Route path="/nevents/neventsdashboardlicensed" element={<PageProtection><NeventsDashboardLicensed /></PageProtection>} />
          <Route path="/nevents/neventsgraph" element={<PageProtection><NeventsGraph /></PageProtection>} />

          <Route path="/nservice/nservicedashboard" element={<PageProtection><NserviceDashboard /></PageProtection>} />
          <Route path="/nservice/nservicedashboardlicensed" element={<PageProtection><NserviceDashboardLicensed /></PageProtection>} />
          <Route path="/nservice/nservicegraph" element={<PageProtection><NserviceGraph /></PageProtection>} />

          <Route path="/ntask/ntaskdashboard" element={<PageProtection><NtaskDashboard /></PageProtection>} />
          <Route path="/ntask/ntaskdashboardlicensed" element={<PageProtection><NtaskDashboardLicensed /></PageProtection>} />
          <Route path="/ntask/ntaskgraph" element={<PageProtection><NtaskGraph /></PageProtection>} />

          <Route path="/nproduction/nproductiondashboard" element={<PageProtection><NproductionDashboard /></PageProtection>} />
          <Route path="/nproduction/nproductiondashboardlicensed" element={<PageProtection><NproductionDashboardLicensed /></PageProtection>} />
          <Route path="/nproduction/nproductiongraph" element={<PageProtection><NproductionGraph /></PageProtection>} />

          <Route path="/nticket/nticketdashboard" element={<PageProtection><NticketDashboard /></PageProtection>} />
          <Route path="/nticket/nticketdashboardlicensed" element={<PageProtection><NticketDashboardLicensed /></PageProtection>} />
          <Route path="/nticket/nticketgraph" element={<PageProtection><NticketGraph /></PageProtection>} />

          <Route path="/nsales/nsalesdashboard" element={<PageProtection><NsalesDashboard /></PageProtection>} />
          <Route path="/nsales/nsalesdashboardlicensed" element={<PageProtection><NsalesDashboardLicensed /></PageProtection>} />
          <Route path="/nsales/nsalesgraph" element={<PageProtection><NsalesGraph /></PageProtection>} />

          <Route path="/ninvoice/ninvoicedashboard" element={<PageProtection><NinvoiceDashboard /></PageProtection>} />
          <Route path="/ninvoice/ninvoicedashboardlicensed" element={<PageProtection><NinvoiceDashboardLicensed /></PageProtection>} />
          <Route path="/ninvoice/ninvoicegraph" element={<PageProtection><NinvoiceGraph /></PageProtection>} />

          <Route path="/ndoc/ndocdashboard" element={<PageProtection><NdocDashboard /></PageProtection>} />
          <Route path="/ndoc/ndocdashboardlicensed" element={<PageProtection><NdocDashboardLicensed /></PageProtection>} />
          <Route path="/ndoc/ndocgraph" element={<PageProtection><NdocGraph /></PageProtection>} />

          <Route path="/nsports/nsportsdashboard" element={<PageProtection><NsportsDashboard /></PageProtection>} />
          <Route path="/nsports/nsportsdashboardlicensed" element={<PageProtection><NsportsDashboardLicensed /></PageProtection>} />
          <Route path="/nsports/nsportsgraph" element={<PageProtection><NsportsGraph /></PageProtection>} />

          <Route path="/ngym/ngymdashboard" element={<PageProtection><NgymDashboard /></PageProtection>} />
          <Route path="/ngym/ngymdashboardlicensed" element={<PageProtection><NgymDashboardLicensed /></PageProtection>} />
          <Route path="/ngym/ngymgraph" element={<PageProtection><NgymGraph /></PageProtection>} />

          <Route path="/nschool/nschooldashboard" element={<PageProtection><NschoolDashboard /></PageProtection>} />
          <Route path="/nschool/nschooldashboardlicensed" element={<PageProtection><NschoolDashboardLicensed /></PageProtection>} />
          <Route path="/nschool/nschoolgraph" element={<PageProtection><NschoolGraph /></PageProtection>} />

          <Route path="/nclinic/nclinicdashboard" element={<PageProtection><NclinicDashboard /></PageProtection>} />
          <Route path="/nclinic/nclinicdashboardlicensed" element={<PageProtection><NclinicDashboardLicensed /></PageProtection>} />
          <Route path="/nclinic/nclinicgraph" element={<PageProtection><NclinicGraph /></PageProtection>} />

          <Route path="/noptics/nopticsdashboard" element={<PageProtection><NopticsDashboard /></PageProtection>} />
          <Route path="/noptics/nopticsdashboardlicensed" element={<PageProtection><NopticsDashboardLicensed /></PageProtection>} />
          <Route path="/noptics/nopticsgraph" element={<PageProtection><NopticsGraph /></PageProtection>} />

          <Route path="/ngold/ngolddashboard" element={<PageProtection><NgoldDashboard /></PageProtection>} />
          <Route path="/ngold/ngolddashboardlicensed" element={<PageProtection><NgoldDashboardLicensed /></PageProtection>} />
          <Route path="/ngold/ngoldgraph" element={<PageProtection><NgoldGraph /></PageProtection>} />

          <Route path="/nsmart/nsmartdashboard" element={<PageProtection><NsmartDashboard /></PageProtection>} />
          <Route path="/nsmart/nsmartdashboardlicensed" element={<PageProtection><NsmartDashboardLicensed /></PageProtection>} />
          <Route path="/nsmart/nsmartgraph" element={<PageProtection><NsmartGraph /></PageProtection>} />

          <Route path="/nreality/nrealitydashboard" element={<PageProtection><NrealityDashboard /></PageProtection>} />
          <Route path="/nreality/nrealitydashboardlicensed" element={<PageProtection><NrealityDashboardLicensed /></PageProtection>} />
          <Route path="/nreality/nrealitygraph" element={<PageProtection><NrealityGraph /></PageProtection>} />

          <Route path="/nhologram/nhologramdashboard" element={<PageProtection><NhologramDashboard /></PageProtection>} />
          <Route path="/nhologram/nhologramdashboardlicensed" element={<PageProtection><NhologramDashboardLicensed /></PageProtection>} />
          <Route path="/nhologram/nhologramgraph" element={<PageProtection><NhologramGraph /></PageProtection>} />

          <Route path="/npower/npowerdashboard" element={<PageProtection><NpowerDashboard /></PageProtection>} />
          <Route path="/npower/npowerdashboardlicensed" element={<PageProtection><NpowerDashboardLicensed /></PageProtection>} />
          <Route path="/npower/npowergraph" element={<PageProtection><NpowerGraph /></PageProtection>} />

          <Route path="/ncharge/nchargedashboard" element={<PageProtection><NchargeDashboard /></PageProtection>} />
          <Route path="/ncharge/nchargedashboardlicensed" element={<PageProtection><NchargeDashboardLicensed /></PageProtection>} />
          <Route path="/ncharge/nchargegraph" element={<PageProtection><NchargeGraph /></PageProtection>} />

          <Route path="/ncity/ncitydashboard" element={<PageProtection><NcityDashboard /></PageProtection>} />
          <Route path="/ncity/ncitydashboardlicensed" element={<PageProtection><NcityDashboardLicensed /></PageProtection>} />
          <Route path="/ncity/ncitygraph" element={<PageProtection><NcityGraph /></PageProtection>} />

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
          <Route path="/nled/nledalerts" element={<PageProtection><NledAlerts /></PageProtection>} />

          <Route path="/nfire/nfiredashboard" element={<PageProtection><NfireDashboard /></PageProtection>} />
          <Route path="/nfire/nfiredashboardlicensed" element={<PageProtection><NfireDashboardLicensed /></PageProtection>} />
          <Route path="/nfire/nfiregraph" element={<PageProtection><NfireGraph /></PageProtection>} />

          <Route path="/nfurniture/nfurnituredashboard" element={<PageProtection><NfurnitureDashboard /></PageProtection>} />
          <Route path="/nfurniture/nfurnituredashboardlicensed" element={<PageProtection><NfurnitureDashboardLicensed /></PageProtection>} />
          <Route path="/nfurniture/nfurnituregraph" element={<PageProtection><NfurnitureGraph /></PageProtection>} />

          <Route path="/npartition/npartitiondashboard" element={<PageProtection><NpartitionDashboard /></PageProtection>} />
          <Route path="/npartition/npartitiondashboardlicensed" element={<PageProtection><NpartitionDashboardLicensed /></PageProtection>} />
          <Route path="/npartition/npartitiongraph" element={<PageProtection><NpartitionGraph /></PageProtection>} />

          <Route path="/ndecor/ndecordashboard" element={<PageProtection><NdecorDashboard /></PageProtection>} />
          <Route path="/ndecor/ndecordashboardlicensed" element={<PageProtection><NdecorDashboardLicensed /></PageProtection>} />
          <Route path="/ndecor/ndecorgraph" element={<PageProtection><NdecorGraph /></PageProtection>} />

          <Route path="/nping/npingdashboard" element={<PageProtection><NpingDashboard /></PageProtection>} />
          <Route path="/nping/npingdashboardlicensed" element={<PageProtection><NpingDashboardLicensed /></PageProtection>} />
          <Route path="/nping/npinggraph" element={<PageProtection><NpingGraph /></PageProtection>} />

          <Route path="/nconnect/nconnectdashboard" element={<PageProtection><NconnectDashboard /></PageProtection>} />
          <Route path="/nconnect/nconnectdashboardlicensed" element={<PageProtection><NconnectDashboardLicensed /></PageProtection>} />
          <Route path="/nconnect/nconnectgraph" element={<PageProtection><NconnectGraph /></PageProtection>} />

          <Route path="/nlight/nlightdashboard" element={<PageProtection><NlightDashboard /></PageProtection>} />
          <Route path="/nlight/nlightdashboardlicensed" element={<PageProtection><NlightDashboardLicensed /></PageProtection>} />
          <Route path="/nlight/nlightgraph" element={<PageProtection><NlightGraph /></PageProtection>} />

          <Route path="/ncomfort/ncomfortdashboard" element={<PageProtection><NcomfortDashboard /></PageProtection>} />
          <Route path="/ncomfort/ncomfortdashboardlicensed" element={<PageProtection><NcomfortDashboardLicensed /></PageProtection>} />
          <Route path="/ncomfort/ncomfortgraph" element={<PageProtection><NcomfortGraph /></PageProtection>} />

          <Route path="/nsound/nsounddashboard" element={<PageProtection><NsoundDashboard /></PageProtection>} />
          <Route path="/nsound/nsounddashboardlicensed" element={<PageProtection><NsoundDashboardLicensed /></PageProtection>} />
          <Route path="/nsound/nsoundgraph" element={<PageProtection><NsoundGraph /></PageProtection>} />

          <Route path="/nhome/nhomedashboard" element={<PageProtection><NhomeDashboard /></PageProtection>} />
          <Route path="/nhome/nhomedashboardlicensed" element={<PageProtection><NhomeDashboardLicensed /></PageProtection>} />
          <Route path="/nhome/nhomegraph" element={<PageProtection><NhomeGraph /></PageProtection>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

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
                      <Router>
                        <ToastContainer />
                        <AnimatedRoutes />
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