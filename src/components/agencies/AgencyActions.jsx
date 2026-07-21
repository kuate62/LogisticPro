import { Eye, Edit2, Power } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AgencyActions.css';

export function AgencyActions({ agency, onToggle, compact = false }) {
  const isInactive = agency.status !== 'active';

  return (
    <div className={`lp-agency-actions ${compact ? 'lp-agency-actions--compact' : ''}`}>
      <Link
        to={`/agencies/${agency.id}`}
        className="lp-agency-actions__btn lp-agency-actions__btn--view"
        title="Voir les détails"
      >
        <Eye size={16} />
        {!compact && <span>Voir</span>}
      </Link>
      <Link
        to={`/agencies/${agency.id}/edit`}
        className="lp-agency-actions__btn lp-agency-actions__btn--edit"
        title="Modifier"
      >
        <Edit2 size={16} />
        {!compact && <span>Modifier</span>}
      </Link>
      <button
        className={`lp-agency-actions__btn ${isInactive ? 'lp-agency-actions__btn--activate' : 'lp-agency-actions__btn--deactivate'}`}
        onClick={() => onToggle?.(agency.id)}
        title={isInactive ? 'Réactiver' : 'Désactiver'}
        type="button"
      >
        <Power size={16} />
        {!compact && <span>{isInactive ? 'Réactiver' : 'Désactiver'}</span>}
      </button>
    </div>
  );
}

export default AgencyActions;
