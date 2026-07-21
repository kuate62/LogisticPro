import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientEmptyState({ onCreateLink }) {
  return (
    <div className="bg-white rounded-3 p-5 shadow-sm text-center">
      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64 }}>
        <UserPlus size={28} className="text-muted" />
      </div>
      <h5 className="fw-semibold text-dark mb-2">Aucun client trouvé</h5>
      <p className="text-muted mb-4" style={{ maxWidth: 380, margin: '0 auto' }}>
        Ajoutez votre premier client pour commencer à gérer vos contacts.
      </p>
      {onCreateLink && (
        <Link to={onCreateLink} className="btn btn-primary px-4 py-2">
          <UserPlus size={16} className="me-2" />Ajouter un client
        </Link>
      )}
    </div>
  );
}
