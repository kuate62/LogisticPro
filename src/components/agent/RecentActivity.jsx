import { Package, Truck, CreditCard, Users } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './EmptyState';

const ICON_MAP = {
  shipment: { icon: Truck, color: 'shipment' },
  payment: { icon: CreditCard, color: 'payment' },
  client: { icon: Users, color: 'client' },
  parcel: { icon: Package, color: 'parcel' },
};

function formatTime(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
}

export function RecentActivity({ activities, loading, formatTime: customFormatTime }) {
  if (loading) {
    return (
      <div className="ag-loading">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="ag-loading__row ag-loading__row--md" style={{ marginBottom: 8 }} />
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return <EmptyState title="Aucune activité" description="Les opérations récentes apparaîtront ici" />;
  }

  const fmt = customFormatTime || formatTime;

  return (
    <div className="ag-activity">
      {activities.map((act) => {
        const config = ICON_MAP[act.type] || ICON_MAP.parcel;
        const Icon = config.icon;
        return (
          <div key={act.id} className="ag-activity__item">
            <div className={`ag-activity__icon ag-activity__icon--${config.color}`}>
              <Icon size={14} />
            </div>
            <div className="ag-activity__content">
              <p className="ag-activity__title">{act.title}</p>
              <span className="ag-activity__meta">{fmt(act.time)}</span>
            </div>
            {act.status && (
              <div className="ag-activity__status">
                <StatusBadge status={act.status} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default RecentActivity;
