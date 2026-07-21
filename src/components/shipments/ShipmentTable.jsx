import { Eye, Edit, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShipmentStatus from './ShipmentStatus';

export default function ShipmentTable({ shipments, sort, onSort, onCancel }) {
  const th = (field, label) => (
    <th role="button" className="text-nowrap user-select-none" onClick={() => onSort({ field, direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc' })}>
      {label}
      {sort.field === field && <span className="ms-1 text-primary">{sort.direction === 'asc' ? '▲' : '▼'}</span>}
    </th>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th>N° Expédition</th>
            {th('senderName', 'Expéditeur')}
            {th('destinationCity', 'Destination')}
            <th>Colis</th>
            {th('totalWeight', 'Poids')}
            {th('totalAmount', 'Montant')}
            {th('status', 'Statut')}
            {th('createdAt', 'Date')}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td><code className="small fw-semibold">{s.shipmentNumber}</code></td>
              <td>
                <div className="small">
                  <div className="fw-medium">{s.senderName}</div>
                  <div className="text-muted">{s.originAgencyName}</div>
                </div>
              </td>
              <td>
                <div className="small">
                  <div>{s.destinationCity}</div>
                  <div className="text-muted">{s.destinationAgencyName}</div>
                </div>
              </td>
              <td><span className="badge bg-primary-subtle text-primary">{s.packageCount}</span></td>
              <td className="small">{s.totalWeight} kg</td>
              <td className="small fw-medium">{(s.totalAmount || 0).toLocaleString('fr-FR')} FC</td>
              <td><ShipmentStatus status={s.status} /></td>
              <td className="small text-muted">{new Date(s.createdAt).toLocaleDateString('fr-FR')}</td>
              <td className="text-end">
                <div className="d-flex gap-1 justify-content-end">
                  <Link to={`/shipments/${s.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1" title="Voir"><Eye size={14} /></Link>
                  {['draft', 'pending'].includes(s.status) && (
                    <Link to={`/shipments/${s.id}/edit`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1" title="Modifier"><Edit size={14} /></Link>
                  )}
                  {['draft', 'pending'].includes(s.status) && (
                    <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" title="Annuler" onClick={() => onCancel(s.id)}><XCircle size={14} /></button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
