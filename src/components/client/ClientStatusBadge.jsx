import { CLIENT_STATUS_LABELS, CLIENT_STATUS_COLORS } from '../../data/mockClientData';

export function ClientStatusBadge({ status, label, className = '' }) {
  const resolvedLabel = label || CLIENT_STATUS_LABELS[status] || status;
  const color = CLIENT_STATUS_COLORS[status] || 'secondary';
  return <span className={`ag-badge ag-badge--${color} ${className}`}>{resolvedLabel}</span>;
}

export default ClientStatusBadge;
