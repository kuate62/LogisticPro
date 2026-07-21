import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientForm from '../../components/clients/ClientForm';
import { useClientForm } from '../../hooks/useClient';

export default function ClientCreatePage() {
  const { create } = useClientForm();
  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/clients" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><UserPlus size={22} className="text-primary" /> Nouveau client</h4>
          <p className="text-muted mb-0 small">Ajouter un nouveau client au système</p>
        </div>
      </div>
      <ClientForm onSubmit={create} />
    </div>
  );
}
