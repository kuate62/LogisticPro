import { Building2, Users, HardDrive, Truck } from 'lucide-react';

function QuotaBar({ icon: Icon, label, used, max, unit }) {
  const isUnlimited = max === -1 || max === null;
  const pct = isUnlimited ? 0 : Math.min(100, Math.round((used / max) * 100));
  const barColor = pct > 90 ? 'danger' : pct > 70 ? 'warning' : 'success';

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
          <Icon size={18} className="text-primary" />
        </div>
        <div className="fw-semibold small">{label}</div>
      </div>
      <div className="mb-2">
        <span className="fs-4 fw-bold">{used}</span>
        <span className="text-muted small"> / {isUnlimited ? 'Illimité' : max}{unit ? ` ${unit}` : ''}</span>
      </div>
      {!isUnlimited && (
        <>
          <div className="progress mb-1" style={{ height: 6 }}>
            <div className={`progress-bar bg-${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="text-muted" style={{ fontSize: 11 }}>{pct}% utilisé</div>
        </>
      )}
      {isUnlimited && <div className="text-muted" style={{ fontSize: 11 }}>Illimité</div>}
    </div>
  );
}

export default function QuotaUsage({ quotas }) {
  if (!quotas) return null;

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6 col-lg-3">
        <QuotaBar icon={Building2} label="Agences" used={quotas.agencies?.used || 0} max={quotas.agencies?.max ?? -1} />
      </div>
      <div className="col-md-6 col-lg-3">
        <QuotaBar icon={Users} label="Utilisateurs" used={quotas.users?.used || 0} max={quotas.users?.max ?? -1} />
      </div>
      <div className="col-md-6 col-lg-3">
        <QuotaBar icon={HardDrive} label="Stockage" used={quotas.storage?.used || 0} max={quotas.storage?.max ?? -1} unit={quotas.storage?.unit || 'GB'} />
      </div>
      <div className="col-md-6 col-lg-3">
        <QuotaBar icon={Truck} label="Expéditions" used={quotas.shipments?.used || 0} max={quotas.shipments?.max ?? -1} />
      </div>
    </div>
  );
}
