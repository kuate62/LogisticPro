import { Card, Row, Col } from 'react-bootstrap';
import { Package, Clock, CheckCircle } from 'lucide-react';

export default function TrackingSummary({ trackings = [] }) {
  const total = trackings.length;
  const inTransit = trackings.filter((t) => t.status === 'in_transit').length;
  const delivered = trackings.filter((t) => ['delivered_to_recipient', 'picked_up_by_recipient'].includes(t.status)).length;
  const exceptions = trackings.filter((t) => t.status === 'exception').length;

  const stats = [
    { label: 'Total', value: total, icon: Package, color: 'primary' },
    { label: 'En transit', value: inTransit, icon: Clock, color: 'info' },
    { label: 'Livrés', value: delivered, icon: CheckCircle, color: 'success' },
    { label: 'Exceptions', value: exceptions, icon: Clock, color: 'danger' },
  ];

  return (
    <Row className="g-3 mb-4">
      {stats.map((stat) => (
        <Col key={stat.label} xs={6} md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="py-3">
              <stat.icon size={24} className={`text-${stat.color} mb-1`} />
              <h4 className="mb-0">{stat.value}</h4>
              <small className="text-muted">{stat.label}</small>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
