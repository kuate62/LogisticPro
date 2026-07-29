import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import SaasHomePage from '../pages/saas/HomePage';
import CompanyCatalogPage from '../pages/catalog/CompanyCatalogPage';
import HomePage from '../pages/landing/HomePage';
import ServicesPage from '../pages/landing/ServicesPage';
import AgenciesPage from '../pages/landing/AgenciesPage';
import HowToSendPage from '../pages/landing/HowToSendPage';
import FAQPage from '../pages/landing/FAQPage';
import ContactPage from '../pages/landing/ContactPage';
import TrackPage from '../pages/tracking/TrackPage';
import TarifPage from '../pages/landing/TarifPage';

const entrepriseRouter = [
  {
    element: <AuthLayout />,
    children: [
      { index: true, element: <SaasHomePage /> },
      { path: 'entreprises', element: <CompanyCatalogPage /> },
    ],
  },
  {
    path: 'entreprises/:idEntreprise',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'agences', element: <AgenciesPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'suivi', element: <TrackPage /> },
      { path: 'tarif', element: <TarifPage /> },
      { path: 'comment-envoyer', element: <HowToSendPage /> },
    ],
  },
];

export default entrepriseRouter;
