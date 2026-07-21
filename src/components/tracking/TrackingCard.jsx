import { Card } from 'react-bootstrap';
import { Package, MapPin, Clock } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

export default function TrackingCard({ tracking, onClick }) {
  return (
    <Card
      className="border-0 shadow-sm h-100"
      style={{ cursor: 'pointer' }}
      onClick={() => onClick?.(tracking)}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <code className="small">{tracking.trackingNumber}</code>
          <TrackingStatusBadge status={tracking.currentStatus} />
        </div>
        <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
          <Package size={14} />
          <span>{tracking.shipmentNumber}</span>
        </div>
        <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
          <MapPin size={14} />
          <span>{tracking.originCity} → {tracking.destinationCity}</span>
        </div>
        <div className="d-flex align-items-center gap-2 text-muted small">
          <Clock size={14} />
          <span>{new Date(tracking.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="mt-2 text-muted small">
          <small>{tracking.currentLocation || 'Position inconnue'}</small>
        </div>
      </Card.Body>
    </Card>
  );
}
