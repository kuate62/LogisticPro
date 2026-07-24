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
import packagesRouter from './packagesRouter';
import subscriptionRouter from './subscriptionRouter';
import adminRouter from './adminRouter';

const appRouter = [
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      ...adminRouter,
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
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export default appRouter;
