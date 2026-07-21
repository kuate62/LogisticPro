import { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, Edit, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrackingDetail } from '../../hooks/useTracking';
import { TrackingHeader, TrackingTimeline, TrackingStatusBadge } from '../../components/tracking';
import { TRACKING_STATUS } from '../../config/constants';

export default function TrackingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTracking, loading, loadTracking, updateTrackingStatus } = useTrackingDetail();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({ status: '', location: '', description: '', agentName: '' });

  useEffect(() => { if (id) loadTracking(id); }, [id, loadTracking]);

  const handleUpdateStatus = useCallback(async () => {
    if (!currentTracking) return;
    await updateTrackingStatus(currentTracking.id, updateForm);
    setShowUpdateModal(false);
    setUpdateForm({ status: '', location: '', description: '', agentName: '' });
  }, [currentTracking, updateForm, updateTrackingStatus]);

  if (loading && !currentTracking) {
    return <Container className="py-4 text-center"><p>Chargement...</p></Container>;
  }

  if (!currentTracking) {
    return <Container className="py-4 text-center"><p className="text-muted">Enregistrement non trouvé</p></Container>;
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="outline-secondary" size="sm" onClick={() => navigate('/tracking')}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h4 className="mb-0">Détails du suivi</h4>
            <code>{currentTracking.trackingNumber}</code>
          </div>
        </div>
        <div className="d-flex gap-2">
          <TrackingStatusBadge status={currentTracking.currentStatus} />
          <Button variant="primary" size="sm" onClick={() => setShowUpdateModal(true)}>
            <Edit size={14} className="me-1" /> Mettre à jour le statut
          </Button>
        </div>
      </div>

      <TrackingHeader tracking={currentTracking} />

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Historique de suivi</h5>
            </Card.Header>
            <Card.Body>
              <TrackingTimeline events={currentTracking.events || []} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h6 className="mb-0">Informations</h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <small className="text-muted d-block">Poids</small>
                <span>{currentTracking.weight ? `${currentTracking.weight} kg` : '—'}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Nombre de colis</small>
                <span>{currentTracking.numberOfPackages || '—'}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Destinataire</small>
                <span>{currentTracking.recipientName || '—'}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Téléphone</small>
                <span>{currentTracking.recipientPhone || '—'}</span>
              </div>
              {currentTracking.observation && (
                <div>
                  <small className="text-muted d-block">Observation</small>
                  <span>{currentTracking.observation}</span>
                </div>
              )}
            </Card.Body>
          </Card>

          {currentTracking.currentLocation && (
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <div>
                    <small className="text-muted d-block">Position actuelle</small>
                    <strong>{currentTracking.currentLocation}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mettre à jour le statut</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nouveau statut</Form.Label>
              <Form.Select
                value={updateForm.status}
                onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
              >
                <option value="">Sélectionner un statut</option>
                {Object.values(TRACKING_STATUS).map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position / Lieu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Agence de Lubumbashi"
                value={updateForm.location}
                onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Description de l'événement"
                value={updateForm.description}
                onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agent</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de l'agent"
                value={updateForm.agentName}
                onChange={(e) => setUpdateForm({ ...updateForm, agentName: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleUpdateStatus} disabled={!updateForm.status || !updateForm.description}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
