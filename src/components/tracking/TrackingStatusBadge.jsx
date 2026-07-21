import { Badge } from 'react-bootstrap';
import { TRACKING_STATUS_LABELS, TRACKING_STATUS_COLORS } from '../../config/constants';

export default function TrackingStatusBadge({ status }) {
  const label = TRACKING_STATUS_LABELS[status] || status;
  const variant = TRACKING_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={variant}>{label}</Badge>;
}
