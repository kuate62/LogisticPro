import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { employeeCreateSchema, employeeUpdateSchema, employeeToFormValues } from '../../helpers/rbacValidation';
import { EMPLOYEE_POSITIONS, EMPLOYEE_STATUS } from '../../config/constants';
import { mockAgenciesService } from '../../api/mockAgencies';
import { useAuth } from '../../hooks/useAuth';

export default function EmployeeForm({ initialData, isEdit = false, onSubmit }) {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isEdit ? employeeUpdateSchema : employeeCreateSchema),
    defaultValues: isEdit ? employeeToFormValues(initialData) : { nationality: 'Camerounaise', status: 'active' },
  });

  useEffect(() => {
    mockAgenciesService.getAll(companyId, { perPage: 100 }).then((r) => setAgencies(r.data || []));
  }, [companyId]);

  useEffect(() => {
    if (isEdit && initialData) reset(employeeToFormValues(initialData));
  }, [initialData, isEdit, reset]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      toast.success(isEdit ? 'Employé mis à jour' : 'Employé créé avec succès');
      navigate(isEdit ? '/employees' : '/employees');
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
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Prénom *</Form.Label>
                <Form.Control {...register('firstName')} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Nom *</Form.Label>
                <Form.Control {...register('lastName')} isInvalid={!!errors.lastName} />
                <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Sexe *</Form.Label>
                <Form.Select {...register('gender')} isInvalid={!!errors.gender}>
                  <option value="">Sélectionner</option>
                  <option value="male">Masculin</option>
                  <option value="female">Féminin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Date de naissance *</Form.Label>
                <Form.Control type="date" {...register('dateOfBirth')} isInvalid={!!errors.dateOfBirth} />
                <Form.Control.Feedback type="invalid">{errors.dateOfBirth?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Nationalité *</Form.Label>
                <Form.Control {...register('nationality')} isInvalid={!!errors.nationality} />
                <Form.Control.Feedback type="invalid">{errors.nationality?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>N° CNI *</Form.Label>
                <Form.Control {...register('nationalId')} isInvalid={!!errors.nationalId} />
                <Form.Control.Feedback type="invalid">{errors.nationalId?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone *</Form.Label>
                <Form.Control {...register('phone')} isInvalid={!!errors.phone} placeholder="+237..." />
                <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control {...register('address')} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Ville *</Form.Label>
                <Form.Control {...register('city')} isInvalid={!!errors.city} />
                <Form.Control.Feedback type="invalid">{errors.city?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Date d'embauche *</Form.Label>
                <Form.Control type="date" {...register('hireDate')} isInvalid={!!errors.hireDate} />
                <Form.Control.Feedback type="invalid">{errors.hireDate?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Statut *</Form.Label>
                <Form.Select {...register('status')}>
                  {Object.entries(EMPLOYEE_STATUS).map(([k, v]) => <option key={k} value={v}>{v === 'active' ? 'Actif' : 'Inactif'}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Informations professionnelles</h6>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Matricule *</Form.Label>
                <Form.Control {...register('employeeCode')} isInvalid={!!errors.employeeCode} disabled={isEdit} />
                <Form.Control.Feedback type="invalid">{errors.employeeCode?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Agence *</Form.Label>
                <Form.Select {...register('agencyId')} isInvalid={!!errors.agencyId}>
                  <option value="">Sélectionner</option>
                  {agencies.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.agencyId?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Poste *</Form.Label>
                <Form.Select {...register('position')} isInvalid={!!errors.position}>
                  <option value="">Sélectionner</option>
                  {Object.entries(EMPLOYEE_POSITIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.position?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Observation</Form.Label>
            <Form.Control as="textarea" rows={2} {...register('observation')} />
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Annuler</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer l\'employé'}
        </Button>
      </div>
    </Form>
  );
}
