import { Filter, X } from 'lucide-react';
import { PRICING_STATUS, PRICING_CATEGORIES } from '../../config/constants';
import { useState } from 'react';

export default function PricingFilters({ filters, onChange, onReset }) {
  const [show, setShow] = useState(false);

  const activeCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="position-relative">
      <button type="button" className={`btn btn-sm ${show ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-1`} onClick={() => setShow(!show)}>
        <Filter size={14} /> Filtres {activeCount > 0 && <span className="badge bg-light text-primary ms-1">{activeCount}</span>}
      </button>
      {show && (
        <div className="position-absolute top-100 end-0 mt-2 bg-white rounded-3 shadow-lg p-4 border z-3" style={{ width: 380, zIndex: 1050 }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">Filtres</h6>
            <button type="button" className="btn btn-sm p-0 border-0" onClick={() => setShow(false)}><X size={16} /></button>
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label small text-muted">Statut</label>
              <select className="form-select form-select-sm" value={filters.status || ''} onChange={(e) => onChange({ status: e.target.value })}>
                <option value="">Tous</option>
                {Object.entries(PRICING_STATUS).map(([k, v]) => (
                  <option key={k} value={v}>{k === 'ACTIVE' ? 'Actif' : 'Inactif'}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Catégorie</label>
              <select className="form-select form-select-sm" value={filters.category || ''} onChange={(e) => onChange({ category: e.target.value })}>
                <option value="">Toutes</option>
                {PRICING_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Ville départ</label>
              <input type="text" className="form-control form-control-sm" placeholder="Ex: Kinshasa" value={filters.originCity || ''} onChange={(e) => onChange({ originCity: e.target.value })} />
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Ville destination</label>
              <input type="text" className="form-control form-control-sm" placeholder="Ex: Lubumbashi" value={filters.destinationCity || ''} onChange={(e) => onChange({ destinationCity: e.target.value })} />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 pt-3 border-top">
            <button type="button" className="btn btn-sm btn-outline-secondary me-2" onClick={onReset}>Réinitialiser</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => setShow(false)}>Appliquer</button>
          </div>
        </div>
      )}
    </div>
  );
}
