import { Building2 } from 'lucide-react';
import './AgencyEmptyState.css';

export function AgencyEmptyState({ title = 'Aucune agence trouvée', message = 'Créez votre première agence pour commencer.', action }) {
  return (
    <div className="lp-agency-empty">
      <div className="lp-agency-empty__icon">
        <Building2 size={48} strokeWidth={1.5} />
      </div>
      <h3 className="lp-agency-empty__title">{title}</h3>
      <p className="lp-agency-empty__message">{message}</p>
      {action && <div className="lp-agency-empty__action">{action}</div>}
    </div>
  );
}

export default AgencyEmptyState;
