import TrackingListPage from '../pages/tracking/TrackingListPage';
import TrackingDetailPage from '../pages/tracking/TrackingDetailPage';

const trackingRouter = [
  { path: '/tracking', element: <TrackingListPage /> },
  { path: '/tracking/:id', element: <TrackingDetailPage /> },
];

export default trackingRouter;
