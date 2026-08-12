import { Package, Archive, Truck, MapPin, Store, PackageCheck, XCircle, Check } from 'lucide-react';

const STEPS = [
  { key: 'registered', label: 'Enregistré', icon: Package },
  { key: 'preparing', label: 'Préparation', icon: Archive },
  { key: 'in_transit', label: 'En transit', icon: Truck },
  { key: 'arrived', label: 'Arrivé', icon: MapPin },
  { key: 'available_pickup', label: 'Disponible', icon: Store },
  { key: 'delivered', label: 'Livré', icon: PackageCheck },
];

function statusIndex(status) {
  if (status === 'collected') return STEPS.length - 1;
  if (status === 'cancelled') return -1;
  const idx = STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

export function TrackingTimeline({ status }) {
  const currentIdx = statusIndex(status);

  if (status === 'cancelled') {
    return (
      <div className="client-tracking-cancelled">
        <XCircle size={20} />
        <div>
          <strong>Expédition annulée</strong>
          <span>Cette livraison a été annulée. Contactez votre agence pour plus d'informations.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="client-tracking-steps" role="list">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < currentIdx;
        const current = i === currentIdx;
        return (
          <div key={step.key} className={`client-tracking-step ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}`} role="listitem">
            <div className="client-tracking-step__marker">
              {done ? <Check size={14} /> : <Icon size={14} />}
            </div>
            <span className="client-tracking-step__label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TrackingTimeline;
