import { LandingLayout } from '../layouts/LandingLayout';
import { LandingPage } from '../pages/landing/LandingPage';

const landingRouter = [
  {
    element: <LandingLayout />,
    children: [
      { path: '/landing', element: <LandingPage /> },
    ],
  },
];

export default landingRouter;
