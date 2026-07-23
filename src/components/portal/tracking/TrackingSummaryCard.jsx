import { Package, MapPin, Hash, Weight, Boxes, Calendar, Truck } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

export default function TrackingSummaryCard({ result, eventCount = 0 }) {
  if (!result) return null;

  const items = [
    { icon: Hash, label: 'N° de suivi', value: result.trackingNumber },
    { icon: Package, label: 'N° d\'expédition', value: result.shipmentNumber },
    { icon: Boxes, label: 'Colis', value: `${result.packageCount} colis` },
    { icon: Weight, label: 'Poids total', value: `${result.totalWeight} kg` },
    { icon: MapPin, label: 'Trajet', value: `${result.originCity} → ${result.destinationCity}` },
    { icon: Calendar, label: 'Expédié le', value: new Date(result.createdAt).toLocaleDateString('fr-FR') },
    { icon: Truck, label: 'Événements', value: `${eventCount} événement${eventCount > 1 ? 's' : ''}` },
  ];

  if (result.estimatedDelivery) {
    items.push({ icon: Calendar, label: 'Livraison prévue', value: new Date(result.estimatedDelivery).toLocaleDateString('fr-FR') });
  }

  return (
    <div className="tks-summary">
      <div className="tks-summary__header">
        <h3>Récapitulatif</h3>
        <TrackingStatusBadge status={result.status} size="sm" />
      </div>
      <div className="tks-summary__grid">
        {items.map((item) => (
          <div key={item.label} className="tks-summary__item">
            <div className="tks-summary__item-icon">
              <item.icon size={14} />
            </div>
            <div className="tks-summary__item-content">
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
