import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientAvatar from './ClientAvatar';
import ClientStatus from './ClientStatus';

export default function ClientCard({ client }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-3 h-100 border">
      <div className="d-flex align-items-center gap-3 mb-2">
        <ClientAvatar firstName={client.firstName} lastName={client.lastName} photo={client.photo} size={44} />
        <div className="flex-grow-1">
          <div className="fw-medium">{client.firstName} {client.lastName}</div>
          <small className="text-muted">{client.clientCode}</small>
        </div>
        <ClientStatus status={client.status} />
      </div>
      <div className="small text-muted mb-2">
        <div>{client.phone}</div>
        <div>{client.city} — {client.agencyName || ''}</div>
      </div>
      <div className="d-flex justify-content-between align-items-center border-top pt-2">
        <div className="d-flex gap-3 small">
          <span><strong>{client.shipmentCount}</strong> expé.</span>
          <span><strong>{client.packageCount}</strong> colis</span>
        </div>
        <Link to={`/clients/${client.id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
          <Eye size={13} /> Voir
        </Link>
      </div>
    </div>
  );
}
