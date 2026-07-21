import PlaceholderPage from '../components/layout/PlaceholderPage';

const placeholderRouter = [
  { path: '/packages', element: <PlaceholderPage title="Colis" /> },
  { path: '/counters', element: <PlaceholderPage title="Comptoirs" /> },
  { path: '/reports', element: <PlaceholderPage title="Rapports" /> },
  { path: '/subscription', element: <PlaceholderPage title="Abonnement" /> },
  { path: '/settings', element: <PlaceholderPage title="Paramètres" /> },
  { path: '/companies', element: <PlaceholderPage title="Entreprises" /> },
];

export default placeholderRouter;
