import Badge from 'react-bootstrap/Badge';
import { PACKAGE_STATUS_LABELS, PACKAGE_STATUS_COLORS } from '../../config/constants';

export default function PackageStatus({ status }) {
  const label = PACKAGE_STATUS_LABELS[status] || status;
  const color = PACKAGE_STATUS_COLORS[status] || 'secondary';
  return <Badge bg={color} className="px-2 py-1">{label}</Badge>;
}
