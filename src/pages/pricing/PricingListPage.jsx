import { useState, useCallback } from 'react';
import { Plus, DollarSign, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePricings } from '../../hooks/usePricing';
import PricingSearch from '../../components/pricing/PricingSearch';
import PricingFilters from '../../components/pricing/PricingFilters';
import PricingTable from '../../components/pricing/PricingTable';
import PricingCard from '../../components/pricing/PricingCard';
import ClientSkeleton from '../../components/clients/ClientSkeleton';
import PaginationBar from '../../components/rbac/PaginationBar';

export default function PricingListPage() {
  const { pricings, loading, error, search, filters, sort, pagination, setSearch, setFilters, resetFilters, setSort, setPage } = usePricings();
  const [view, setView] = useState('table');
  const navigate = useNavigate();

  const handleEdit = useCallback((pricing) => {
    navigate(`/pricing/${pricing.id}/edit`);
  }, [navigate]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <DollarSign size={24} className="text-primary" /> Tarifs
          </h4>
          <p className="text-muted mb-0 small">
            {pagination.total || 0} tarif{(pagination.total || 0) > 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/pricing/new" className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={16} /> Nouveau tarif
        </Link>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <PricingSearch value={search} onChange={setSearch} />
            <PricingFilters filters={filters} onChange={setFilters} onReset={resetFilters} />
          </div>
          <div className="btn-group btn-group-sm">
            <button type="button" className={`btn ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('table')}>
              <ListIcon size={14} />
            </button>
            <button type="button" className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('grid')}>
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {loading.list ? <ClientSkeleton /> : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : pricings.length === 0 ? (
        <div className="bg-white rounded-3 shadow-sm p-5 text-center">
          <DollarSign size={48} className="text-muted mb-3" />
          <h5 className="fw-semibold text-dark">Aucun tarif trouvé</h5>
          <p className="text-muted mb-3">Commencez par créer un nouveau tarif</p>
          <Link to="/pricing/new" className="btn btn-primary d-inline-flex align-items-center gap-2">
            <Plus size={16} /> Nouveau tarif
          </Link>
        </div>
      ) : view === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <PricingTable pricings={pricings} sort={sort} onSort={setSort} onEdit={handleEdit} />
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <>
          <div className="row g-3">
            {pricings.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-4">
                <PricingCard pricing={p} />
              </div>
            ))}
          </div>
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
