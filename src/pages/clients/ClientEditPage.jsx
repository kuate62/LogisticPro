import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useClient, useClientForm } from '../../hooks/useClient';
import ClientForm from '../../components/clients/ClientForm';
import ClientSkeleton from '../../components/clients/ClientSkeleton';

export default function ClientEditPage() {
  const { id } = useParams();
  const { client, loading, fetch, clearSelected } = useClient();
  const { update } = useClientForm();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !client) return <ClientSkeleton />;

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/clients" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1">Modifier le client</h4>
          <p className="text-muted mb-0 small">{client.firstName} {client.lastName} — {client.clientCode}</p>
        </div>
      </div>
      <ClientForm initialData={client} isEdit onSubmit={(data) => update(id, data)} />
    </div>
  );
}
