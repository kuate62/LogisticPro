import { Link } from 'react-router-dom';
import { Plus, Shield } from 'lucide-react';
import { useRoles, useRole } from '../../hooks/useRole';
import SearchBar from '../../components/rbac/SearchBar';
import ListSkeleton from '../../components/rbac/ListSkeleton';
import EmptyState from '../../components/rbac/EmptyState';
import RoleTable from '../../components/rbac/RoleTable';
import toast from 'react-hot-toast';

export default function RoleListPage() {
  const { roles, loading, error, search, setSearch, refresh } = useRoles();
  const { remove } = useRole();

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce rôle ?')) {
      try {
        await remove(id);
        toast.success('Rôle supprimé');
        refresh();
      } catch { toast.error('Erreur lors de la suppression'); }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><Shield size={24} className="text-primary" /> Gestion des Rôles</h4>
          <p className="text-muted mb-0 small">Rôles et permissions du système RBAC</p>
        </div>
        <Link to="/roles/new" className="btn btn-primary d-flex align-items-center gap-2"><Plus size={16} /> Nouveau rôle</Link>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Nom ou code du rôle..." />
      </div>

      {loading.list ? <ListSkeleton rows={4} /> : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : roles.length === 0 ? (
        <EmptyState type="role" onCreateLink="/roles/new" />
      ) : (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <RoleTable roles={roles} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
