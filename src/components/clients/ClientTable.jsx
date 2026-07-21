import { Eye, Edit, Archive, Ban, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientStatus from './ClientStatus';
import ClientAvatar from './ClientAvatar';

export default function ClientTable({ clients, sort, onSort, onAction }) {
  const th = (field, label) => (
    <th role="button" className="text-nowrap user-select-none" onClick={() => onSort({ field, direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc' })}>
      {label}
      {sort.field === field && (
        <span className="ms-1 text-primary">{sort.direction === 'asc' ? '▲' : '▼'}</span>
      )}
    </th>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th>Client</th>
            {th('clientCode', 'Code')}
            <th>Téléphone</th>
            {th('city', 'Ville')}
            {th('shipmentCount', 'Expéditions')}
            {th('lastActivity', 'Dernière activité')}
            <th>Statut</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <ClientAvatar firstName={c.firstName} lastName={c.lastName} photo={c.photo} size={38} />
                  <div>
                    <div className="fw-medium">{c.firstName} {c.lastName}</div>
                    <div className="text-muted small">{c.email || '—'}</div>
                  </div>
                </div>
              </td>
              <td><code className="small">{c.clientCode}</code></td>
              <td className="small">{c.phone}</td>
              <td className="small">{c.city}</td>
              <td><span className="badge bg-primary-subtle text-primary">{c.shipmentCount}</span></td>
              <td className="small text-muted">{c.lastActivity ? new Date(c.lastActivity).toLocaleDateString('fr-FR') : '—'}</td>
              <td><ClientStatus status={c.status} /></td>
              <td className="text-end">
                <div className="d-flex gap-1 justify-content-end">
                  <Link to={`/clients/${c.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1" title="Voir"><Eye size={14} /></Link>
                  <Link to={`/clients/${c.id}/edit`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1" title="Modifier"><Edit size={14} /></Link>
                  {c.status === 'active' && (
                    <button type="button" className="btn btn-sm btn-outline-warning rounded-pill px-2 py-1" title="Désactiver" onClick={() => onAction('deactivate', c.id)}><ToggleLeft size={14} /></button>
                  )}
                  {c.status === 'inactive' && (
                    <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-2 py-1" title="Activer" onClick={() => onAction('activate', c.id)}><ToggleRight size={14} /></button>
                  )}
                  {c.status !== 'blocked' && (
                    <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" title="Bloquer" onClick={() => onAction('block', c.id)}><Ban size={14} /></button>
                  )}
                  {c.status !== 'active' && (
                    <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1" title="Archiver" onClick={() => onAction('archive', c.id)}><Archive size={14} /></button>
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
