import { useState, useEffect, useMemo } from 'react';
import { Filter } from 'lucide-react';
import PageHeader from '../../components/admin/PageHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import LoadingState from '../../components/admin/LoadingState';
import EmptyState from '../../components/admin/EmptyState';
import { useSubscriptions } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';
import './SubscriptionsPage.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'active', label: 'Actif' },
  { value: 'expired', label: 'Expiré' },
  { value: 'suspended', label: 'Suspendu' },
];

const PAYMENT_LABELS = {
  mobile_money: 'Mobile Money',
  bank_transfer: 'Virement',
  orange_money: 'Orange Money',
  momo: 'MTN MoMo',
  card: 'Carte bancaire',
};

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatAmount = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits: 0 }).format(value) + ' FCFA';

export default function SubscriptionsPage() {
  const { subscriptions, loading, fetchSubscriptions, updateSubscription } = useSubscriptions();

  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return subscriptions;
    return subscriptions.filter((s) => s.status === statusFilter);
  }, [subscriptions, statusFilter]);

  const handleStatusChange = async (sub, newStatus) => {
    try {
      await updateSubscription(sub.id, { status: newStatus });
      toast.success(`Abonnement ${newStatus === 'active' ? 'réactivé' : 'mis à jour'}`);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading && subscriptions.length === 0) return <LoadingState />;

  return (
    <div className="sa-subs">
      <PageHeader
        title="Abonnements"
        subtitle={`${subscriptions.length} abonnement${subscriptions.length > 1 ? 's' : ''} au total`}
      />

      <div className="sa-subs__filters">
        <Filter size={16} />
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`sa-subs__filter-btn ${statusFilter === opt.value ? 'sa-subs__filter-btn--active' : ''}`}
            onClick={() => setStatusFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="Aucun abonnement trouvé" />
      ) : (
        <div className="sa-table-wrapper">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Entreprise</th>
                <th>Plan</th>
                <th>Statut</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Montant</th>
                <th>Paiement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id}>
                  <td className="sa-table__cell-primary">{sub.companyName || sub.companyId}</td>
                  <td>{sub.planLabel || sub.planId}</td>
                  <td><StatusBadge status={sub.status} /></td>
                  <td>{formatDate(sub.startDate)}</td>
                  <td>{formatDate(sub.endDate)}</td>
                  <td className="sa-table__cell-amount">{formatAmount(sub.amount)}</td>
                  <td>{PAYMENT_LABELS[sub.paymentMethod] || sub.paymentMethod || '—'}</td>
                  <td>
                    <div className="sa-table__actions">
                      {sub.status === 'suspended' && (
                        <button
                          className="sa-table__action-btn sa-table__action-btn--activate"
                          onClick={() => handleStatusChange(sub, 'active')}
                        >
                          Réactiver
                        </button>
                      )}
                      {sub.status === 'active' && (
                        <button
                          className="sa-table__action-btn sa-table__action-btn--suspend"
                          onClick={() => handleStatusChange(sub, 'suspended')}
                        >
                          Suspendre
                        </button>
                      )}
                      {sub.status === 'expired' && (
                        <button
                          className="sa-table__action-btn sa-table__action-btn--activate"
                          onClick={() => handleStatusChange(sub, 'active')}
                        >
                          Renouveler
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
