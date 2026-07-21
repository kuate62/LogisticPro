import { Table, Button } from 'react-bootstrap';
import { Eye, ChevronUp, ChevronDown } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

function SortIcon({ field, sort }) {
  if (sort.field !== field) return null;
  return sort.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

export default function TrackingTable({ trackings, sort, onSort, onView }) {
  const handleSort = (field) => {
    const newDir = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSort?.({ field, direction: newDir });
  };

  if (!trackings?.length) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-0">Aucun enregistrement de suivi trouvé</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('trackingNumber')}>
              N° Suivi <SortIcon field="trackingNumber" sort={sort} />
            </th>
            <th>N° Expédition</th>
            <th>Client</th>
            <th>Origine → Destination</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('currentStatus')}>
              Statut <SortIcon field="currentStatus" sort={sort} />
            </th>
            <th>Position actuelle</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
              Date <SortIcon field="createdAt" sort={sort} />
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trackings.map((t) => (
            <tr key={t.id}>
              <td><code>{t.trackingNumber}</code></td>
              <td><small>{t.shipmentNumber}</small></td>
              <td>{t.recipientName || t.clientName}</td>
              <td>
                <small>{t.originCity} → {t.destinationCity}</small>
              </td>
              <td><TrackingStatusBadge status={t.currentStatus} /></td>
              <td>
                <small className="text-muted">{t.currentLocation || '—'}</small>
              </td>
              <td>
                <small>{new Date(t.createdAt).toLocaleDateString('fr-FR')}</small>
              </td>
              <td className="text-center">
                <Button size="sm" variant="outline-primary" onClick={() => onView?.(t)} title="Voir détails">
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
