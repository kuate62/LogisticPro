import PricingListPage from '../pages/pricing/PricingListPage';
import PricingCreatePage from '../pages/pricing/PricingCreatePage';
import PricingEditPage from '../pages/pricing/PricingEditPage';
import PricingDetailPage from '../pages/pricing/PricingDetailPage';

const pricingRouter = [
  { path: '/pricing', element: <PricingListPage /> },
  { path: '/pricing/new', element: <PricingCreatePage /> },
  { path: '/pricing/:id', element: <PricingDetailPage /> },
  { path: '/pricing/:id/edit', element: <PricingEditPage /> },
];

export default pricingRouter;
