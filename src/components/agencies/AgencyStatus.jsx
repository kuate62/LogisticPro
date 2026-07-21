import { AGENCY_STATUS_LABELS, AGENCY_STATUS_COLORS } from '../../config/constants';
import './AgencyStatus.css';

export function AgencyStatus({ status, size = 'md' }) {
  const label = AGENCY_STATUS_LABELS[status] || status;
  const color = AGENCY_STATUS_COLORS[status] || 'secondary';

  return (
    <span className={`lp-agency-status lp-agency-status--${color} lp-agency-status--${size}`}>
      {label}
    </span>
  );
}

export default AgencyStatus;
