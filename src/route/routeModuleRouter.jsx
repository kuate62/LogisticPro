import RouteListPage from '../pages/routes/RouteListPage';
import RouteCreatePage from '../pages/routes/RouteCreatePage';
import RouteEditPage from '../pages/routes/RouteEditPage';
import RouteDetailPage from '../pages/routes/RouteDetailPage';

const routeModuleRouter = [
  { path: '/routes', element: <RouteListPage /> },
  { path: '/routes/new', element: <RouteCreatePage /> },
  { path: '/routes/:id', element: <RouteDetailPage /> },
  { path: '/routes/:id/edit', element: <RouteEditPage /> },
];

export default routeModuleRouter;
