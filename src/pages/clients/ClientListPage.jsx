import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useClients, useClientForm } from '../../hooks/useClient';
import ClientHeader from '../../components/clients/ClientHeader';
import ClientTable from '../../components/clients/ClientTable';
import ClientCard from '../../components/clients/ClientCard';
import ClientSkeleton from '../../components/clients/ClientSkeleton';
import ClientEmptyState from '../../components/clients/ClientEmptyState';
import PaginationBar from '../../components/rbac/PaginationBar';

export default function ClientListPage() {
  const { clients, counts, loading, error, search, filters, sort, pagination, setSearch, setFilters, resetFilters, setSort, setPage, refresh } = useClients();
  const { activate, deactivate, block, archive } = useClientForm();
  const [view, setView] = useState('table');

  const handleAction = useCallback(async (action, id) => {
    try {
      if (action === 'activate') { await activate(id); toast.success('Client activé'); }
      else if (action === 'deactivate') { await deactivate(id); toast.success('Client désactivé'); }
      else if (action === 'block') { if (window.confirm('Bloquer ce client ?')) { await block(id); toast.success('Client bloqué'); } }
      else if (action === 'archive') { if (window.confirm('Archiver ce client ?')) { await archive(id); toast.success('Client archivé'); } }
      refresh();
    } catch { toast.error('Erreur'); }
  }, [activate, deactivate, block, archive, refresh]);

  return (
    <div>
      <ClientHeader search={search} onSearch={setSearch} filters={filters} onFilterChange={setFilters} onFilterReset={resetFilters} view={view} onViewChange={setView} total={pagination.total} />

      {loading.list ? <ClientSkeleton /> : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : clients.length === 0 ? (
        <ClientEmptyState onCreateLink="/clients/new" />
      ) : view === 'table' ? (
        <div className="bg-white rounded-3 shadow-sm p-3">
          <ClientTable clients={clients} sort={sort} onSort={setSort} onAction={handleAction} />
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <>
          <div className="row g-3">
            {clients.map((c) => (
              <div key={c.id} className="col-md-6 col-lg-4">
                <ClientCard client={c} />
              </div>
            ))}
          </div>
          <PaginationBar pagination={pagination} onPageChange={setPage} />
        </>
      )}

      <div className="row g-3 mt-4">
        <div className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-3 text-center"><div className="fs-4 fw-bold text-primary">{counts.total}</div><div className="small text-muted">Total</div></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-3 text-center"><div className="fs-4 fw-bold text-success">{counts.active}</div><div className="small text-muted">Actifs</div></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-3 text-center"><div className="fs-4 fw-bold text-secondary">{counts.inactive}</div><div className="small text-muted">Inactifs</div></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-3 text-center"><div className="fs-4 fw-bold text-danger">{counts.blocked}</div><div className="small text-muted">Bloqués</div></div></div>
      </div>
    </div>
  );
}
