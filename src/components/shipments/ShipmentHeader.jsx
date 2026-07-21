import { Plus, LayoutGrid, List as ListIcon, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShipmentSearch from './ShipmentSearch';
import ShipmentFilters from './ShipmentFilters';

export default function ShipmentHeader({ search, onSearch, filters, onFilterChange, onFilterReset, view, onViewChange, total }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Truck size={24} className="text-primary" /> Gestion des Expéditions
          </h4>
          <p className="text-muted mb-0 small">{total || 0} expédition{(total || 0) > 1 ? 's' : ''}</p>
        </div>
        <Link to="/shipments/new" className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={16} /> Nouvelle expédition
        </Link>
      </div>
      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <ShipmentSearch value={search} onChange={onSearch} />
            <ShipmentFilters filters={filters} onChange={onFilterChange} onReset={onFilterReset} />
          </div>
          <div className="btn-group btn-group-sm">
            <button type="button" className={`btn ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onViewChange('table')}><ListIcon size={14} /></button>
            <button type="button" className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onViewChange('grid')}><LayoutGrid size={14} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
