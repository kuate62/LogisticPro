import { Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ClientLayout } from '../components/layout/ClientLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { ROLES } from '../config/constants';
import dashboardRouter from './dashboardRouter';
import agencyRouter from './agencyRouter';
import employeeRouter from './employeeRouter';
import userRouter from './userRouter';
import clientRouter from './clientRouter';
import shipmentRouter from './shipmentRouter';
import routeModuleRouter from './routeModuleRouter';
import pricingRouter from './pricingRouter';
import trackingRouter from './trackingRouter';
import paymentRouter from './paymentRouter';
import packagesRouter from './packagesRouter';
import subscriptionRouter from './subscriptionRouter';
import adminRouter from './adminRouter';
import ClientDashboardPage from '../pages/dashboard/client/ClientDashboardPage';
import DepotDashboardPage from '../pages/dashboard/depot/DepotDashboardPage';
import RetraitDashboardPage from '../pages/dashboard/retrait/RetraitDashboardPage';
import ExpeditionsPage from '../pages/dashboard/client/ExpeditionsPage';
import ColisPage from '../pages/dashboard/client/ColisPage';
import PaiementsPage from '../pages/dashboard/client/PaiementsPage';
import ShipmentDetailPage from '../pages/dashboard/client/ShipmentDetailPage';
import ParcelDetailPage from '../pages/dashboard/client/ParcelDetailPage';
import TrackingPage from '../pages/dashboard/client/TrackingPage';
import PaymentDetailPage from '../pages/dashboard/client/PaymentDetailPage';
import ProfilPage from '../pages/dashboard/client/ProfilPage';

const appRouter = [
  {
    element: (
      <ProtectedRoute allowedRoles={[ROLES.COMPANY_ADMIN, ROLES.SUPER_ADMIN]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: (
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [...adminRouter],
      },
      ...dashboardRouter,
      ...agencyRouter,
      ...employeeRouter,
      ...userRouter,
      ...clientRouter,
      ...shipmentRouter,
      ...routeModuleRouter,
      ...pricingRouter,
      ...trackingRouter,
      ...paymentRouter,
      ...packagesRouter,
      ...subscriptionRouter,
      { path: '/dashboard/depot', element: <DepotDashboardPage /> },
      { path: '/dashboard/retrait', element: <RetraitDashboardPage /> },
    ],
  },
  {
    path: '/dashboard/client',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="tableau-de-bord" replace /> },
      { path: 'tableau-de-bord', element: <ClientDashboardPage /> },
      { path: 'expeditions', element: <ExpeditionsPage /> },
      { path: 'expeditions/:id', element: <ShipmentDetailPage /> },
      { path: 'colis', element: <ColisPage /> },
      { path: 'colis/:id', element: <ParcelDetailPage /> },
      { path: 'suivi', element: <TrackingPage /> },
      { path: 'paiements', element: <PaiementsPage /> },
      { path: 'paiements/:id', element: <PaymentDetailPage /> },
      { path: 'profil', element: <ProfilPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export default appRouter;
