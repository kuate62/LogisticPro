import { Filter, X } from 'lucide-react';
import { CLIENT_STATUS, CONGO_PROVINCES } from '../../config/constants';
import { agenciesService } from '../../api/agenciesService';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

export default function ClientFilters({ filters, onChange, onReset }) {
  const { companyId } = useAuth();
  const [agencies, setAgencies] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => { agenciesService.getAll(companyId, { perPage: 100 }).then((r) => setAgencies(r.data || [])); }, [companyId]);

  const activeCount = Object.values(filters).filter((v) => v !== '' && v !== null && v !== undefined).length;

  return (
    <div className="position-relative">
      <button type="button" className={`btn btn-sm ${show ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-1`} onClick={() => setShow(!show)}>
        <Filter size={14} /> Filtres {activeCount > 0 && <span className="badge bg-light text-primary ms-1">{activeCount}</span>}
      </button>
      {show && (
        <div className="position-absolute top-100 end-0 mt-2 bg-white rounded-3 shadow-lg p-4 border z-3" style={{ width: 360, zIndex: 1050 }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">Filtres</h6>
            <button type="button" className="btn btn-sm p-0 border-0" onClick={() => setShow(false)}><X size={16} /></button>
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label small text-muted">Statut</label>
              <select className="form-select form-select-sm" value={filters.status || ''} onChange={(e) => onChange({ status: e.target.value })}>
                <option value="">Tous</option>
                {Object.entries(CLIENT_STATUS).map(([k, v]) => <option key={k} value={v}>{v === 'active' ? 'Actif' : v === 'inactive' ? 'Inactif' : 'Bloqué'}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Agence</label>
              <select className="form-select form-select-sm" value={filters.agencyId || ''} onChange={(e) => onChange({ agencyId: e.target.value })}>
                <option value="">Toutes</option>
                {agencies.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Ville</label>
              <select className="form-select form-select-sm" value={filters.city || ''} onChange={(e) => onChange({ city: e.target.value })}>
                <option value="">Toutes</option>
                {CONGO_PROVINCES.slice(0, 8).map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Actif</label>
              <select className="form-select form-select-sm" value={filters.isActive ?? ''} onChange={(e) => onChange({ isActive: e.target.value })}>
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Bloqué</label>
              <select className="form-select form-select-sm" value={filters.isBlocked ?? ''} onChange={(e) => onChange({ isBlocked: e.target.value })}>
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Avec expéditions</label>
              <select className="form-select form-select-sm" value={filters.hasShipments ?? ''} onChange={(e) => onChange({ hasShipments: e.target.value })}>
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Date début</label>
              <input type="date" className="form-control form-control-sm" value={filters.dateFrom || ''} onChange={(e) => onChange({ dateFrom: e.target.value })} />
            </div>
            <div className="col-6">
              <label className="form-label small text-muted">Date fin</label>
              <input type="date" className="form-control form-control-sm" value={filters.dateTo || ''} onChange={(e) => onChange({ dateTo: e.target.value })} />
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
