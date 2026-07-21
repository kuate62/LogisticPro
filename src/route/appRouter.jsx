import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
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
import placeholderRouter from './placeholderRouter';

const appRouter = [
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
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
      ...placeholderRouter,
    ],
  },
  { path: '/', element: <Navigate to="/landing" replace /> },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export default appRouter;
