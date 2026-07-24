import PaginationBar from '../../components/rbac/PaginationBar';

export default function InvoiceHistory({ invoices, loading, pagination, onPageChange }) {
  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" role="status" /></div>;
  if (!invoices || invoices.length === 0) return <div className="text-muted small text-center py-4">Aucune facture</div>;

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="small fw-semibold">N° Facture</th>
              <th className="small fw-semibold text-end">Montant HT</th>
              <th className="small fw-semibold text-end">TVA (18%)</th>
              <th className="small fw-semibold text-end">Total TTC</th>
              <th className="small fw-semibold text-center">Statut</th>
              <th className="small fw-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="small fw-medium">{inv.invoiceNumber}</td>
                <td className="small text-end">{(inv.amount || 0).toLocaleString('fr-FR')} FCFA</td>
                <td className="small text-end">{(inv.taxAmount || 0).toLocaleString('fr-FR')} FCFA</td>
                <td className="small text-end fw-medium">{(inv.totalAmount || 0).toLocaleString('fr-FR')} FCFA</td>
                <td className="small text-center">
                  <span className={`badge bg-${inv.status === 'paid' ? 'success' : 'danger'}`}>
                    {inv.status === 'paid' ? 'Payée' : 'Impayée'}
                  </span>
                </td>
                <td className="small text-muted">{inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('fr-FR') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && <PaginationBar pagination={pagination} onPageChange={onPageChange} />}
    </div>
  );
}
