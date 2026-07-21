import { Badge } from 'react-bootstrap';
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_COLORS } from '../../config/constants';

export default function PaymentStatusBadge({ status }) {
  const label = PAYMENT_STATUS_LABELS[status] || status;
  const variant = PAYMENT_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={variant}>{label}</Badge>;
}
