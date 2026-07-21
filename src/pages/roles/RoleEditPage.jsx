import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import RoleForm from '../../components/rbac/RoleForm';
import ListSkeleton from '../../components/rbac/ListSkeleton';

export default function RoleEditPage() {
  const { id } = useParams();
  const { role, loading, fetch, clearSelected, update } = useRole();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !role) return <ListSkeleton />;

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/roles" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1">Modifier le rôle</h4>
          <p className="text-muted mb-0 small">{role.name}</p>
        </div>
      </div>
      <RoleForm initialData={role} isEdit onSubmit={(data) => update(id, data)} />
    </div>
  );
}
