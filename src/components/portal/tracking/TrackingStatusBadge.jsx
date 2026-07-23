import { PORTAL_TRACKING_STATUS } from '../../../api/mockPortalTracking';

const STATUS_CLASSES = {
  warning: 'tks-badge--warning',
  info: 'tks-badge--info',
  primary: 'tks-badge--primary',
  success: 'tks-badge--success',
  danger: 'tks-badge--danger',
  secondary: 'tks-badge--secondary',
};

export default function TrackingStatusBadge({ status, size = 'md' }) {
  const config = PORTAL_TRACKING_STATUS[status];
  const label = config?.label || status;
  const colorClass = STATUS_CLASSES[config?.color] || 'tks-badge--secondary';
  const sizeClass = size === 'sm' ? 'tks-badge--sm' : size === 'lg' ? 'tks-badge--lg' : '';

  return (
    <span className={`tks-badge ${colorClass} ${sizeClass}`}>
      {label}
    </span>
  );
}
