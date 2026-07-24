import PackageListPage from '../pages/packages/PackageListPage';
import PackageDetailPage from '../pages/packages/PackageDetailPage';

const packagesRouter = [
  { path: '/packages', element: <PackageListPage /> },
  { path: '/packages/:id', element: <PackageDetailPage /> },
];

export default packagesRouter;
