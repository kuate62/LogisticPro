import { useState } from 'react';
import { Truck } from 'lucide-react';
import { useRoutes, useRouteStatistics } from '../../hooks/useTransportRoute';
import { RouteHeader, RouteTable, RouteCard, RouteStatistics } from '../../components/routes';
import ClientSkeleton from '../../components/clients/ClientSkeleton';
import PaginationBar from '../../components/rbac/PaginationBar';

export function RouteListPage() {
  const {
    routes, loading, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
  } = useRoutes();
  const { statistics, loading: statsLoading } = useRouteStatistics();
  const [viewMode, setViewMode] = useState('table');

  return (
    <div className="py-4 px-lg-3">
      <RouteStatistics statistics={statistics} loading={statsLoading} />

      <RouteHeader
        search={search}
        onSearch={setSearch}
        filters={filters}
        onFilterChange={(f) => setFilters({ ...filters, ...f })}
        onFilterReset={resetFilters}
        view={viewMode}
        onViewChange={setViewMode}
        total={pagination.total}
      />

      {loading ? (
        <ClientSkeleton rows={6} />
      ) : routes.length === 0 ? (
        <div className="bg-white rounded-3 shadow-sm p-5 text-center">
          <Truck size={48} className="text-muted mb-3" />
          <h5 className="fw-semibold text-muted">Aucun trajet trouvé</h5>
          <p className="text-muted small mb-0">
            {search ? 'Aucun résultat pour votre recherche.' : 'Créez votre premier trajet pour commencer.'}
          </p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm">
          <RouteTable routes={routes} sort={sort} onSort={setSort} />
        </div>
      ) : (
        <div className="row g-3">
          {routes.map((route) => (
            <div key={route.id} className="col-md-6 col-lg-4">
              <RouteCard route={route} />
            </div>
          ))}
        </div>
      )}

      <PaginationBar pagination={pagination} onPageChange={setPage} />
    </div>
  );
}

export default RouteListPage;
