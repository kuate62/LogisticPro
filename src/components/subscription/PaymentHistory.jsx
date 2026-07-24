import PaginationBar from '../../components/rbac/PaginationBar';

export default function PaymentHistory({ payments, loading, pagination, onPageChange }) {
  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" role="status" /></div>;
  if (!payments || payments.length === 0) return <div className="text-muted small text-center py-4">Aucun paiement enregistré</div>;

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="small fw-semibold">Référence</th>
              <th className="small fw-semibold">Période</th>
              <th className="small fw-semibold text-end">Montant</th>
              <th className="small fw-semibold">Méthode</th>
              <th className="small fw-semibold text-center">Statut</th>
              <th className="small fw-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="small fw-medium">{p.reference}</td>
                <td className="small text-muted">
                  {p.periodStart ? new Date(p.periodStart).toLocaleDateString('fr-FR') : '—'} — {p.periodEnd ? new Date(p.periodEnd).toLocaleDateString('fr-FR') : '—'}
                </td>
                <td className="small text-end fw-medium">{(p.amount || 0).toLocaleString('fr-FR')} {p.currency}</td>
                <td className="small">{p.paymentMethod}</td>
                <td className="small text-center">
                  <span className={`badge bg-${p.status === 'paid' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}`}>
                    {p.status === 'paid' ? 'Payé' : p.status === 'pending' ? 'En attente' : 'Échoué'}
                  </span>
                </td>
                <td className="small text-muted">{p.paidAt ? new Date(p.paidAt).toLocaleDateString('fr-FR') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && <PaginationBar pagination={pagination} onPageChange={onPageChange} />}
    </div>
  );
}
