import Badge from 'react-bootstrap/Badge';
import { SHIPMENT_STATUS_LABELS, SHIPMENT_STATUS_COLORS } from '../../config/constants';

export default function ShipmentStatus({ status }) {
  const label = SHIPMENT_STATUS_LABELS[status] || status;
  const color = SHIPMENT_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={color} className="px-2 py-1">{label}</Badge>;
}
