import { Building2, Clock } from 'lucide-react';

export function FrequentAgencies({ agencies }) {
  if (!agencies || agencies.length === 0) {
    return <div className="ag-empty"><p className="ag-empty__desc">Aucune agence</p></div>;
  }

  return (
    <div style={{ padding: '8px 16px' }}>
      {agencies.map(({ agency, count }) => (
        <div key={agency.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-md)', flexShrink: 0,
            background: 'var(--color-primary-light)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Building2 size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color-text-heading)' }}>{agency.name}</p>
            <p style={{ margin: '1px 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
              {agency.city} · {count} expédition{count > 1 ? 's' : ''}
            </p>
          </div>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
            background: 'white', fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)',
            cursor: 'pointer', fontFamily: 'var(--font-family)', whiteSpace: 'nowrap',
            transition: 'all 150ms',
          }}
            type="button"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
          >
            <Clock size={12} /> Horaires
          </button>
        </div>
      ))}
    </div>
  );
}

export default FrequentAgencies;
