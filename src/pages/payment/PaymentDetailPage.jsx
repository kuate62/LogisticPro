import { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, XCircle, Clock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaymentDetail } from '../../hooks/usePayment';
import { PaymentStatusBadge, PaymentHistory } from '../../components/payment';
import { PAYMENT_METHOD_LABELS } from '../../config/constants';

export default function PaymentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPayment, paymentHistory, loading, loadPayment, loadHistory, deletePayment } = usePaymentDetail();
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadPayment(id);
      loadHistory(id);
    }
  }, [id, loadPayment, loadHistory]);

  const handleCancel = useCallback(async () => {
    if (!currentPayment) return;
    await deletePayment(currentPayment.id);
    setShowCancelModal(false);
    loadPayment(id);
  }, [currentPayment, deletePayment, id, loadPayment]);

  if (loading && !currentPayment) {
    return <Container className="py-4 text-center"><p>Chargement...</p></Container>;
  }

  if (!currentPayment) {
    return <Container className="py-4 text-center"><p className="text-muted">Paiement non trouvé</p></Container>;
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="outline-secondary" size="sm" onClick={() => navigate('/payments')}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h4 className="mb-0">Détails du paiement</h4>
            <code>{currentPayment.reference}</code>
          </div>
        </div>
        <div className="d-flex gap-2">
          <PaymentStatusBadge status={currentPayment.status} />
          {currentPayment.status !== 'cancelled' && currentPayment.status !== 'paid' && (
            <Button variant="danger" size="sm" onClick={() => setShowCancelModal(true)}>
              <XCircle size={14} className="me-1" /> Annuler
            </Button>
          )}
        </div>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white"><h6 className="mb-0">Informations</h6></Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <small className="text-muted d-block">Référence</small>
                  <strong>{currentPayment.reference}</strong>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">N° Expédition</small>
                  <strong>{currentPayment.shipmentNumber}</strong>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Client</small>
                  <strong>{currentPayment.clientName}</strong>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Téléphone</small>
                  <span>{currentPayment.clientPhone}</span>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Date</small>
                  <span>{new Date(currentPayment.createdAt).toLocaleDateString('fr-FR')}</span>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Agent</small>
                  <span>{currentPayment.agentName || '—'}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white"><h6 className="mb-0">Montants</h6></Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <small className="text-muted d-block">Transport</small>
                  <strong>{currentPayment.transportAmount?.toLocaleString('fr-FR')} FC</strong>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Assurance</small>
                  <strong>{currentPayment.insuranceAmount?.toLocaleString('fr-FR')} FC</strong>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Frais supplémentaires</small>
                  <span>{currentPayment.additionalFees?.toLocaleString('fr-FR')} FC</span>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Réduction</small>
                  <span>-{currentPayment.discount?.toLocaleString('fr-FR')} FC</span>
                </Col>
              </Row>
              <hr />
              <Row className="g-3">
                <Col md={4}>
                  <small className="text-muted d-block">Montant total</small>
                  <h5 className="mb-0">{currentPayment.totalAmount?.toLocaleString('fr-FR')} FC</h5>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-block">Payé</small>
                  <h5 className="mb-0 text-success">{currentPayment.paidAmount?.toLocaleString('fr-FR')} FC</h5>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-block">Reste à payer</small>
                  <h5 className={`mb-0 ${currentPayment.remainingAmount > 0 ? 'text-danger' : ''}`}>
                    {currentPayment.remainingAmount?.toLocaleString('fr-FR')} FC
                  </h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {currentPayment.comment && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white"><h6 className="mb-0">Commentaire</h6></Card.Header>
              <Card.Body><p className="mb-0">{currentPayment.comment}</p></Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white d-flex align-items-center gap-2">
              <Clock size={16} /> <h6 className="mb-0">Mode de paiement</h6>
            </Card.Header>
            <Card.Body>
              <strong>{PAYMENT_METHOD_LABELS[currentPayment.paymentMethod] || '—'}</strong>
              {currentPayment.receiptNumber && (
                <div className="mt-2">
                  <small className="text-muted d-block">N° Reçu</small>
                  <code>{currentPayment.receiptNumber}</code>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white"><h6 className="mb-0">Historique</h6></Card.Header>
            <Card.Body>
              <PaymentHistory history={paymentHistory} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Annuler le paiement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment annuler ce paiement ?</p>
          <p className="text-muted small">Référence: {currentPayment.reference}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>Non</Button>
          <Button variant="danger" onClick={handleCancel} disabled={loading}>
            Oui, annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
