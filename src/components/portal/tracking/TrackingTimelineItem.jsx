import { FileText, CreditCard, Package, Truck, Navigation, MapPin, PackageCheck, CheckCircle, XCircle } from 'lucide-react';

const TYPE_ICONS = {
  creation: FileText,
  enregistrement: Package,
  paiement: CreditCard,
  affectation: Navigation,
  chargement: Truck,
  depart: Truck,
  transport: Navigation,
  arrivee: MapPin,
  disponible: PackageCheck,
  retrait: CheckCircle,
  annulation: XCircle,
};

const TYPE_COLORS = {
  creation: '#64748B',
  enregistrement: '#2563EB',
  paiement: '#16A34A',
  affectation: '#7C3AED',
  chargement: '#F59E0B',
  depart: '#2563EB',
  transport: '#0EA5E9',
  arrivee: '#16A34A',
  disponible: '#16A34A',
  retrait: '#16A34A',
  annulation: '#DC2626',
};

export default function TrackingTimelineItem({ event, isFirst, isLast }) {
  const Icon = TYPE_ICONS[event.type] || FileText;
  const color = TYPE_COLORS[event.type] || '#64748B';

  return (
    <div className={`tks-timeline-item ${isFirst ? 'tks-timeline-item--first' : ''}`}>
      <div className="tks-timeline-item__line">
        <div
          className="tks-timeline-item__dot"
          style={{ borderColor: color, backgroundColor: isFirst ? color : 'white' }}
        >
          <Icon size={12} style={{ color: isFirst ? 'white' : color }} />
        </div>
        {!isLast && <div className="tks-timeline-item__connector" />}
      </div>
      <div className="tks-timeline-item__content">
        <div className="tks-timeline-item__header">
          <strong className="tks-timeline-item__label">{event.label}</strong>
          <time className="tks-timeline-item__time">
            {new Date(event.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            {' à '}
            {new Date(event.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>
        {(event.city || event.agency) && (
          <p className="tks-timeline-item__location">
            {event.agency}{event.city ? ` — ${event.city}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}
