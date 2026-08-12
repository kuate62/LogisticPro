const STATUS_MAP = {
  completed: { label: 'Complété', color: 'success' },
  paid: { label: 'Payé', color: 'success' },
  validated: { label: 'Validée', color: 'info' },
  preparing: { label: 'En préparation', color: 'primary' },
  assigned: { label: 'Affectée', color: 'primary' },
  in_transit: { label: 'En transit', color: 'info' },
  arrived: { label: 'Arrivé', color: 'success' },
  delivered: { label: 'Livré', color: 'success' },
  cancelled: { label: 'Annulé', color: 'danger' },
  pending: { label: 'En attente', color: 'warning' },
  registered: { label: 'Enregistré', color: 'info' },
  available_pickup: { label: 'Disponible', color: 'success' },
  collected: { label: 'Récupéré', color: 'success' },
  damaged: { label: 'Endommagé', color: 'danger' },
  draft: { label: 'Brouillon', color: 'secondary' },
  archived: { label: 'Archivé', color: 'secondary' },
};

export function StatusBadge({ status, customLabel, className = '' }) {
  const config = STATUS_MAP[status] || { label: status, color: 'secondary' };
  return (
    <span className={`ag-badge ag-badge--${config.color} ${className}`}>
      {customLabel || config.label}
    </span>
  );
}

export default StatusBadge;
