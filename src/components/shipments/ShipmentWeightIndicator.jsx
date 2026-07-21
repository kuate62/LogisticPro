import { Package, AlertTriangle } from 'lucide-react';

export default function ShipmentWeightIndicator({ currentWeight, maxWeight }) {
  const pct = maxWeight > 0 ? Math.min((currentWeight / maxWeight) * 100, 100) : 0;
  const remaining = Math.max(0, maxWeight - currentWeight);
  const isFull = remaining <= 0;
  const isWarning = pct >= 80;

  return (
    <div className={`rounded-3 p-3 ${isFull ? 'bg-danger-subtle' : isWarning ? 'bg-warning-subtle' : 'bg-success-subtle'}`}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="small fw-semibold d-flex align-items-center gap-1">
          {isFull ? <AlertTriangle size={14} /> : <Package size={14} />}
          Poids
        </span>
        <span className="small">{currentWeight} / {maxWeight} kg</span>
      </div>
      <div className="progress" style={{ height: 8 }}>
        <div className={`progress-bar ${isFull ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success'}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="d-flex justify-content-between mt-1">
        <span className="text-muted" style={{ fontSize: 11 }}>{pct.toFixed(0)}% utilisé</span>
        <span className={isFull ? 'text-danger fw-semibold' : 'text-muted'} style={{ fontSize: 11 }}>
          {isFull ? 'Capacité atteinte' : `${remaining} kg restant${remaining > 1 ? 's' : ''}`}
        </span>
      </div>
    </div>
  );
}
