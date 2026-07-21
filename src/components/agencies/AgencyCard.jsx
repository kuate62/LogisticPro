import { Link } from 'react-router-dom';
import { Eye, Edit2, Power, MapPin, Phone, Users } from 'lucide-react';
import AgencyLogo from './AgencyLogo';
import AgencyStatus from './AgencyStatus';
import { formatAgencyPhone, formatAgencyDate } from '../../helpers/agencyFormatters';
import './AgencyCard.css';

export function AgencyCard({ agency, onToggle }) {
  return (
    <div className="lp-agency-card">
      <div className="lp-agency-card__top">
        <AgencyLogo agency={agency} size="md" />
        <div className="lp-agency-card__info">
          <div className="lp-agency-card__name-row">
            <h3 className="lp-agency-card__name">
              <Link to={`/agencies/${agency.id}`}>{agency.name}</Link>
            </h3>
            {agency.isPrimary && <span className="lp-agency-card__primary">Principale</span>}
          </div>
          <div className="lp-agency-card__code">{agency.code}</div>
        </div>
        <AgencyStatus status={agency.status} />
      </div>

      <div className="lp-agency-card__details">
        <div className="lp-agency-card__detail">
          <MapPin size={14} />
          <span>{agency.city}, {agency.region}</span>
        </div>
        <div className="lp-agency-card__detail">
          <Phone size={14} />
          <span>{formatAgencyPhone(agency.phone)}</span>
        </div>
        {agency.manager && (
          <div className="lp-agency-card__detail">
            <Users size={14} />
            <span>{agency.manager.name}</span>
          </div>
        )}
      </div>

      <div className="lp-agency-card__stats">
        <div className="lp-agency-card__stat">
          <span className="lp-agency-card__stat-value">{agency.employeesCount}</span>
          <span className="lp-agency-card__stat-label">Employés</span>
        </div>
        <div className="lp-agency-card__stat">
          <span className="lp-agency-card__stat-value">{agency.shipmentsCount}</span>
          <span className="lp-agency-card__stat-label">Expéditions</span>
        </div>
        <div className="lp-agency-card__stat">
          <span className="lp-agency-card__stat-value">{agency.packagesCount}</span>
          <span className="lp-agency-card__stat-label">Colis</span>
        </div>
      </div>

      <div className="lp-agency-card__footer">
        <span className="lp-agency-card__date">Créée le {formatAgencyDate(agency.createdAt)}</span>
        <div className="lp-agency-card__actions">
          <Link to={`/agencies/${agency.id}`} className="lp-agency-card__action" title="Voir">
            <Eye size={16} />
          </Link>
          <Link to={`/agencies/${agency.id}/edit`} className="lp-agency-card__action" title="Modifier">
            <Edit2 size={16} />
          </Link>
          <button
            className={`lp-agency-card__action ${agency.status === 'active' ? 'lp-agency-card__action--danger' : 'lp-agency-card__action--success'}`}
            onClick={() => onToggle?.(agency.id)}
            title={agency.status === 'active' ? 'Désactiver' : 'Réactiver'}
            type="button"
          >
            <Power size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgencyCard;
