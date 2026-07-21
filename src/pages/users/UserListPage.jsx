import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, LayoutGrid, List as ListIcon, Users } from 'lucide-react';
import { useUsers } from '../../hooks/useUser';
import SearchBar from '../../components/rbac/SearchBar';
import ListSkeleton from '../../components/rbac/ListSkeleton';
import EmptyState from '../../components/rbac/EmptyState';
import UserTable from '../../components/rbac/UserTable';
import PaginationBar from '../../components/rbac/PaginationBar';
import { USER_STATUS } from '../../config/constants';
import toast from 'react-hot-toast';

export default function UserListPage() {
  const { users, loading, error, search, filters, sort, pagination, setSearch, setFilters, setSort, setPage, toggleStatus } = useUsers();
  const [view, setView] = useState('table');

  const handleToggle = async (id) => {
    try { await toggleStatus(id); toast.success('Statut mis à jour'); } catch { toast.error('Erreur'); }
  };

  const handleResetPassword = async () => {
    if (window.confirm('Réinitialiser le mot de passe de cet utilisateur ?')) {
      toast.success('Mot de passe réinitialisé — email envoyé');
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><Users size={24} className="text-primary" /> Gestion des Utilisateurs</h4>
          <p className="text-muted mb-0 small">Comptes d'accès à la plateforme</p>
        </div>
        <Link to="/users/new" className="btn btn-primary d-flex align-items-center gap-2"><Plus size={16} /> Nouvel utilisateur</Link>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Nom, email..." />
            <select className="form-select form-select-sm" style={{ width: 150 }} value={filters.status} onChange={(e) => setFilters({ status: e.target.value })}>
              <option value="">Tous les statuts</option>
              {Object.entries(USER_STATUS).map(([k, v]) => <option key={k} value={v}>{v === 'active' ? 'Actif' : v === 'inactive' ? 'Inactif' : 'Bloqué'}</option>)}
            </select>
          </div>
          <div className="btn-group btn-group-sm">
            <button type="button" className={`btn ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('table')}><ListIcon size={14} /></button>
            <button type="button" className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('grid')}><LayoutGrid size={14} /></button>
          </div>
        </div>
      </div>

      {loading.list ? <ListSkeleton /> : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : users.length === 0 ? (
        <EmptyState type="user" onCreateLink="/users/new" />
      ) : view === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <UserTable users={users} sort={sort} onSort={setSort} onToggle={handleToggle} onReset={handleResetPassword} />
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <>
          <div className="row g-3">
            {users.map((u) => (
              <div key={u.id} className="col-md-6 col-lg-4">
                <div className="bg-white rounded-3 shadow-sm p-3 h-100">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-semibold" style={{ width: 40, height: 40, fontSize: 14 }}>
                      {(u.firstName[0] || '') + (u.lastName[0] || '')}
                    </div>
                    <div>
                      <div className="fw-medium">{u.firstName} {u.lastName}</div>
                      <small className="text-muted">{u.email}</small>
                    </div>
                  </div>
                  <div className="small text-muted mb-2">Rôle: {u.roleName || u.roleId}</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${u.status === 'active' ? 'bg-success' : u.status === 'blocked' ? 'bg-danger' : 'bg-secondary'}`}>
                      {u.status === 'active' ? 'Actif' : u.status === 'blocked' ? 'Bloqué' : 'Inactif'}
                    </span>
                    <Link to={`/users/${u.id}`} className="btn btn-sm btn-outline-primary">Voir</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
