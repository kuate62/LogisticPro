import { ArrowDown, ArrowUp, ArrowUpDown, ChevronRight } from 'lucide-react';
import { TablePagination, EmptyState } from '../agent';
import { ClientStatusBadge } from './ClientStatusBadge';
import { CLIENT_METHOD_LABELS } from '../../data/mockClientData';

const COLUMNS = [
  { key: 'reference', label: 'Référence', sortable: true },
  { key: 'shipmentReference', label: 'Expédition' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'method', label: 'Méthode' },
  { key: 'status', label: 'Statut' },
  { key: 'amount', label: 'Montant', sortable: true },
];

function SortIcon({ active, direction }) {
  if (!active) return <ArrowUpDown size={13} className="client-th__icon" />;
  return direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
}

export function PaymentTable({
  data,
  page,
  perPage = 10,
  onPageChange,
  onRowClick,
  sort,
  onSort,
  formatCurrency,
  formatDate,
}) {
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const rows = data.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key) => {
    if (!onSort) return;
    if (!sort || sort.field !== key) {
      onSort({ field: key, direction: 'asc' });
    } else {
      onSort({ field: key, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    }
  };

  const getValue = (payment, key) => {
    switch (key) {
      case 'date':
        return formatDate(payment.date);
      case 'method':
        return CLIENT_METHOD_LABELS[payment.method] || payment.method;
      case 'status':
        return <ClientStatusBadge status={payment.status} />;
      case 'amount':
        return <span className="client-table-amount">{formatCurrency(payment.amount)}</span>;
      default:
        return payment[key];
    }
  };

  if (total === 0) {
    return <EmptyState title="Aucun paiement" message="Aucun résultat ne correspond à votre recherche." />;
  }

  return (
    <>
      <div className="ag-table-wrapper">
        <table className="ag-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  style={col.sortable ? { cursor: 'pointer', userSelect: 'none' } : undefined}
                  aria-sort={sort && sort.field === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="client-th">
                    {col.label}
                    {col.sortable && <SortIcon active={sort && sort.field === col.key} direction={sort?.direction} />}
                  </span>
                </th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((payment) => (
              <tr
                key={payment.id}
                className="client-table-row"
                onClick={() => onRowClick && onRowClick(payment)}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {COLUMNS.map((col) => (
                  <td key={col.key}>
                    {col.key === 'reference'
                      ? <span className="client-reference">{payment.reference}</span>
                      : getValue(payment, col.key)}
                  </td>
                ))}
                <td className="client-table-row__action">
                  <ChevronRight size={15} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination page={page} perPage={perPage} total={total} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}

export default PaymentTable;
