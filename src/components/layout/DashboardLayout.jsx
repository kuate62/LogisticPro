import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import './DashboardLayout.css';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="lp-dashboard-layout">
      <Sidebar />
      <div className="lp-dashboard-layout__main">
        <TopNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="lp-dashboard-layout__content">
          <Outlet />
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="lp-dashboard-layout__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;
