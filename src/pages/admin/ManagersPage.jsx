import { useState, useEffect, useMemo } from 'react';
import { Search, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/admin/PageHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';
import LoadingState from '../../components/admin/LoadingState';
import { useManagers } from '../../hooks/useAdmin';
import './ManagersPage.css';

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

function getInitials(firstName, lastName) {
  return `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
}

export default function ManagersPage() {
  const { managers, loading, error, fetchManagers } = useManagers();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filtered = useMemo(() => {
    let list = managers || [];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.companyName || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      list = list.filter((m) => (statusFilter === 'active' ? m.isActive : !m.isActive));
    }
    return list;
  }, [managers, search, statusFilter]);

  return (
    <div className="sa-managers">
      <PageHeader title="Responsables d'entreprise" subtitle={`${filtered.length} responsable(s)`} />

      <div className="sa-managers__filters">
        <div className="sa-managers__search">
          <Search size={16} className="sa-managers__search-icon" />
          <input
            type="text"
            className="sa-managers__search-input"
            placeholder="Rechercher un responsable..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="sa-managers__status-filters">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'active', label: 'Actifs' },
            { value: 'inactive', label: 'Inactifs' },
          ].map((opt) => (
            <button
              key={opt.value}
              className={`sa-managers__filter-btn ${statusFilter === opt.value ? 'sa-managers__filter-btn--active' : ''}`}
              onClick={() => setStatusFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Building2} title="Aucun responsable trouvé" message="Aucun responsable ne correspond à vos critères de recherche." />
      ) : (
        <div className="sa-managers__table-wrap">
          <table className="sa-managers__table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th>Téléphone</th>
                <th>Dernière connexion</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mgr) => (
                <tr key={mgr.id}>
                  <td>
                    <div className="sa-managers__user">
                      <span className="sa-managers__avatar">{getInitials(mgr.firstName, mgr.lastName)}</span>
                      <span className="sa-managers__name">{mgr.firstName} {mgr.lastName}</span>
                    </div>
                  </td>
                  <td className="sa-managers__email">{mgr.email}</td>
                  <td className="sa-managers__company">{mgr.companyName}</td>
                  <td className="sa-managers__phone">{mgr.phone || '—'}</td>
                  <td className="sa-managers__date">{formatDate(mgr.lastLogin)}</td>
                  <td>
                    <StatusBadge status={mgr.isActive ? 'active' : 'inactive'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
