import Badge from 'react-bootstrap/Badge';
import { ROUTE_STATUS_LABELS, ROUTE_STATUS_COLORS } from '../../config/constants';

export default function RouteStatus({ status }) {
  const label = ROUTE_STATUS_LABELS[status] || status;
  const color = ROUTE_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={color} className="px-2 py-1">{label}</Badge>;
}
