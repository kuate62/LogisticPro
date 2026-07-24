import './StatusBadge.css';

const STATUS_MAP = {
  active: { label: 'Actif', color: 'success' },
  inactive: { label: 'Inactif', color: 'default' },
  suspended: { label: 'Suspendu', color: 'danger' },
  pending: { label: 'En attente', color: 'warning' },
  expired: { label: 'Expiré', color: 'danger' },
  paid: { label: 'Payé', color: 'success' },
  overdue: { label: 'En retard', color: 'danger' },
  cancelled: { label: 'Annulé', color: 'default' },
  completed: { label: 'Terminé', color: 'success' },
  failed: { label: 'Échoué', color: 'danger' },
  processing: { label: 'Traitement', color: 'info' },
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function StatusBadge({ status, children }) {
  const mapped = STATUS_MAP[status] || { label: children || capitalize(status), color: 'default' };

  return (
    <span className={`sa-status-badge sa-status-badge--${mapped.color}`}>
      {children || mapped.label}
    </span>
  );
}
