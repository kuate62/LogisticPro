import { AlertTriangle, Info, XCircle, Package } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const ICON_MAP = {
  warning: { icon: AlertTriangle, color: 'warning' },
  danger: { icon: XCircle, color: 'danger' },
  info: { icon: Info, color: 'info' },
};

export function AlertCard({ alert }) {
  const config = ICON_MAP[alert.severity] || ICON_MAP.info;
  const Icon = config.icon;

  return (
    <div className={`ag-alert-card ag-alert-card--${alert.severity}`}>
      <div className={`ag-alert-card__icon ag-alert-card__icon--${config.color}`}>
        <Icon size={16} />
      </div>
      <div className="ag-alert-card__content">
        <h4 className="ag-alert-card__title">{alert.title}</h4>
        <p className="ag-alert-card__desc">{alert.message}</p>
      </div>
      {alert.parcelCount != null && (
        <div className="ag-alert-card__badge">
          <StatusBadge status="warning" customLabel={`${alert.parcelCount} colis`} />
        </div>
      )}
      {alert.parcelId && (
        <div className="ag-alert-card__badge">
          <Package size={14} style={{ color: 'var(--color-text-muted)' }} />
        </div>
      )}
    </div>
  );
}

export default AlertCard;
