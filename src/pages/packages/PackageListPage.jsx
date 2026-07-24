import { useState, useCallback } from 'react';
import { Package as PackageIcon, Truck, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePackages, usePackageForm, usePackageStatistics } from '../../hooks/usePackages';
import PackageHeader from '../../components/packages/PackageHeader';
import PackageTable from '../../components/packages/PackageTable';
import PackageCard from '../../components/packages/PackageCard';
import PaginationBar from '../../components/rbac/PaginationBar';

export default function PackageListPage() {
  const { packages, loading, error, search, filters, sort, pagination, setSearch, setFilters, resetFilters, setSort, setPage, refresh } = usePackages();
  const { cancel } = usePackageForm();
  const { statistics } = usePackageStatistics();
  const [view, setView] = useState('table');

  const handleCancel = useCallback(async (id) => {
    if (window.confirm('Annuler ce colis ?')) {
      try { await cancel(id); toast.success('Colis annulé'); refresh(); } catch { toast.error('Erreur'); }
    }
  }, [cancel, refresh]);

  const stats = [
    { label: 'Total colis', value: statistics?.total || 0, icon: PackageIcon, color: 'primary' },
    { label: 'En transit', value: statistics?.in_transit || 0, icon: Truck, color: 'info' },
    { label: 'Récupérés', value: statistics?.collected || 0, icon: CheckCircle, color: 'success' },
    { label: 'En attente', value: statistics?.pending || 0, icon: Clock, color: 'warning' },
  ];

  return (
    <div>
      <PackageHeader search={search} onSearch={setSearch} filters={filters} onFilterChange={setFilters} onFilterReset={resetFilters} view={view} onViewChange={setView} total={pagination.total} />

      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="col-md-3">
            <div className="bg-white rounded-3 shadow-sm p-3 d-flex align-items-center gap-3">
              <div className={`rounded-3 bg-${s.color} bg-opacity-10 d-flex align-items-center justify-content-center`} style={{ width: 44, height: 44 }}>
                <s.icon size={20} className={`text-${s.color}`} />
              </div>
              <div>
                <div className="text-muted small">{s.label}</div>
                <div className="fw-bold fs-5">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading.list ? (
        <div className="bg-white rounded-3 shadow-sm p-5 text-center"><div className="spinner-border text-primary" role="status" /></div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : packages.length === 0 ? (
        <div className="bg-white rounded-3 p-5 shadow-sm text-center">
          <div className="text-muted mb-3" style={{ fontSize: 40 }}>📦</div>
          <h5 className="fw-semibold mb-2">Aucun colis</h5>
          <p className="text-muted small">Aucun colis trouvé avec les critères actuels.</p>
        </div>
      ) : view === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <PackageTable packages={packages} sort={sort} onSort={setSort} onCancel={handleCancel} />
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <>
          <div className="row g-3">
            {packages.map((pkg) => <div key={pkg.id} className="col-md-6 col-lg-4"><PackageCard pkg={pkg} /></div>)}
          </div>
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
