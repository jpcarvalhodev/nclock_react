import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ForgotPassword } from './pages/ForgotPassword';
import { Employees } from './pages/Employees';
import { Departments } from './pages/Departments';
import { Categories } from './pages/Categories';
import { ExternalEntities } from './pages/ExternalEntities';
import { Groups } from './pages/Groups';
import { Professions } from './pages/Professions';
import { Zones } from './pages/Zones';
import { NotFound } from './pages/NotFound';
import { PageProtection } from './components/PageProtection';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Unauthorized } from './pages/Unauthorized';
import { Persons } from './pages/Persons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ResetPassword } from './pages/PasswordReset';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/dashboard" element={<PageProtection><Dashboard /></PageProtection>} />
        <Route path="/persons" element={<PageProtection><Persons /></PageProtection>} />
        <Route path="/employees" element={<PageProtection><Employees /></PageProtection>} />
        <Route path="/departments" element={<PageProtection><Departments /></PageProtection>} />
        <Route path="/categories" element={<PageProtection><Categories /></PageProtection>} />
        <Route path="/externalentities" element={<PageProtection><ExternalEntities /></PageProtection>} />
        <Route path="/groups" element={<PageProtection><Groups /></PageProtection>} />
        <Route path="/professions" element={<PageProtection><Professions /></PageProtection>} />
        <Route path="/zones" element={<PageProtection><Zones /></PageProtection>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;