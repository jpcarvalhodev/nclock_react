import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { ForgotPassword } from './screens/ForgotPassword';
import { Employees } from './screens/Employees';
import { Departments } from './screens/Departments';
import { Categories } from './screens/Categories';
import { ExternalEntities } from './screens/ExternalEntities';
import { Groups } from './screens/Groups';
import { Professions } from './screens/Professions';
import { Zones } from './screens/Zones';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/externalentities" element={<ExternalEntities />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/professions" element={<Professions />} />
        <Route path="/zones" element={<Zones />} />
      </Routes>
    </Router>
  );
}

export default App;