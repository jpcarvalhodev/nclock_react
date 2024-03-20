import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { ForgotPassword } from './screens/ForgotPassword';
import { Employees } from './screens/Employees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;