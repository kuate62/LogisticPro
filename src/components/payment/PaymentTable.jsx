import { Table, Button } from 'react-bootstrap';
import { Eye, ChevronUp, ChevronDown } from 'lucide-react';
import PaymentStatusBadge from './PaymentStatusBadge';
import { PAYMENT_METHOD_LABELS } from '../../config/constants';

function SortIcon({ field, sort }) {
  if (sort.field !== field) return null;
  return sort.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

export default function PaymentTable({ payments, sort, onSort, onView }) {
  const handleSort = (field) => {
    const newDir = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSort?.({ field, direction: newDir });
  };

  if (!payments?.length) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-0">Aucun paiement trouvé</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('reference')}>
              Référence <SortIcon field="reference" sort={sort} />
            </th>
            <th>Expédition</th>
            <th>Client</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('totalAmount')}>
              Montant <SortIcon field="totalAmount" sort={sort} />
            </th>
            <th>Payé</th>
            <th>Reste</th>
            <th>Mode</th>
            <th>Statut</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
              Date <SortIcon field="createdAt" sort={sort} />
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td><code>{p.reference}</code></td>
              <td><small>{p.shipmentNumber}</small></td>
              <td>{p.clientName}</td>
              <td><strong>{p.totalAmount?.toLocaleString('fr-FR')} FC</strong></td>
              <td className="text-success">{p.paidAmount?.toLocaleString('fr-FR')} FC</td>
              <td className={p.remainingAmount > 0 ? 'text-danger' : 'text-muted'}>
                {p.remainingAmount?.toLocaleString('fr-FR')} FC
              </td>
              <td><small>{PAYMENT_METHOD_LABELS[p.paymentMethod] || '—'}</small></td>
              <td><PaymentStatusBadge status={p.status} /></td>
              <td><small>{new Date(p.createdAt).toLocaleDateString('fr-FR')}</small></td>
              <td className="text-center">
                <Button size="sm" variant="outline-primary" onClick={() => onView?.(p)} title="Voir détails">
                  <Eye size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
