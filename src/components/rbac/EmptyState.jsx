import { UserPlus, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ type = 'employee', onCreateLink }) {
  const config = {
    employee: { icon: UserPlus, title: 'Aucun employé trouvé', desc: 'Ajoutez votre premier employé pour commencer.' },
    user: { icon: UserPlus, title: 'Aucun utilisateur trouvé', desc: 'Créez un compte utilisateur pour accéder à la plateforme.' },
    role: { icon: Shield, title: 'Aucun rôle trouvé', desc: 'Créez un rôle pour gérer les permissions.' },
  };
  const c = config[type] || config.employee;
  const Icon = c.icon;

  return (
    <div className="bg-white rounded-3 p-5 shadow-sm text-center">
      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64 }}>
        <Icon size={28} className="text-muted" />
      </div>
      <h5 className="fw-semibold text-dark mb-2">{c.title}</h5>
      <p className="text-muted mb-4" style={{ maxWidth: 360, margin: '0 auto' }}>{c.desc}</p>
      {onCreateLink && (
        <Link to={onCreateLink} className="btn btn-primary px-4 py-2">
          <Icon size={16} className="me-2" />Ajouter
        </Link>
      )}
    </div>
  );
}
