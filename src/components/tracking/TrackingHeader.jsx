import { Row, Col } from 'react-bootstrap';
import { Package, MapPin, User, Calendar, Hash } from 'lucide-react';

export default function TrackingHeader({ tracking }) {
  if (!tracking) return null;

  const info = [
    { icon: Hash, label: 'N° Suivi', value: tracking.trackingNumber },
    { icon: Package, label: 'N° Expédition', value: tracking.shipmentNumber },
    { icon: User, label: 'Client', value: tracking.recipientName || tracking.clientName },
    { icon: MapPin, label: 'Origine', value: tracking.originCity },
    { icon: MapPin, label: 'Destination', value: tracking.destinationCity },
    { icon: Calendar, label: 'Créé le', value: new Date(tracking.createdAt).toLocaleDateString('fr-FR') },
  ];

  return (
    <Row className="g-2 mb-4">
      {info.map((item) => (
        <Col key={item.label} xs={6} md={4}>
          <div className="d-flex align-items-center gap-2 text-muted small">
            <item.icon size={14} />
            <span>{item.label}: <strong className="text-dark">{item.value}</strong></span>
          </div>
        </Col>
      ))}
    </Row>
  );
}
