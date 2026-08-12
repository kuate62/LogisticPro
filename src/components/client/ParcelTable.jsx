import { ArrowDown, ArrowUp, ArrowUpDown, ChevronRight } from 'lucide-react';
import { TablePagination, EmptyState } from '../agent';
import { ClientStatusBadge } from './ClientStatusBadge';

const COLUMNS = [
  { key: 'trackingNumber', label: 'N° de suivi', sortable: true },
  { key: 'category', label: 'Catégorie' },
  { key: 'weight', label: 'Poids', sortable: true },
  { key: 'destination', label: 'Destination', sortable: true },
  { key: 'status', label: 'Statut' },
  { key: 'updatedAt', label: 'Dernière MAJ', sortable: true },
];

function SortIcon({ active, direction }) {
  if (!active) return <ArrowUpDown size={13} className="client-th__icon" />;
  return direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
}

export function ParcelTable({
  data,
  page,
  perPage = 10,
  onPageChange,
  onRowClick,
  sort,
  onSort,
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

  const getValue = (parcel, key) => {
    switch (key) {
      case 'category':
        return <span className="client-category-tag">{parcel.category}</span>;
      case 'weight':
        return `${parcel.weight} kg`;
      case 'status':
        return <ClientStatusBadge status={parcel.status} />;
      case 'updatedAt':
        return formatDate(parcel.updatedAt);
      default:
        return parcel[key];
    }
  };

  if (total === 0) {
    return <EmptyState title="Aucun colis" message="Aucun résultat ne correspond à votre recherche." />;
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
            {rows.map((parcel) => (
              <tr
                key={parcel.id}
                className="client-table-row"
                onClick={() => onRowClick && onRowClick(parcel)}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {COLUMNS.map((col) => (
                  <td key={col.key}>
                    {col.key === 'trackingNumber'
                      ? <span className="client-reference">{parcel.trackingNumber}</span>
                      : getValue(parcel, col.key)}
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

export default ParcelTable;
