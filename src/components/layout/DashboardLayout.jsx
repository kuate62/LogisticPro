import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { DashboardFooter } from './DashboardFooter';
import './DashboardLayout.css';
//import axios from 'axios';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const [users, setUsers] = useState([]);

  // useEffect(() => {

  //   axios.get('http://localhost:3000/api/auth/register')
  //     .then(response => {
  //       console.log('user charge avec succes')
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching users:', error);
  //     });
  // }, []);

  return (
    <div className="lp-dashboard-layout">
      <Sidebar />
      <div className="lp-dashboard-layout__main">
        <TopNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="lp-dashboard-layout__content">
          <Outlet />
        </main>

        <DashboardFooter variant="agent" />
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
