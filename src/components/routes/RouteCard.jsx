import { Link } from 'react-router-dom';
import { MapPin, Calendar, Package, Weight } from 'lucide-react';
import RouteStatus from './RouteStatus';

export default function RouteCard({ route }) {
  const weightPct = route.maxWeight > 0 ? Math.round((route.usedWeight / route.maxWeight) * 100) : 0;
  const packagesPct = route.maxPackages > 0 ? Math.round((route.usedPackages / route.maxPackages) * 100) : 0;

  return (
    <div className="bg-white rounded-3 shadow-sm p-3 h-100 border">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <code className="small fw-semibold">{route.code}</code>
          <h6 className="fw-semibold mb-0 mt-1">{route.name}</h6>
        </div>
        <RouteStatus status={route.status} />
      </div>

      <div className="mb-2">
        <div className="d-flex align-items-center gap-1 small">
          <MapPin size={14} className="text-primary" />
          <span>{route.originCity} → {route.destinationCity}</span>
        </div>
        {route.departureDate && (
          <div className="d-flex align-items-center gap-1 small text-muted mt-1">
            <Calendar size={13} />
            <span>{new Date(route.departureDate).toLocaleDateString('fr-FR')}</span>
          </div>
        )}
      </div>

      <div className="border-top pt-2 mb-2">
        <div className="d-flex justify-content-between small mb-1">
          <span className="d-flex align-items-center gap-1 text-muted"><Weight size={13} /> Poids</span>
          <span>{route.usedWeight || 0}/{route.maxWeight || 0} kg ({weightPct}%)</span>
        </div>
        <div className="progress mb-2" style={{ height: 4 }}>
          <div className={`progress-bar bg-${weightPct >= 90 ? 'danger' : weightPct >= 70 ? 'warning' : 'success'}`} style={{ width: `${weightPct}%` }} />
        </div>
        <div className="d-flex justify-content-between small mb-1">
          <span className="d-flex align-items-center gap-1 text-muted"><Package size={13} /> Colis</span>
          <span>{route.usedPackages || 0}/{route.maxPackages || 0} ({packagesPct}%)</span>
        </div>
        <div className="progress" style={{ height: 4 }}>
          <div className={`progress-bar bg-${packagesPct >= 90 ? 'danger' : packagesPct >= 70 ? 'warning' : 'success'}`} style={{ width: `${packagesPct}%` }} />
        </div>
      </div>

      <div className="d-flex justify-content-end border-top pt-2">
        <Link to={`/routes/${route.id}`} className="btn btn-sm btn-outline-primary">
          Voir
        </Link>
      </div>
    </div>
  );
}
