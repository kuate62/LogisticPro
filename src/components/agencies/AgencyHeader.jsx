import { Link } from 'react-router-dom';
import { Plus, Download, Building2 } from 'lucide-react';
import './AgencyHeader.css';

export function AgencyHeader({ counts, loading }) {
  return (
    <div className="lp-agency-header">
      <div className="lp-agency-header__left">
        <div className="lp-agency-header__icon">
          <Building2 size={24} />
        </div>
        <div className="lp-agency-header__text">
          <h1 className="lp-agency-header__title">Gestion des Agences</h1>
          <p className="lp-agency-header__subtitle">
            {loading ? 'Chargement...' : `${counts.total} agence${counts.total > 1 ? 's' : ''} au total`}
          </p>
        </div>
      </div>
      <div className="lp-agency-header__right">
        <button className="lp-agency-header__export" type="button" disabled>
          <Download size={16} />
          <span>Exporter</span>
        </button>
        <Link to="/agencies/new" className="lp-agency-header__create">
          <Plus size={16} />
          <span>Nouvelle agence</span>
        </Link>
      </div>
    </div>
  );
}

export default AgencyHeader;
