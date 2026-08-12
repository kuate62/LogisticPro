import { ArrowDown, ArrowUp, ArrowUpDown, ChevronRight } from 'lucide-react';
import { TablePagination, EmptyState } from '../agent';
import { ClientStatusBadge } from './ClientStatusBadge';

const COLUMNS = [
  { key: 'reference', label: 'Référence', sortable: true },
  { key: 'destinataire', label: 'Destinataire' },
  { key: 'destination', label: 'Destination', sortable: true },
  { key: 'status', label: 'Statut' },
  { key: 'packageCount', label: 'Colis', sortable: true },
  { key: 'totalAmount', label: 'Total', sortable: true },
  { key: 'paidAmount', label: 'Payé' },
  { key: 'createdAt', label: 'Date', sortable: true },
];

function SortIcon({ active, direction }) {
  if (!active) return <ArrowUpDown size={13} className="client-th__icon" />;
  return direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
}

export function ShipmentTable({
  data,
  page,
  perPage = 8,
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

  const getValue = (shipment, key) => {
    switch (key) {
      case 'destinataire':
        return shipment.destinataire?.name;
      case 'status':
        return <ClientStatusBadge status={shipment.status} />;
      case 'packageCount':
        return shipment.packageCount;
      case 'totalAmount':
        return formatCurrency(shipment.totalAmount);
      case 'paidAmount':
        return formatCurrency(shipment.paidAmount);
      case 'createdAt':
        return formatDate(shipment.createdAt);
      default:
        return shipment[key];
    }
  };

  if (total === 0) {
    return <EmptyState title="Aucune expédition" message="Aucun résultat ne correspond à votre recherche." />;
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
            {rows.map((shipment) => (
              <tr
                key={shipment.id}
                className="client-table-row"
                onClick={() => onRowClick && onRowClick(shipment)}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {COLUMNS.map((col) => (
                  <td key={col.key}>
                    {col.key === 'reference'
                      ? <span className="client-reference">{shipment.reference}</span>
                      : getValue(shipment, col.key)}
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

export default ShipmentTable;
