import ClientListPage from '../pages/clients/ClientListPage';
import ClientCreatePage from '../pages/clients/ClientCreatePage';
import ClientEditPage from '../pages/clients/ClientEditPage';
import ClientDetailPage from '../pages/clients/ClientDetailPage';

const clientRouter = [
  { path: '/clients', element: <ClientListPage /> },
  { path: '/customers', element: <ClientListPage /> },
  { path: '/clients/new', element: <ClientCreatePage /> },
  { path: '/clients/:id', element: <ClientDetailPage /> },
  { path: '/clients/:id/edit', element: <ClientEditPage /> },
];

export default clientRouter;
