import { Link } from 'react-router-dom';
import { MapPin, Weight, DollarSign } from 'lucide-react';
import PackageStatus from './PackageStatus';

export default function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-3 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <div className="small fw-bold">{pkg.trackingCode}</div>
          <div className="text-muted" style={{ fontSize: 12 }}>{pkg.label}</div>
        </div>
        <PackageStatus status={pkg.status} />
      </div>
      <div className="small text-muted mb-2">
        <span className="badge bg-light text-dark me-1">{pkg.category}</span>
        {pkg.fragile && <span className="badge bg-warning text-dark me-1">Fragile</span>}
        {pkg.insured && <span className="badge bg-info text-white">Assuré</span>}
      </div>
      <div className="small mb-2">
        <div className="fw-medium">{pkg.senderName}</div>
        <div className="text-muted">→ {pkg.receiverName}</div>
      </div>
      <div className="d-flex gap-3 text-muted small mb-2">
        <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {pkg.originCity} → {pkg.destinationCity}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
        <span className="d-flex align-items-center gap-1 small"><Weight size={12} /> {pkg.weight} kg</span>
        <span className="d-flex align-items-center gap-1 small fw-medium"><DollarSign size={12} /> {(pkg.totalAmount || 0).toLocaleString('fr-FR')} FC</span>
      </div>
      <Link to={`/packages/${pkg.id}`} className="stretched-link" />
    </div>
  );
}
