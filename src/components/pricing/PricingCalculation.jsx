import { Calculator, Truck, Shield, Plus, DollarSign } from 'lucide-react';

function CalculationRow({ icon: Icon, label, value, color = 'dark' }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="d-flex align-items-center gap-2 text-muted small">
        <Icon size={14} className={`text-${color}`} />
        {label}
      </div>
      <span className={`fw-medium text-${color}`}>{value}</span>
    </div>
  );
}

export default function PricingCalculation({ originCity, destinationCity, category, weight, result }) {
  const hasRoute = originCity && destinationCity;

  if (!result) {
    return (
      <div className="bg-white border rounded-3 p-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <Calculator size={16} className="text-muted" /> Calcul du prix
        </h6>
        {!hasRoute ? (
          <div className="text-center py-4">
            <Calculator size={32} className="text-muted mb-2 mx-auto" />
            <div className="text-muted small">Sélectionnez une ville de départ et une destination pour calculer le prix</div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="spinner-border text-primary spinner-border-sm" role="status" />
            <div className="text-muted small mt-2">Calcul en cours...</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-3 p-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
        <Calculator size={16} className="text-muted" /> Calcul du prix
      </h6>
      <div className="bg-light rounded-2 p-3 mb-3">
        <div className="d-flex justify-content-between small text-muted mb-1">
          <span>{originCity} → {destinationCity}</span>
          <span>{weight} kg</span>
        </div>
        {category && <div className="badge bg-primary-subtle text-primary mt-1">{category}</div>}
      </div>
      <CalculationRow icon={Truck} label="Transport" value={`${(result.transportAmount || 0).toLocaleString('fr-FR')} FC`} color="primary" />
      <CalculationRow icon={Shield} label="Assurance" value={`${(result.insuranceAmount || 0).toLocaleString('fr-FR')} FC`} color="info" />
      <CalculationRow icon={Plus} label="Frais additionnels" value={`${(result.additionalFee || 0).toLocaleString('fr-FR')} FC`} color="warning" />
      <hr className="my-2" />
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold d-flex align-items-center gap-2"><DollarSign size={14} className="text-success" /> Total</span>
        <span className="fw-bold text-success fs-5">{(result.total || 0).toLocaleString('fr-FR')} FC</span>
      </div>
    </div>
  );
}
