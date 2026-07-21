import { X } from 'lucide-react';
import { AGENCY_STATUS_LABELS } from '../../config/constants';
import './AgencyFilters.css';

export function AgencyFilters({
  filters,
  cities = [],
  regions = [],
  onStatusChange,
  onCityChange,
  onRegionChange,
  onReset,
  activeCount = 0,
}) {
  return (
    <div className="lp-agency-filters">
      <div className="lp-agency-filters__row">
        <div className="lp-agency-filters__group">
          <label className="lp-agency-filters__label">Statut</label>
          <select
            className="lp-agency-filters__select"
            value={filters.status || ''}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            {Object.entries(AGENCY_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="lp-agency-filters__group">
          <label className="lp-agency-filters__label">Ville</label>
          <select
            className="lp-agency-filters__select"
            value={filters.city || ''}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="lp-agency-filters__group">
          <label className="lp-agency-filters__label">Région</label>
          <select
            className="lp-agency-filters__select"
            value={filters.region || ''}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {activeCount > 0 && (
          <button
            className="lp-agency-filters__reset"
            onClick={onReset}
            type="button"
          >
            <X size={14} />
            Réinitialiser ({activeCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default AgencyFilters;
