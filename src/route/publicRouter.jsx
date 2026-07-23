/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import PublicFallback from '../components/public/PublicFallback';

const HomePage = lazy(() => import('../pages/landing/HomePage'));
const TrackPage = lazy(() => import('../pages/tracking/TrackPage'));
const ServicesPage = lazy(() => import('../pages/landing/ServicesPage'));
const AgenciesPage = lazy(() => import('../pages/landing/AgenciesPage'));
const HowToSendPage = lazy(() => import('../pages/landing/HowToSendPage'));
const FAQPage = lazy(() => import('../pages/landing/FAQPage'));
const ContactPage = lazy(() => import('../pages/landing/ContactPage'));

const publicRouter = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PublicFallback />}><HomePage /></Suspense> },
      { path: 'track', element: <Suspense fallback={<PublicFallback />}><TrackPage /></Suspense> },
      { path: 'services', element: <Suspense fallback={<PublicFallback />}><ServicesPage /></Suspense> },
      { path: 'agences', element: <Suspense fallback={<PublicFallback />}><AgenciesPage /></Suspense> },
      { path: 'comment-envoyer', element: <Suspense fallback={<PublicFallback />}><HowToSendPage /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<PublicFallback />}><FAQPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PublicFallback />}><ContactPage /></Suspense> },
    ],
  },
];

export default publicRouter;
