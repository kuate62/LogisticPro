import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientShipments } from '../../../hooks/useClientShipments';
import { useCurrentClient } from '../../../hooks/useCurrentClient';
import { PageHeader, ShipmentTable, ErrorState } from '../../../components/client';
import { SearchBar, FilterBar, DashboardStatCard, LoadingState } from '../../../components/agent';
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { CLIENT_STATUS_LABELS } from '../../../data/mockClientData';
import { formatCurrency, formatDate } from '../../../utils/format';

export default function ExpeditionsPage() {
  const navigate = useNavigate();
  const { clientId, loading: clientLoading, error: clientError, refetch } = useCurrentClient();
  const {
    shipments, filteredShipments, destinations, statusOptions,
    setSearch, filters, setFilters, resetFilters,
    pagination, setPage, sort, setSort,
    loading, error, refresh,
  } = useClientShipments(clientId);

  const [searchLocal, setSearchLocal] = useState('');

  const statCards = useMemo(() => {
    const inTransit = shipments.filter((s) => s.status === 'in_transit').length;
    const delivered = shipments.filter((s) => s.status === 'delivered').length;
    const pending = shipments.filter((s) => s.status === 'pending').length;
    return [
      { value: shipments.length, label: 'Total expéditions', icon: Package, color: 'primary' },
      { value: inTransit, label: 'En transit', icon: Truck, color: 'info' },
      { value: delivered, label: 'Livrées', icon: CheckCircle, color: 'success' },
      { value: pending, label: 'En attente', icon: MapPin, color: 'warning' },
    ];
  }, [shipments]);

  const handleSearch = (val) => { setSearchLocal(val); setSearch(val); };
  const handleReset = () => { setSearchLocal(''); resetFilters(); };

  const filterOptions = {
    status: {
      label: 'Tous les statuts',
      items: statusOptions.map((s) => ({ value: s, label: CLIENT_STATUS_LABELS[s] || s })),
    },
    destination: {
      label: 'Toutes les destinations',
      items: destinations.map((d) => ({ value: d, label: d })),
    },
  };

  if (clientLoading || (loading && shipments.length === 0)) {
    return <LoadingState />;
  }

  if (clientError && !clientId) {
    return <ErrorState message={clientError} onRetry={refetch} />;
  }

  if (error && shipments.length === 0) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div>
      <PageHeader
        title="Expéditions"
        subtitle={`${pagination.total} expédition${pagination.total > 1 ? 's' : ''} enregistrée${pagination.total > 1 ? 's' : ''}`}
      />

      <div className="ag-stats-grid client-stats-grid" style={{ marginBottom: 20 }}>
        {statCards.map((s, i) => <DashboardStatCard key={i} {...s} />)}
      </div>

      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title">Toutes les expéditions</h3>
          <div className="client-toolbar">
            <SearchBar value={searchLocal} onChange={handleSearch} placeholder="Rechercher une référence, un destinataire..." />
            <FilterBar filters={filters} options={filterOptions} onChange={setFilters} onReset={handleReset} />
          </div>
        </div>
        <div className="ag-card__body" style={{ padding: 0 }}>
          <ShipmentTable
            data={filteredShipments}
            page={pagination.page}
            perPage={pagination.perPage}
            onPageChange={setPage}
            onRowClick={(s) => navigate(`/dashboard/client/expeditions/${s.id}`)}
            sort={sort}
            onSort={setSort}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
}
