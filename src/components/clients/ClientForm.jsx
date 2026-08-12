import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clientCreateSchema, clientUpdateSchema, clientToFormValues } from '../../helpers/clientValidation';
import { CLIENT_DOCUMENT_TYPES, CONGO_PROVINCES } from '../../config/constants';
import { agenciesService } from '../../api/agenciesService';
import { useAuth } from '../../hooks/useAuth';

export default function ClientForm({ initialData, isEdit = false, onSubmit }) {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isEdit ? clientUpdateSchema : clientCreateSchema),
    defaultValues: isEdit ? clientToFormValues(initialData) : { country: 'Cameroun', tags: [] },
  });

  useEffect(() => {
    agenciesService.getAll(companyId, { perPage: 100 }).then((r) => setAgencies(r.data || []));
  }, [companyId]);

  useEffect(() => {
    if (isEdit && initialData) reset(clientToFormValues(initialData));
  }, [initialData, isEdit, reset]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const agency = agencies.find((a) => a.id === data.agencyId);
      await onSubmit({ ...data, agencyName: agency?.name || '' });
      toast.success(isEdit ? 'Client mis à jour avec succès' : 'Client créé avec succès');
      navigate(isEdit ? `/clients/${initialData.id}` : '/clients');
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la sauvegarde');
    } finally { setLoading(false); }
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Informations personnelles</h6>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Prénom *</Form.Label>
                <Form.Control {...register('firstName')} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Nom *</Form.Label>
                <Form.Control {...register('lastName')} isInvalid={!!errors.lastName} />
                <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Sexe *</Form.Label>
                <Form.Select {...register('gender')} isInvalid={!!errors.gender}>
                  <option value="">—</option>
                  <option value="male">Masculin</option>
                  <option value="female">Féminin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Date de naissance *</Form.Label>
                <Form.Control type="date" {...register('dateOfBirth')} isInvalid={!!errors.dateOfBirth} />
                <Form.Control.Feedback type="invalid">{errors.dateOfBirth?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Nationalité *</Form.Label>
                <Form.Control {...register('nationality')} isInvalid={!!errors.nationality} />
                <Form.Control.Feedback type="invalid">{errors.nationality?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Profession</Form.Label>
                <Form.Control {...register('profession')} placeholder="Optionnel" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Type de pièce *</Form.Label>
                <Form.Select {...register('documentType')} isInvalid={!!errors.documentType}>
                  <option value="">Sélectionner</option>
                  {Object.entries(CLIENT_DOCUMENT_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.documentType?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>N° de document *</Form.Label>
                <Form.Control {...register('documentNumber')} isInvalid={!!errors.documentNumber} />
                <Form.Control.Feedback type="invalid">{errors.documentNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Date de délivrance *</Form.Label>
                <Form.Control type="date" {...register('documentIssueDate')} isInvalid={!!errors.documentIssueDate} />
                <Form.Control.Feedback type="invalid">{errors.documentIssueDate?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Coordonnées</h6>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone principal *</Form.Label>
                <Form.Control {...register('phone')} isInvalid={!!errors.phone} placeholder="+237..." />
                <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone secondaire</Form.Label>
                <Form.Control {...register('phoneSecondary')} placeholder="+237..." />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control {...register('address')} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Quartier</Form.Label>
                <Form.Control {...register('neighborhood')} />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Ville *</Form.Label>
                <Form.Control {...register('city')} isInvalid={!!errors.city} />
                <Form.Control.Feedback type="invalid">{errors.city?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Région *</Form.Label>
                <Form.Select {...register('region')} isInvalid={!!errors.region}>
                  <option value="">—</option>
                  {CONGO_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.region?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group className="mb-3">
                <Form.Label>Pays</Form.Label>
                <Form.Control {...register('country')} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Informations métier</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Agence d'inscription *</Form.Label>
                <Form.Select {...register('agencyId')} isInvalid={!!errors.agencyId}>
                  <option value="">Sélectionner</option>
                  {agencies.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.agencyId?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Observation</Form.Label>
                <Form.Control as="textarea" rows={2} {...register('observation')} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Annuler</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le client'}
        </Button>
      </div>
    </Form>
  );
}
