import Badge from 'react-bootstrap/Badge';
import { PRICING_STATUS_LABELS, PRICING_STATUS_COLORS } from '../../config/constants';

export default function PricingStatus({ status }) {
  const label = PRICING_STATUS_LABELS[status] || status;
  const color = PRICING_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={color} className="px-2 py-1">{label}</Badge>;
}
