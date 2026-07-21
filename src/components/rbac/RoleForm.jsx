import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { roleCreateSchema, roleUpdateSchema, roleToFormValues } from '../../helpers/rbacValidation';
import { mockRolesService } from '../../api/mockRoles';

const ALL_PERMISSIONS_MAP = Object.fromEntries(mockRolesService.ALL_PERMISSIONS.map((p) => [p.key, p.label]));

const permissionGroups = {
  'Gestion des Utilisateurs': ['users.view', 'users.create', 'users.update', 'users.delete', 'users.block', 'users.reset_password'],
  'Gestion des Employés': ['employees.view', 'employees.create', 'employees.update', 'employees.delete'],
  'Gestion des Rôles': ['roles.view', 'roles.create', 'roles.update', 'roles.delete'],
  'Gestion des Agences': ['agencies.view', 'agencies.create', 'agencies.update', 'agencies.delete'],
  'Gestion des Colis': ['packages.view', 'packages.create', 'packages.update', 'packages.delete', 'packages.track'],
  'Gestion des Paiements': ['payments.view', 'payments.create', 'payments.update', 'payments.validate', 'payments.cancel'],
  'Rapports': ['reports.view', 'reports.export', 'reports.generate'],
  'Paramètres': ['settings.view', 'settings.update', 'settings.billing'],
};

export default function RoleForm({ initialData, isEdit = false, onSubmit }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isSystem = isEdit && initialData?.isSystem;

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(isEdit ? roleUpdateSchema : roleCreateSchema),
    defaultValues: isEdit ? roleToFormValues(initialData) : { permissions: [] },
  });

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      toast.success(isEdit ? 'Rôle mis à jour' : 'Rôle créé avec succès');
      navigate('/roles');
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la sauvegarde');
    } finally { setLoading(false); }
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Informations du rôle</h6>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Nom du rôle *</Form.Label>
                <Form.Control {...register('name')} isInvalid={!!errors.name} disabled={isSystem} placeholder="ex: Gestionnaire de colis" />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Code *</Form.Label>
                <Form.Control {...register('code')} isInvalid={!!errors.code} disabled={isSystem} placeholder="ex: package_manager" />
                <Form.Control.Feedback type="invalid">{errors.code?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control {...register('description')} disabled={isSystem} placeholder="Description courte du rôle" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h6 className="fw-semibold mb-3">Permissions</h6>
          {errors.permissions && <div className="text-danger small mb-3">{errors.permissions.message}</div>}
          {Object.entries(permissionGroups).map(([group, perms]) => (
            <div key={group} className="mb-3 p-3 bg-light rounded">
              <div className="fw-medium small mb-2">{group}</div>
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <Row>
                    {perms.map((p) => (
                      <Col md={4} key={p}>
                        <Form.Check
                          type="checkbox"
                          label={<span className="small">{ALL_PERMISSIONS_MAP[p] || p}</span>}
                          checked={field.value?.includes(p)}
                          disabled={isSystem}
                          onChange={(e) => {
                            const val = e.target.checked
                              ? [...(field.value || []), p]
                              : (field.value || []).filter((v) => v !== p);
                            field.onChange(val);
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              />
            </div>
          ))}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Annuler</Button>
        {!isSystem && (
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le rôle'}
          </Button>
        )}
      </div>
    </Form>
  );
}
