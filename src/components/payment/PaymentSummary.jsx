import { Card, Row, Col } from 'react-bootstrap';
import { DollarSign, Clock, CheckCircle, AlertTriangle, Ban } from 'lucide-react';
import { PAYMENT_STATUS } from '../../config/constants';

export default function PaymentSummary({ payments = [] }) {
  const total = payments.length;
  const paid = payments.filter((p) => p.status === PAYMENT_STATUS.PAID).length;
  const partial = payments.filter((p) => p.status === PAYMENT_STATUS.PARTIAL).length;
  const pending = payments.filter((p) => p.status === PAYMENT_STATUS.PENDING).length;
  const cancelled = payments.filter((p) => p.status === PAYMENT_STATUS.CANCELLED).length;
  const totalAmount = payments.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
  const totalPaid = payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0);

  const stats = [
    { label: 'Total', value: total, icon: DollarSign, color: 'primary' },
    { label: 'Payés', value: paid, icon: CheckCircle, color: 'success' },
    { label: 'Partiels', value: partial, icon: Clock, color: 'info' },
    { label: 'En attente', value: pending, icon: AlertTriangle, color: 'warning' },
    { label: 'Annulés', value: cancelled, icon: Ban, color: 'danger' },
  ];

  return (
    <>
      <Row className="g-3 mb-3">
        {stats.map((stat) => (
          <Col key={stat.label} xs={6} md={4} lg={2}>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="py-2">
                <stat.icon size={20} className={`text-${stat.color} mb-1`} />
                <h5 className="mb-0">{stat.value}</h5>
                <small className="text-muted">{stat.label}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm bg-success bg-opacity-10">
            <Card.Body className="text-center py-3">
              <small className="text-muted">Total encaissé</small>
              <h4 className="text-success mb-0">{totalPaid.toLocaleString('fr-FR')} FC</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm bg-warning bg-opacity-10">
            <Card.Body className="text-center py-3">
              <small className="text-muted">Total à encaisser</small>
              <h4 className="text-warning mb-0">{(totalAmount - totalPaid).toLocaleString('fr-FR')} FC</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
