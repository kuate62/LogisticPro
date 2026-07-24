import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/landing/HomePage';
import TrackPage from '../pages/tracking/TrackPage';
import ServicesPage from '../pages/landing/ServicesPage';
import AgenciesPage from '../pages/landing/AgenciesPage';
import HowToSendPage from '../pages/landing/HowToSendPage';
import FAQPage from '../pages/landing/FAQPage';
import ContactPage from '../pages/landing/ContactPage';

const publicRouter = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'track', element: <TrackPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'agences', element: <AgenciesPage /> },
      { path: 'comment-envoyer', element: <HowToSendPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
];

export default publicRouter;
