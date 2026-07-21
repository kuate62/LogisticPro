import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useUser, useUserForm } from '../../hooks/useUser';
import UserForm from '../../components/rbac/UserForm';
import ListSkeleton from '../../components/rbac/ListSkeleton';

export default function UserEditPage() {
  const { id } = useParams();
  const { user, loading, fetch, clearSelected } = useUser();
  const { update } = useUserForm();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !user) return <ListSkeleton />;

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/users" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1">Modifier l'utilisateur</h4>
          <p className="text-muted mb-0 small">{user.firstName} {user.lastName}</p>
        </div>
      </div>
      <UserForm initialData={user} isEdit onSubmit={(data) => update(id, data)} />
    </div>
  );
}
