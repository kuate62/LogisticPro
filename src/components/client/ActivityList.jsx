import { Package, CreditCard, Truck, User } from 'lucide-react';

const ICON_MAP = {
  shipment: { icon: Truck, color: 'info' },
  payment: { icon: CreditCard, color: 'success' },
  parcel: { icon: Package, color: 'primary' },
  profile: { icon: User, color: 'secondary' },
};

function formatRelative(date) {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

export function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <div className="ag-empty"><p className="ag-empty__desc">Aucune activité récente</p></div>;
  }

  return (
    <div style={{ padding: '4px 0' }}>
      {activities.map((act) => {
        const config = ICON_MAP[act.type] || ICON_MAP.parcel;
        const Icon = config.icon;
        return (
          <div key={act.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '10px 16px', borderBottom: '1px solid var(--color-border)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: config.color === 'primary' ? 'var(--color-primary-light)'
                : config.color === 'success' ? 'var(--color-success-light)'
                : config.color === 'info' ? 'var(--color-info-light)'
                : 'rgba(51,65,85,0.1)',
              color: config.color === 'primary' ? 'var(--color-primary)'
                : config.color === 'success' ? 'var(--color-success)'
                : config.color === 'info' ? 'var(--color-info)'
                : 'var(--color-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={14} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{act.title}</p>
              <p style={{ margin: '1px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>{act.description}</p>
            </div>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
              {formatRelative(act.time)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityList;
