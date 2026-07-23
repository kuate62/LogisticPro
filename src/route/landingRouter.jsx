import { LandingLayout } from '../layouts/LandingLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import TrackPage from '../pages/tracking/TrackPage';

const landingRouter = [
  {
    element: <LandingLayout />,
    children: [
      { path: '/landing', element: <LandingPage /> },
      { path: '/track', element: <TrackPage /> },
    ],
  },
];

export default landingRouter;
