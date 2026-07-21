import { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Ban, ToggleLeft, ToggleRight, Archive } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useClient, useClientForm } from '../../hooks/useClient';
import ClientSkeleton from '../../components/clients/ClientSkeleton';
import ClientProfile from '../../components/clients/ClientProfile';
import ClientDocuments from '../../components/clients/ClientDocuments';
import ClientPhotos from '../../components/clients/ClientPhotos';
import ClientTimeline from '../../components/clients/ClientTimeline';

const TABS = [
  { key: 'info', label: 'Informations' },
  { key: 'documents', label: 'Documents' },
  { key: 'photos', label: 'Photos' },
  { key: 'shipments', label: 'Expéditions' },
  { key: 'payments', label: 'Paiements' },
  { key: 'history', label: 'Historique' },
  { key: 'stats', label: 'Statistiques' },
];

export default function ClientDetailPage() {
  const { id } = useParams();
  const { client, loading, history, documents, photos, fetch, fetchHistory, fetchDocuments, fetchPhotos, clearSelected } = useClient();
  const { activate, deactivate, block, archive } = useClientForm();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);
  useEffect(() => { if (activeTab === 'history') fetchHistory(id); if (activeTab === 'documents') fetchDocuments(id); if (activeTab === 'photos') fetchPhotos(id); }, [activeTab, id, fetchHistory, fetchDocuments, fetchPhotos]);

  if (loading.detail || !client) return <ClientSkeleton />;

  const handleAction = async (action) => {
    try {
      if (action === 'activate') { await activate(id); toast.success('Client activé'); }
      else if (action === 'deactivate') { await deactivate(id); toast.success('Client désactivé'); }
      else if (action === 'block') { if (window.confirm('Bloquer ce client ?')) { await block(id); toast.success('Client bloqué'); } }
      else if (action === 'archive') { if (window.confirm('Archiver ce client ?')) { await archive(id); toast.success('Client archivé'); } }
      fetch(id);
    } catch { toast.error('Erreur'); }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/clients" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-1">{client.firstName} {client.lastName}</h4>
          <p className="text-muted mb-0 small">{client.clientCode} — {client.email || client.phone}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/clients/${id}/edit`} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"><Edit size={14} /> Modifier</Link>
          {client.status === 'active' && <button type="button" className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1" onClick={() => handleAction('deactivate')}><ToggleLeft size={14} /> Désactiver</button>}
          {client.status === 'inactive' && <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center gap-1" onClick={() => handleAction('activate')}><ToggleRight size={14} /> Activer</button>}
          {client.status !== 'blocked' && <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={() => handleAction('block')}><Ban size={14} /> Bloquer</button>}
          {client.status !== 'active' && <button type="button" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => handleAction('archive')}><Archive size={14} /> Archiver</button>}
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        {TABS.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button type="button" className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
          </li>
        ))}
      </ul>

      {activeTab === 'info' && <ClientProfile client={client} />}
      {activeTab === 'documents' && <ClientDocuments documents={documents} loading={loading.documents} clientId={id} />}
      {activeTab === 'photos' && <ClientPhotos photos={photos} loading={loading.photos} clientId={id} />}
      {activeTab === 'shipments' && (
        <div className="bg-white rounded-3 shadow-sm p-4 text-center text-muted">
          <p>Module Expéditions — En développement</p>
        </div>
      )}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3 shadow-sm p-4 text-center text-muted">
          <p>Module Paiements — En développement</p>
        </div>
      )}
      {activeTab === 'history' && <ClientTimeline history={history} loading={loading.history} />}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <div className="row g-3">
            <div className="col-md-3"><div className="bg-light rounded-3 p-3 text-center"><div className="fs-4 fw-bold text-primary">{client.shipmentCount}</div><div className="small text-muted">Expéditions</div></div></div>
            <div className="col-md-3"><div className="bg-light rounded-3 p-3 text-center"><div className="fs-4 fw-bold text-info">{client.packageCount}</div><div className="small text-muted">Colis</div></div></div>
            <div className="col-md-3"><div className="bg-light rounded-3 p-3 text-center"><div className="fs-4 fw-bold text-success">{client.paymentCount}</div><div className="small text-muted">Paiements</div></div></div>
            <div className="col-md-3"><div className="bg-light rounded-3 p-3 text-center"><div className="fs-4 fw-bold text-warning">{(client.totalSpent || 0).toLocaleString('fr-FR')} FC</div><div className="small text-muted">Total dépensé</div></div></div>
          </div>
        </div>
      )}
    </div>
  );
}
