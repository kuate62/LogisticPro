import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserForm from '../../components/rbac/UserForm';
import { useUserForm } from '../../hooks/useUser';

export default function UserCreatePage() {
  const { create } = useUserForm();
  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/users" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><UserPlus size={22} className="text-primary" /> Nouvel utilisateur</h4>
          <p className="text-muted mb-0 small">Créer un compte d'accès à la plateforme</p>
        </div>
      </div>
      <UserForm onSubmit={create} />
    </div>
  );
}
