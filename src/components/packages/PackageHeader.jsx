import { Package, Search, LayoutGrid, Table as TableIcon } from 'lucide-react';

export default function PackageHeader({ search, onSearch, filters, onFilterChange, onFilterReset, view, onViewChange, total }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Package size={22} className="text-primary" /> Gestion des Colis
        </h5>
        <span className="text-muted small">{total} colis</span>
      </div>

      <div className="row g-2 align-items-end">
        <div className="col-md-3">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-end-0"><Search size={14} /></span>
            <input
              type="text" className="form-control border-start-0 bg-light" placeholder="Rechercher..."
              value={search} onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2">
          <select className="form-select form-select-sm" value={filters.status} onChange={(e) => onFilterChange({ status: e.target.value })}>
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="pending">En attente</option>
            <option value="registered">Enregistré</option>
            <option value="ready">Prêt</option>
            <option value="in_transit">En transit</option>
            <option value="arrived">Arrivé</option>
            <option value="available_pickup">Disponible</option>
            <option value="collected">Récupéré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select form-select-sm" value={filters.category} onChange={(e) => onFilterChange({ category: e.target.value })}>
            <option value="">Toutes catégories</option>
            <option value="vêtements">Vêtements</option>
            <option value="alimentation">Alimentation</option>
            <option value="électronique">Électronique</option>
            <option value="documents">Documents</option>
            <option value="mobilier">Mobilier</option>
            <option value="bagages">Bagages</option>
            <option value="pièces">Pièces</option>
            <option value="médicaments">Médicaments</option>
            <option value="commerce">Commerce</option>
          </select>
        </div>
        <div className="col-md-1">
          <select className="form-select form-select-sm" value={filters.fragile} onChange={(e) => onFilterChange({ fragile: e.target.value })}>
            <option value="">Fragile</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div className="col-md-1">
          <select className="form-select form-select-sm" value={filters.insured} onChange={(e) => onFilterChange({ insured: e.target.value })}>
            <option value="">Assuré</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={onFilterReset}>Réinitialiser</button>
        </div>
        <div className="col-md-2 d-flex gap-1 justify-content-end">
          <button type="button" className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onViewChange('table')}><TableIcon size={14} /></button>
          <button type="button" className={`btn btn-sm ${view === 'card' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onViewChange('card')}><LayoutGrid size={14} /></button>
        </div>
      </div>
    </div>
  );
}
