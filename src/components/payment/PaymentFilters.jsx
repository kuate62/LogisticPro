import { Row, Col, Form } from 'react-bootstrap';
import { PAYMENT_STATUS, PAYMENT_METHODS } from '../../config/constants';

export default function PaymentFilters({ filters, onChange }) {
  return (
    <Row className="g-2 mb-3">
      <Col md={3}>
        <Form.Select
          value={filters.status || ''}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">Tous les statuts</option>
          {Object.values(PAYMENT_STATUS).map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={filters.paymentMethod || ''}
          onChange={(e) => onChange({ ...filters, paymentMethod: e.target.value })}
        >
          <option value="">Tous les modes</option>
          {Object.values(PAYMENT_METHODS).map((m) => (
            <option key={m} value={m}>{m.replace(/_/g, ' ')}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Control
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          placeholder="Date début"
        />
      </Col>
      <Col md={3}>
        <Form.Control
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          placeholder="Date fin"
        />
      </Col>
    </Row>
  );
}
