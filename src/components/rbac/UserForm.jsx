import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userCreateSchema, userUpdateSchema, userToFormValues } from '../../helpers/rbacValidation';
import { mockAgenciesService } from '../../api/mockAgencies';
import { mockRolesService } from '../../api/mockRoles';
import { useAuth } from '../../hooks/useAuth';

export default function UserForm({ initialData, isEdit = false, onSubmit }) {
  const { companyId } = useAuth();
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isEdit ? userUpdateSchema : userCreateSchema),
    defaultValues: isEdit ? userToFormValues(initialData) : {},
  });

  useEffect(() => {
    Promise.all([
      mockAgenciesService.getAll(companyId, { perPage: 100 }),
      mockRolesService.getAll(companyId),
    ]).then(([a, r]) => { setAgencies(a.data || []); setRoles(r); });
  }, [companyId]);

  useEffect(() => {
    if (isEdit && initialData) reset(userToFormValues(initialData));
  }, [initialData, isEdit, reset]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data };
      if (isEdit && !payload.password) delete payload.password;
      await onSubmit(payload);
      toast.success(isEdit ? 'Utilisateur mis à jour' : 'Utilisateur créé avec succès');
      navigate('/users');
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
                <Form.Label>{isEdit ? 'Nouveau mot de passe (laisser vide pour conserver)' : 'Mot de passe *'}</Form.Label>
                <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Affectation</h6>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Rôle *</Form.Label>
                <Form.Select {...register('roleId')} isInvalid={!!errors.roleId}>
                  <option value="">Sélectionner</option>
                  {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.roleId?.message}</Form.Control.Feedback>
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
                <Form.Control {...register('position')} isInvalid={!!errors.position} />
                <Form.Control.Feedback type="invalid">{errors.position?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {!isEdit && (
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={<span className="text-muted small">Envoyer un email de bienvenue avec les identifiants de connexion</span>}
                defaultChecked
              />
            </Form.Group>
          )}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Annuler</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer l\'utilisateur'}
        </Button>
      </div>
    </Form>
  );
}
