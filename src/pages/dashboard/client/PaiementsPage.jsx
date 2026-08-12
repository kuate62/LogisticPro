import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientPayments } from '../../../hooks/useClientPayments';
import { useCurrentClient } from '../../../hooks/useCurrentClient';
import { PageHeader, PaymentTable, ErrorState } from '../../../components/client';
import { SearchBar, FilterBar, DashboardStatCard, LoadingState } from '../../../components/agent';
import { CreditCard, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { CLIENT_METHOD_LABELS } from '../../../data/mockClientData';
import { formatCurrency, formatDate } from '../../../utils/format';

export default function PaiementsPage() {
  const navigate = useNavigate();
  const { clientId, loading: clientLoading } = useCurrentClient();
  const {
    payments, filteredPayments, methodOptions,
    setSearch, filters, setFilters, resetFilters,
    pagination, setPage, sort, setSort,
    loading, error, refresh,
  } = useClientPayments(clientId);

  const [searchLocal, setSearchLocal] = useState('');

  const { totalPaid, totalPending } = useMemo(() => {
    const paid = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
    const pending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
    return { totalPaid: paid, totalPending: pending };
  }, [payments]);

  const statCards = useMemo(() => [
    { value: payments.length, label: 'Total paiements', icon: CreditCard, color: 'primary' },
    { value: formatCurrency(totalPaid), label: 'Payé', icon: CheckCircle, color: 'success' },
    { value: formatCurrency(totalPending), label: 'En attente', icon: Clock, color: 'warning' },
    { value: formatCurrency(totalPaid + totalPending), label: 'Total général', icon: TrendingUp, color: 'info' },
  ], [payments, totalPaid, totalPending]);

  const handleSearch = (val) => { setSearchLocal(val); setSearch(val); };
  const handleReset = () => { setSearchLocal(''); resetFilters(); };

  const filterOptions = {
    status: {
      label: 'Tous les statuts',
      items: [
        { value: 'paid', label: 'Payé' },
        { value: 'pending', label: 'En attente' },
        { value: 'refunded', label: 'Remboursé' },
      ],
    },
    method: {
      label: 'Toutes les méthodes',
      items: methodOptions.map((m) => ({ value: m, label: CLIENT_METHOD_LABELS[m] || m })),
    },
  };

  if (clientLoading || (loading && payments.length === 0)) {
    return <LoadingState />;
  }

  if (error && payments.length === 0) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div>
      <PageHeader
        title="Paiements"
        subtitle={`${payments.length} transaction${payments.length > 1 ? 's' : ''} enregistrée${payments.length > 1 ? 's' : ''}`}
      />

      <div className="ag-stats-grid client-stats-grid" style={{ marginBottom: 20 }}>
        {statCards.map((s, i) => <DashboardStatCard key={i} {...s} />)}
      </div>

      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title">Historique des paiements</h3>
          <div className="client-toolbar">
            <SearchBar value={searchLocal} onChange={handleSearch} placeholder="Rechercher une référence..." />
            <FilterBar filters={filters} options={filterOptions} onChange={setFilters} onReset={handleReset} />
          </div>
        </div>
        <div className="ag-card__body" style={{ padding: 0 }}>
          <PaymentTable
            data={filteredPayments}
            page={pagination.page}
            perPage={pagination.perPage}
            onPageChange={setPage}
            onRowClick={(p) => navigate(`/dashboard/client/paiements/${p.id}`)}
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
