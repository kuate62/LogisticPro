import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useShipments, useShipmentForm } from '../../hooks/useShipment';
import ShipmentHeader from '../../components/shipments/ShipmentHeader';
import ShipmentTable from '../../components/shipments/ShipmentTable';
import ShipmentCard from '../../components/shipments/ShipmentCard';
import ShipmentStatistics from '../../components/shipments/ShipmentStatistics';
import ShipmentSkeleton from '../../components/clients/ClientSkeleton';
import PaginationBar from '../../components/rbac/PaginationBar';

export default function ShipmentListPage() {
  const { shipments, loading, error, search, filters, sort, pagination, setSearch, setFilters, resetFilters, setSort, setPage, refresh } = useShipments();
  const { cancel } = useShipmentForm();
  const [view, setView] = useState('table');

  const handleCancel = useCallback(async (id) => {
    if (window.confirm('Annuler cette expédition ?')) {
      try { await cancel(id); toast.success('Expédition annulée'); refresh(); } catch { toast.error('Erreur'); }
    }
  }, [cancel, refresh]);

  return (
    <div>
      <ShipmentHeader search={search} onSearch={setSearch} filters={filters} onFilterChange={setFilters} onFilterReset={resetFilters} view={view} onViewChange={setView} total={pagination.total} />

      <div className="mb-4">
        <ShipmentStatistics statistics={null} loading={loading.stats} />
      </div>

      {loading.list ? <ShipmentSkeleton /> : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : shipments.length === 0 ? (
        <div className="bg-white rounded-3 p-5 shadow-sm text-center">
          <div className="text-muted mb-3" style={{ fontSize: 40 }}>📦</div>
          <h5 className="fw-semibold mb-2">Aucune expédition</h5>
          <p className="text-muted small mb-3">Créez votre première expédition pour commencer.</p>
          <a href="/shipments/new" className="btn btn-primary">Nouvelle expédition</a>
        </div>
      ) : view === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <ShipmentTable shipments={shipments} sort={sort} onSort={setSort} onCancel={handleCancel} />
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <>
          <div className="row g-3">
            {shipments.map((s) => <div key={s.id} className="col-md-6 col-lg-4"><ShipmentCard shipment={s} /></div>)}
          </div>
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
