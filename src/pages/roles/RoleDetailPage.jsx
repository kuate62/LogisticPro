import { useEffect } from 'react';
import { ArrowLeft, Shield, Edit, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import ListSkeleton from '../../components/rbac/ListSkeleton';
import { mockRolesService } from '../../api/mockRoles';
import toast from 'react-hot-toast';

const ALL_PERMISSIONS_MAP = Object.fromEntries(mockRolesService.ALL_PERMISSIONS.map((p) => [p.key, p.label]));

export default function RoleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, loading, fetch, clearSelected, remove } = useRole();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !role) return <ListSkeleton />;

  const isSystem = role.isSystem === true;

  const handleDelete = async () => {
    if (window.confirm('Supprimer ce rôle définitivement ?')) {
      try { await remove(id); toast.success('Rôle supprimé'); navigate('/roles'); } catch { toast.error('Erreur'); }
    }
  };

  const permissionGroups = {};
  (role.permissions || []).forEach((p) => {
    const parts = p.split('.');
    const group = parts[0];
    if (!permissionGroups[group]) permissionGroups[group] = [];
    permissionGroups[group].push(p);
  });

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/roles" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Shield size={22} className="text-primary" /> {role.name}
            {isSystem && <span className="badge bg-secondary">Système</span>}
          </h4>
          <p className="text-muted mb-0 small">Code: <code>{role.code}</code></p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/roles/${id}/edit`} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"><Edit size={14} /> Modifier</Link>
          {!isSystem && (
            <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={handleDelete}><Trash2 size={14} /> Supprimer</button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
        {role.description && <p className="text-muted mb-3">{role.description}</p>}
        <h6 className="fw-semibold mb-3">Permissions ({role.permissions?.length || 0})</h6>
        {Object.entries(permissionGroups).map(([group, perms]) => (
          <div key={group} className="mb-3 p-3 bg-light rounded">
            <div className="fw-medium small mb-2 text-capitalize">{group}</div>
            <div className="d-flex flex-wrap gap-2">
              {perms.map((p) => (
                <span key={p} className="badge bg-primary-subtle text-primary">{ALL_PERMISSIONS_MAP[p] || p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
