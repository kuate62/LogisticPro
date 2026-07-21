import { Mail, Phone, MapPin, Calendar, Shield, Briefcase, Hash } from 'lucide-react';
import ClientAvatar from './ClientAvatar';
import ClientStatus from './ClientStatus';
import { CLIENT_DOCUMENT_TYPES } from '../../config/constants';

export default function ClientProfile({ client }) {
  if (!client) return null;
  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="d-flex align-items-center gap-4 mb-4">
            <ClientAvatar firstName={client.firstName} lastName={client.lastName} photo={client.photo} size={72} />
            <div>
              <h5 className="fw-bold mb-1">{client.firstName} {client.lastName}</h5>
              <div className="d-flex align-items-center gap-2 mb-1">
                <ClientStatus status={client.status} />
                <span className="text-muted small">{client.clientCode}</span>
              </div>
              <div className="text-muted small">{client.profession || '—'}</div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6 d-flex align-items-center gap-2 small"><Mail size={14} className="text-muted" /> {client.email || '—'}</div>
            <div className="col-md-6 d-flex align-items-center gap-2 small"><Phone size={14} className="text-muted" /> {client.phone}{client.phoneSecondary ? ` / ${client.phoneSecondary}` : ''}</div>
            <div className="col-md-6 d-flex align-items-center gap-2 small"><MapPin size={14} className="text-muted" /> {client.address || '—'}, {client.neighborhood || ''}, {client.city}, {client.region}</div>
            <div className="col-md-6 d-flex align-items-center gap-2 small"><Calendar size={14} className="text-muted" /> Né(e) le {client.dateOfBirth}</div>
            <div className="col-md-6 d-flex align-items-center gap-2 small"><Shield size={14} className="text-muted" /> {CLIENT_DOCUMENT_TYPES[client.documentType] || client.documentType}: {client.documentNumber}</div>
            <div className="col-md-6 d-flex align-items-center gap-2 small"><Hash size={14} className="text-muted" /> Nationalité: {client.nationality}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light rounded-3 p-3">
            <h6 className="fw-semibold small mb-3">Informations métier</h6>
            <div className="d-flex align-items-center gap-2 mb-2 small"><Briefcase size={14} className="text-muted" /> Agence: {client.agencyName || client.agencyId}</div>
            <div className="small text-muted mb-1">Inscrit le: {new Date(client.createdAt).toLocaleDateString('fr-FR')}</div>
            <div className="small text-muted mb-1">Expéditions: <strong>{client.shipmentCount}</strong></div>
            <div className="small text-muted mb-1">Colis: <strong>{client.packageCount}</strong></div>
            <div className="small text-muted mb-1">Paiements: <strong>{client.paymentCount}</strong></div>
            <div className="small fw-semibold mt-2">Total dépensé: {(client.totalSpent || 0).toLocaleString('fr-FR')} FC</div>
            {client.tags && client.tags.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-1">
                {client.tags.map((t) => <span key={t} className="badge bg-primary-subtle text-primary small">{t}</span>)}
              </div>
            )}
            {client.observation && <div className="small text-muted mt-2 fst-italic">"{client.observation}"</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
