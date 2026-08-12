import { MapPin } from 'lucide-react';

export function FrequentDestinations({ destinations }) {
  if (!destinations || destinations.length === 0) {
    return <div className="ag-empty"><p className="ag-empty__desc">Aucune destination</p></div>;
  }

  const maxCount = destinations[0]?.count || 1;

  return (
    <div style={{ padding: '8px 16px' }}>
      {destinations.map((d, i) => (
        <div key={d.city} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < destinations.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: i === 0 ? 'var(--color-primary-light)' : 'var(--color-bg)',
            color: i === 0 ? 'var(--color-primary)' : 'var(--color-text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MapPin size={14} />
          </div>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{d.city}</span>
          <div style={{ flex: 1, maxWidth: 120, height: 6, background: 'var(--color-border)', borderRadius: 3 }}>
            <div style={{ width: `${(d.count / maxCount) * 100}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', minWidth: 30, textAlign: 'right' }}>{d.count}</span>
        </div>
      ))}
    </div>
  );
}

export default FrequentDestinations;
