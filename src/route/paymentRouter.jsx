import PaymentListPage from '../pages/payment/PaymentListPage';
import PaymentCreatePage from '../pages/payment/PaymentCreatePage';
import PaymentDetailPage from '../pages/payment/PaymentDetailPage';

const paymentRouter = [
  { path: '/payments', element: <PaymentListPage /> },
  { path: '/payments/new', element: <PaymentCreatePage /> },
  { path: '/payments/:id', element: <PaymentDetailPage /> },
];

export default paymentRouter;
