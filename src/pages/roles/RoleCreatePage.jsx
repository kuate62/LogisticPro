import { ArrowLeft, ShieldPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoleForm from '../../components/rbac/RoleForm';
import { useRoleForm } from '../../hooks/useRole';

export default function RoleCreatePage() {
  const { create } = useRoleForm();
  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/roles" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><ShieldPlus size={22} className="text-primary" /> Nouveau rôle</h4>
          <p className="text-muted mb-0 small">Créer un rôle avec des permissions spécifiques</p>
        </div>
      </div>
      <RoleForm onSubmit={create} />
    </div>
  );
}
