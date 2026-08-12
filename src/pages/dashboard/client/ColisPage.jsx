import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientParcels } from '../../../hooks/useClientParcels';
import { useCurrentClient } from '../../../hooks/useCurrentClient';
import { PageHeader, ParcelCard, ParcelTable, ErrorState } from '../../../components/client';
import { SearchBar, FilterBar, DashboardStatCard, LoadingState } from '../../../components/agent';
import { Package, Truck, Store, PackageCheck, LayoutGrid, List } from 'lucide-react';
import { CLIENT_STATUS_LABELS } from '../../../data/mockClientData';
import { formatDate } from '../../../utils/format';

const STATUS_KEYS = ['in_transit', 'available_pickup', 'collected'];

export default function ColisPage() {
  const navigate = useNavigate();
  const { clientId, loading: clientLoading } = useCurrentClient();
  const {
    parcels, filteredParcels, categories,
    setSearch, filters, setFilters, resetFilters,
    pagination, setPage, sort, setSort,
    viewMode, setViewMode,
    loading, error, refresh,
  } = useClientParcels(clientId);

  const [searchLocal, setSearchLocal] = useState('');

  const statCards = useMemo(() => [
    { value: parcels.length, label: 'Total colis', icon: Package, color: 'primary' },
    { value: parcels.filter((p) => p.status === 'in_transit').length, label: 'En transit', icon: Truck, color: 'info' },
    { value: parcels.filter((p) => p.status === 'available_pickup').length, label: 'Disponibles', icon: Store, color: 'warning' },
    { value: parcels.filter((p) => p.status === 'collected').length, label: 'Récupérés', icon: PackageCheck, color: 'success' },
  ], [parcels]);

  const handleSearch = (val) => { setSearchLocal(val); setSearch(val); };
  const handleReset = () => { setSearchLocal(''); resetFilters(); };

  const filterOptions = {
    status: {
      label: 'Tous les statuts',
      items: STATUS_KEYS.map((s) => ({ value: s, label: CLIENT_STATUS_LABELS[s] || s })),
    },
    category: {
      label: 'Toutes les catégories',
      items: categories.map((c) => ({ value: c, label: c })),
    },
  };

  const pagedParcels = useMemo(() => {
    const { page, perPage } = pagination;
    return filteredParcels.slice((page - 1) * perPage, page * perPage);
  }, [filteredParcels, pagination]);

  if (clientLoading || (loading && parcels.length === 0)) {
    return <LoadingState />;
  }

  if (error && parcels.length === 0) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div>
      <PageHeader
        title="Colis"
        subtitle={`${parcels.length} colis suivi${parcels.length > 1 ? 's' : ''}`}
        actions={(
          <div className="client-view-toggle" role="group" aria-label="Mode d'affichage">
            <button
              type="button"
              className={viewMode === 'grid' ? 'is-active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Vue en cartes"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={viewMode === 'table' ? 'is-active' : ''}
              onClick={() => setViewMode('table')}
              aria-label="Vue en tableau"
            >
              <List size={16} />
            </button>
          </div>
        )}
      />

      <div className="ag-stats-grid client-stats-grid" style={{ marginBottom: 20 }}>
        {statCards.map((s, i) => <DashboardStatCard key={i} {...s} />)}
      </div>

      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title">Mes colis</h3>
          <div className="client-toolbar">
            <SearchBar value={searchLocal} onChange={handleSearch} placeholder="Rechercher un n° de suivi..." />
            <FilterBar filters={filters} options={filterOptions} onChange={setFilters} onReset={handleReset} />
          </div>
        </div>
        <div className="ag-card__body" style={viewMode === 'table' ? { padding: 0 } : undefined}>
          {viewMode === 'table' ? (
            <ParcelTable
              data={filteredParcels}
              page={pagination.page}
              perPage={pagination.perPage}
              onPageChange={setPage}
              onRowClick={(p) => navigate(`/dashboard/client/colis/${p.id}`)}
              sort={sort}
              onSort={setSort}
              formatDate={formatDate}
            />
          ) : (
            <>
              {pagedParcels.length === 0 ? (
                <div className="ag-empty">
                  <p className="ag-empty__title">Aucun colis</p>
                  <p className="ag-empty__desc">Aucun résultat ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="client-parcel-grid">
                  {pagedParcels.map((p) => (
                    <ParcelCard
                      key={p.id}
                      parcel={p}
                      formatDate={formatDate}
                      onViewTracking={() => navigate(`/dashboard/client/colis/${p.id}`)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
