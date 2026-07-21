import ShipmentListPage from '../pages/shipments/ShipmentListPage';
import ShipmentCreatePage from '../pages/shipments/ShipmentCreatePage';
import ShipmentDetailPage from '../pages/shipments/ShipmentDetailPage';

const shipmentRouter = [
  { path: '/shipments', element: <ShipmentListPage /> },
  { path: '/shipments/new', element: <ShipmentCreatePage /> },
  { path: '/shipments/:id', element: <ShipmentDetailPage /> },
];

export default shipmentRouter;
