import { Link } from 'react-router-dom';
import PricingStatus from './PricingStatus';
import { PRICING_CATEGORIES } from '../../config/constants';

function getCategoryLabel(value) {
  const cat = PRICING_CATEGORIES.find((c) => c.value === value);
  return cat ? cat.label : value;
}

export default function PricingCard({ pricing }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-3 h-100 border">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <code className="small fw-semibold">{pricing.code}</code>
        <PricingStatus status={pricing.status} />
      </div>
      <div className="mb-2">
        <div className="small fw-medium">{pricing.name}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>{pricing.originCity} → {pricing.destinationCity}</div>
      </div>
      <div className="d-flex justify-content-between small text-muted mb-2">
        <span className="badge bg-primary-subtle text-primary">{getCategoryLabel(pricing.category)}</span>
        <span>{pricing.minWeight} - {pricing.maxWeight} kg</span>
      </div>
      <div className="d-flex justify-content-between align-items-center border-top pt-2">
        <div className="fw-bold text-primary">{(pricing.unitPrice || 0).toLocaleString('fr-FR')} FC <span className="fw-normal text-muted small">/ kg</span></div>
        <Link to={`/pricing/${pricing.id}`} className="btn btn-sm btn-outline-primary">Voir</Link>
      </div>
    </div>
  );
}
