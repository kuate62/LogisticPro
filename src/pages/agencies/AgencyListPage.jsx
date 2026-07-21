import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import useAgency from '../../hooks/useAgency';
import useAgencyFilters from '../../hooks/useAgencyFilters';
import useAgencySearch from '../../hooks/useAgencySearch';
import {
  AgencyHeader, AgencySearch, AgencyFilters, AgencyTable,
  AgencyCard, AgencySkeleton, AgencyEmptyState,
} from '../../components/agencies';
import './AgencyListPage.css';

export function AgencyListPage() {
  const {
    agencies, counts, loading, pagination, sort,
    search, filters, cities, regions,
    setSort, setPage, toggleAgencyStatus,
  } = useAgency();

  const agencyFilters = useAgencyFilters();
  const agencySearch = useAgencySearch();
  const [viewMode, setViewMode] = useState('table');

  const handleToggle = async (agencyId) => {
    try {
      const result = await toggleAgencyStatus(agencyId);
      const label = result.status === 'active' ? 'réactivée' : 'désactivée';
      toast.success(`Agence ${label} avec succès`);
    } catch {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(i);
    }
    return (
      <div className="lp-list-pagination">
        <span className="lp-list-pagination__info">
          {pagination.total} résultat{pagination.total > 1 ? 's' : ''} — Page {pagination.page}/{pagination.totalPages}
        </span>
        <div className="lp-list-pagination__btns">
          <button
            className="lp-list-pagination__btn"
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            type="button"
          >
            Précédent
          </button>
          {pages.map((p) => (
            <button
              key={p}
              className={`lp-list-pagination__btn ${p === pagination.page ? 'lp-list-pagination__btn--active' : ''}`}
              onClick={() => handlePageChange(p)}
              type="button"
            >
              {p}
            </button>
          ))}
          <button
            className="lp-list-pagination__btn"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
            type="button"
          >
            Suivant
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="lp-list-page">
      <AgencyHeader counts={counts} loading={loading.counts} />

      <div className="lp-list-page__toolbar">
        <AgencySearch
          value={search}
          onChange={agencySearch.handleSearch}
          onClear={agencySearch.clearSearch}
        />
        <div className="lp-list-page__view-toggle">
          <button
            className={`lp-list-page__view-btn ${viewMode === 'table' ? 'lp-list-page__view-btn--active' : ''}`}
            onClick={() => setViewMode('table')}
            type="button"
            title="Vue tableau"
          >
            <List size={18} />
          </button>
          <button
            className={`lp-list-page__view-btn ${viewMode === 'grid' ? 'lp-list-page__view-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
            type="button"
            title="Vue grille"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      <AgencyFilters
        filters={filters}
        cities={cities}
        regions={regions}
        onStatusChange={agencyFilters.setStatus}
        onCityChange={agencyFilters.setCity}
        onRegionChange={agencyFilters.setRegion}
        onReset={agencyFilters.resetFilters}
        activeCount={agencyFilters.activeFilterCount}
      />

      {loading.list ? (
        <AgencySkeleton count={5} />
      ) : agencies.length === 0 ? (
        <AgencyEmptyState
          action={
            <Link to="/agencies/new" className="lp-list-page__create-btn">
              <Plus size={16} />
              Nouvelle agence
            </Link>
          }
        />
      ) : viewMode === 'table' ? (
        <AgencyTable
          agencies={agencies}
          sort={sort}
          onSort={setSort}
          onToggle={handleToggle}
          loading={loading.list}
        />
      ) : (
        <div className="lp-list-page__grid">
          {agencies.map((agency) => (
            <AgencyCard
              key={agency.id}
              agency={agency}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {renderPagination()}
    </div>
  );
}

export default AgencyListPage;
