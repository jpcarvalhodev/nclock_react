import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from './Footer';
import '../css/LayoutNavbar.css';

export function LayoutWithNavBar() {
  return (
    <div className="layout">
      <NavBar />
      <main className="dashboard-container">
        <Outlet />
      </main>
    </div>
  );
}