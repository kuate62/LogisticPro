import { MapPin, Ruler, Eye } from 'lucide-react';
import { StatusBadge } from '../agent';

export function ParcelCard({ parcel, onViewTracking, formatDate }) {
  return (
    <div style={{
      background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
      padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
      transition: 'all 200ms',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)' }}>{parcel.trackingNumber}</span>
        <StatusBadge status={parcel.status} />
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--color-text-secondary)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Ruler size={13} /> {parcel.weight} kg
        </span>
        <span>{parcel.category}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-muted)' }}>
        <MapPin size={13} /> {parcel.destination}
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
        Dernière mise à jour : {formatDate ? formatDate(parcel.updatedAt) : ''}
      </div>

      {onViewTracking && (
        <button
          onClick={() => onViewTracking(parcel)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)', background: 'white',
            fontSize: 12, fontWeight: 600, color: 'var(--color-primary)',
            cursor: 'pointer', fontFamily: 'var(--font-family)',
            transition: 'all 150ms', marginTop: 4,
          }}
          type="button"
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'white'; }}
        >
          <Eye size={14} /> Voir le suivi
        </button>
      )}
    </div>
  );
}

export default ParcelCard;
