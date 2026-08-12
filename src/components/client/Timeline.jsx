import { Package, Truck, CheckCircle, Star, Award, MapPin, Clock } from 'lucide-react';

const ICONS = { package: Package, truck: Truck, check: CheckCircle, star: Star, award: Award, map: MapPin, clock: Clock };

function formatDateTime(date) {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  }).format(d);
}

export function Timeline({ items }) {
  if (!items || items.length === 0) {
    return <div className="ag-empty"><p className="ag-empty__desc">Aucun événement</p></div>;
  }

  return (
    <div style={{ padding: '8px 0' }}>
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] || Clock;
        const isLast = i === items.length - 1;
        return (
          <div key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 20px', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: item.type === 'milestone' ? 'var(--color-warning-light)' : 'var(--color-primary-light)',
                color: item.type === 'milestone' ? 'var(--color-warning)' : 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} />
              </div>
              {!isLast && <div style={{ width: 2, flex: 1, background: 'var(--color-border)', minHeight: 20 }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : 8 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color-text-heading)' }}>{item.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2, display: 'inline-block' }}>
                {formatDateTime(item.date)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
