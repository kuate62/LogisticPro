import { Plus, LayoutGrid, List as ListIcon, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientSearch from './ClientSearch';
import ClientFilters from './ClientFilters';

export default function ClientHeader({ search, onSearch, filters, onFilterChange, onFilterReset, view, onViewChange, total }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Users size={24} className="text-primary" /> Gestion des Clients
          </h4>
          <p className="text-muted mb-0 small">{total || 0} client{(total || 0) > 1 ? 's' : ''} enregistré{(total || 0) > 1 ? 's' : ''}</p>
        </div>
        <Link to="/clients/new" className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={16} /> Nouveau client
        </Link>
      </div>
      <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <ClientSearch value={search} onChange={onSearch} />
            <ClientFilters filters={filters} onChange={onFilterChange} onReset={onFilterReset} />
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
