import { Link } from 'react-router-dom';
import ShipmentStatus from './ShipmentStatus';

export default function ShipmentCard({ shipment }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-3 h-100 border">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <code className="small fw-semibold">{shipment.shipmentNumber}</code>
        <ShipmentStatus status={shipment.status} />
      </div>
      <div className="mb-2">
        <div className="small fw-medium">{shipment.senderName}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>→ {shipment.receiverName}</div>
      </div>
      <div className="d-flex justify-content-between small text-muted mb-2">
        <span>{shipment.originCity} → {shipment.destinationCity}</span>
        <span>{new Date(shipment.createdAt).toLocaleDateString('fr-FR')}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center border-top pt-2">
        <div className="d-flex gap-3 small">
          <span><strong>{shipment.packageCount}</strong> colis</span>
          <span><strong>{shipment.totalWeight}</strong> kg</span>
        </div>
        <Link to={`/shipments/${shipment.id}`} className="btn btn-sm btn-outline-primary">Voir</Link>
      </div>
    </div>
  );
}
