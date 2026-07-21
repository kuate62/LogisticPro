import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import { ROUTE_STATUS_LABELS } from '../../config/constants';

export default function RouteFilters({ filters, onChange, onReset }) {
  const [show, setShow] = useState(false);
  const activeCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="position-relative">
      <button
        type="button"
        className={`btn btn-sm ${show ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-1`}
        onClick={() => setShow(!show)}
      >
        <Filter size={14} /> Filtres
        {activeCount > 0 && <span className="badge bg-light text-primary ms-1">{activeCount}</span>}
      </button>
      {show && (
        <div className="position-absolute top-100 end-0 mt-2 bg-white rounded-3 shadow-lg p-4 border z-3" style={{ width: 380, zIndex: 1050 }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">Filtres</h6>
            <button type="button" className="btn btn-sm p-0 border-0" onClick={() => setShow(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small text-muted">Statut</label>
              <select
                className="form-select form-select-sm"
                value={filters.status || ''}
                onChange={(e) => onChange({ ...filters, status: e.target.value })}
              >
                <option value="">Tous les statuts</option>
                {Object.entries(ROUTE_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Ville départ</label>
              <select
                className="form-select form-select-sm"
                value={filters.originCity || ''}
                onChange={(e) => onChange({ ...filters, originCity: e.target.value })}
              >
                <option value="">Toutes</option>
                {(filters.originCities || []).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Ville destination</label>
              <select
                className="form-select form-select-sm"
                value={filters.destinationCity || ''}
                onChange={(e) => onChange({ ...filters, destinationCity: e.target.value })}
              >
                <option value="">Toutes</option>
                {(filters.destinationCities || []).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 pt-3 border-top">
            <button type="button" className="btn btn-sm btn-outline-secondary me-2" onClick={onReset}>
              Réinitialiser
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => setShow(false)}>
              Appliquer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
