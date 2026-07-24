import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard';
import PlansPage from '../pages/admin/PlansPage';
import SubscriptionsPage from '../pages/admin/SubscriptionsPage';
import CompaniesPage from '../pages/admin/CompaniesPage';
import CompanyDetailPage from '../pages/admin/CompanyDetailPage';
import CompanyCreatePage from '../pages/admin/CompanyCreatePage';
import CompanyEditPage from '../pages/admin/CompanyEditPage';
import SuperAdminsPage from '../pages/admin/SuperAdminsPage';
import ManagersPage from '../pages/admin/ManagersPage';
import NotificationsPage from '../pages/admin/NotificationsPage';
import ProfilePage from '../pages/admin/ProfilePage';

const adminRouter = [
  { path: '/admin', element: <SuperAdminDashboard /> },
  { path: '/admin/plans', element: <PlansPage /> },
  { path: '/admin/subscriptions', element: <SubscriptionsPage /> },
  { path: '/admin/companies', element: <CompaniesPage /> },
  { path: '/admin/companies/create', element: <CompanyCreatePage /> },
  { path: '/admin/companies/:id/edit', element: <CompanyEditPage /> },
  { path: '/admin/companies/:id', element: <CompanyDetailPage /> },
  { path: '/admin/super-admins', element: <SuperAdminsPage /> },
  { path: '/admin/managers', element: <ManagersPage /> },
  { path: '/admin/notifications', element: <NotificationsPage /> },
  { path: '/admin/profile', element: <ProfilePage /> },
];

export default adminRouter;
