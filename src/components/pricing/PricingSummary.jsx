import { MapPin, Tag, Weight, DollarSign, Calendar, Eye } from 'lucide-react';
import PricingStatus from './PricingStatus';
import { PRICING_CATEGORIES } from '../../config/constants';

function getCategoryLabel(value) {
  const cat = PRICING_CATEGORIES.find((c) => c.value === value);
  return cat ? cat.label : value;
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="d-flex align-items-start gap-3 mb-3">
      <Icon size={16} className="text-muted mt-1 flex-shrink-0" />
      <div className="flex-grow-1">
        <div className="text-muted" style={{ fontSize: 12 }}>{label}</div>
        <div className="fw-medium small">{value}</div>
      </div>
    </div>
  );
}

export default function PricingSummary({ pricing }) {
  if (!pricing) return null;

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '—';

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 border">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <code className="small fw-semibold">{pricing.code}</code>
          <h5 className="fw-bold mb-0 mt-1">{pricing.name}</h5>
        </div>
        <PricingStatus status={pricing.status} />
      </div>

      <hr />

      <InfoRow icon={MapPin} label="Itinéraire" value={`${pricing.originCity} → ${pricing.destinationCity}`} />
      <InfoRow icon={Tag} label="Catégorie" value={getCategoryLabel(pricing.category)} />
      <InfoRow icon={Weight} label="Fourchette de poids" value={`${pricing.minWeight} - ${pricing.maxWeight} kg`} />

      <hr />

      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><DollarSign size={16} className="text-muted" /> Tarification</h6>
      <div className="row g-2 mb-3">
        <div className="col-6">
          <div className="bg-light rounded-2 p-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>Prix unitaire</div>
            <div className="fw-bold small">{(pricing.unitPrice || 0).toLocaleString('fr-FR')} FC/kg</div>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-light rounded-2 p-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>Frais fixes</div>
            <div className="fw-bold small">{(pricing.fixedFee || 0).toLocaleString('fr-FR')} FC</div>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-light rounded-2 p-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>Assurance</div>
            <div className="fw-bold small">{(pricing.insuranceRate || 0).toLocaleString('fr-FR')} %</div>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-light rounded-2 p-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>Frais additionnels</div>
            <div className="fw-bold small">{(pricing.additionalFee || 0).toLocaleString('fr-FR')} FC</div>
          </div>
        </div>
      </div>
      <div className="bg-primary bg-opacity-10 rounded-2 p-2 text-center mb-3">
        <div className="text-muted" style={{ fontSize: 11 }}>Prix total (estimé)</div>
        <div className="fw-bold text-primary fs-5">{(pricing.totalPrice || 0).toLocaleString('fr-FR')} FC</div>
      </div>

      <hr />

      <InfoRow icon={Calendar} label="Date d'effet" value={`${formatDate(pricing.effectiveFrom)} — ${formatDate(pricing.effectiveTo)}`} />
      <InfoRow icon={Eye} label="Observation" value={pricing.observation || '—'} />
    </div>
  );
}
