import { Edit2, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import RouteStatus from './RouteStatus';

function SortIcon({ field, currentSort }) {
  if (currentSort.field !== field) return <ChevronsUpDown size={14} className="text-muted ms-1" />;
  return currentSort.direction === 'asc'
    ? <ChevronUp size={14} className="text-primary ms-1" />
    : <ChevronDown size={14} className="text-primary ms-1" />;
}

export default function RouteTable({ routes, sort, onSort, onEdit }) {
  const navigate = useNavigate();

  const handleSort = (field) => {
    const newDir = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction: newDir });
  };

  const th = (field, label) => (
    <th role="button" className="text-nowrap user-select-none" onClick={() => handleSort(field)}>
      {label}
      <SortIcon field={field} currentSort={sort} />
    </th>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            {th('code', 'Code')}
            {th('name', 'Nom')}
            {th('originCity', 'Départ')}
            {th('destinationCity', 'Destination')}
            {th('departureDate', 'Date')}
            <th>Capacité</th>
            {th('status', 'Statut')}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => {
            const weightPct = route.maxWeight > 0 ? Math.round((route.usedWeight / route.maxWeight) * 100) : 0;
            const packagesPct = route.maxPackages > 0 ? Math.round((route.usedPackages / route.maxPackages) * 100) : 0;
            return (
              <tr key={route.id}>
                <td><code className="small fw-semibold">{route.code}</code></td>
                <td>
                  <span className="small fw-medium">{route.name}</span>
                </td>
                <td className="small">{route.originCity}</td>
                <td className="small">{route.destinationCity}</td>
                <td className="small text-muted">{route.departureDate ? new Date(route.departureDate).toLocaleDateString('fr-FR') : '—'}</td>
                <td>
                  <div className="small" style={{ minWidth: 120 }}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">{route.usedWeight || 0}/{route.maxWeight || 0} kg</span>
                      <span className="text-muted">{weightPct}%</span>
                    </div>
                    <div className="progress mb-1" style={{ height: 4 }}>
                      <div className={`progress-bar bg-${weightPct >= 90 ? 'danger' : weightPct >= 70 ? 'warning' : 'success'}`} style={{ width: `${weightPct}%` }} />
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{route.usedPackages || 0}/{route.maxPackages || 0} colis</span>
                      <span className="text-muted">{packagesPct}%</span>
                    </div>
                    <div className="progress" style={{ height: 4 }}>
                      <div className={`progress-bar bg-${packagesPct >= 90 ? 'danger' : packagesPct >= 70 ? 'warning' : 'success'}`} style={{ width: `${packagesPct}%` }} />
                    </div>
                  </div>
                </td>
                <td><RouteStatus status={route.status} /></td>
                <td className="text-end">
                  <div className="d-flex gap-1 justify-content-end">
                    <Link to={`/routes/${route.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1" title="Voir">
                      <Eye size={14} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"
                      title="Modifier"
                      onClick={() => onEdit ? onEdit(route) : navigate(`/routes/${route.id}/edit`)}
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
