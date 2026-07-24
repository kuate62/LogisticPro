import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, Edit, Search, Plus } from 'lucide-react';
import PageHeader from '../../components/admin/PageHeader';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';
import LoadingState from '../../components/admin/LoadingState';
import EmptyState from '../../components/admin/EmptyState';
import { useEnterprises, usePlans } from '../../hooks/useAdmin';
import './CompaniesPage.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'active', label: 'Actif' },
  { value: 'suspended', label: 'Suspendu' },
  { value: 'archived', label: 'Archivé' },
];

export default function CompaniesPage() {
  const navigate = useNavigate();
  const {
    enterprises, allEnterprises, total, totalPages,
    loading, search, filters, currentPage,
    setSearch, setFilters, setCurrentPage, fetchEnterprises,
  } = useEnterprises();
  const { plans, fetchPlans } = usePlans();

  useEffect(() => {
    fetchEnterprises();
    fetchPlans();
  }, [fetchEnterprises, fetchPlans]);

  const stats = useMemo(() => ({
    total: allEnterprises.length,
    active: allEnterprises.filter((e) => e.status === 'active').length,
    suspended: allEnterprises.filter((e) => e.status === 'suspended').length,
    trial: allEnterprises.filter((e) => e.isTrial).length,
    archived: allEnterprises.filter((e) => e.status === 'archived').length,
  }), [allEnterprises]);

  const planMap = useMemo(() => {
    const map = {};
    plans.forEach((p) => { map[p.id] = p.name; });
    return map;
  }, [plans]);

  if (loading && allEnterprises.length === 0) return <LoadingState />;

  return (
    <div className="sa-companies">
      <PageHeader
        title="Entreprises"
        subtitle={`${total} entreprise${total > 1 ? 's' : ''}`}
        actions={[{
          label: 'Nouvelle entreprise',
          icon: Plus,
          onClick: () => navigate('/admin/companies/create'),
        }]}
      />

      <div className="sa-companies__stats">
        <StatCard icon={Building2} label="Total" value={stats.total} color="primary" />
        <StatCard icon={Building2} label="Actives" value={stats.active} color="success" />
        <StatCard icon={Building2} label="Suspendues" value={stats.suspended} color="danger" />
        <StatCard icon={Building2} label="Essai" value={stats.trial} color="warning" />
        <StatCard icon={Building2} label="Archivées" value={stats.archived} color="default" />
      </div>

      <div className="sa-companies__filters">
        <select
          className="sa-companies__select"
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          className="sa-companies__select"
          value={filters.plan}
          onChange={(e) => setFilters({ plan: e.target.value })}
        >
          <option value="all">Tous les plans</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <div className="sa-companies__search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Rechercher une entreprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {enterprises.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Aucune entreprise trouvée"
          message="Aucune entreprise ne correspond à vos critères de recherche."
        />
      ) : (
        <>
          <div className="sa-companies__table-wrap">
            <table className="sa-companies__table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Entreprise</th>
                  <th>Responsable</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Plan</th>
                  <th>Agences</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enterprises.map((ent) => (
                  <tr key={ent.id}>
                    <td>
                      <div className="sa-companies__logo">
                        {ent.name.charAt(0).toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <button
                        className="sa-companies__name-btn"
                        onClick={() => navigate(`/admin/companies/${ent.id}`)}
                      >
                        {ent.name}
                      </button>
                      <span className="sa-companies__trade-name">{ent.tradeName}</span>
                    </td>
                    <td>{ent.responsible?.firstName} {ent.responsible?.lastName}</td>
                    <td className="sa-companies__email">{ent.email}</td>
                    <td>{ent.phone}</td>
                    <td>{planMap[ent.planId] || ent.planId}</td>
                    <td>{ent.agenciesCount}</td>
                    <td><StatusBadge status={ent.status} /></td>
                    <td>
                      <div className="sa-companies__actions">
                        <button
                          className="sa-companies__action-btn"
                          onClick={() => navigate(`/admin/companies/${ent.id}`)}
                          title="Voir"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="sa-companies__action-btn"
                          onClick={() => navigate(`/admin/companies/${ent.id}/edit`)}
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
