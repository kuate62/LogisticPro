export default function RouteCapacity({ maxWeight, usedWeight, maxPackages, usedPackages }) {
  const weightPct = maxWeight > 0 ? Math.min((usedWeight / maxWeight) * 100, 100) : 0;
  const packagesPct = maxPackages > 0 ? Math.min((usedPackages / maxPackages) * 100, 100) : 0;
  const weightRemaining = Math.max(0, maxWeight - usedWeight);
  const packagesRemaining = Math.max(0, maxPackages - usedPackages);

  const getBarColor = (pct) => {
    if (pct >= 90) return 'danger';
    if (pct >= 70) return 'warning';
    return 'success';
  };

  return (
    <div className="small">
      <div className="mb-2">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Poids</span>
          <span>{usedWeight} / {maxWeight} kg</span>
        </div>
        <div className="progress" style={{ height: 6 }}>
          <div className={`progress-bar bg-${getBarColor(weightPct)}`} style={{ width: `${weightPct}%` }} />
        </div>
        <div className="text-muted mt-1" style={{ fontSize: 11 }}>{weightRemaining} kg restant{weightRemaining > 1 ? 's' : ''}</div>
      </div>
      <div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Colis</span>
          <span>{usedPackages} / {maxPackages}</span>
        </div>
        <div className="progress" style={{ height: 6 }}>
          <div className={`progress-bar bg-${getBarColor(packagesPct)}`} style={{ width: `${packagesPct}%` }} />
        </div>
        <div className="text-muted mt-1" style={{ fontSize: 11 }}>{packagesRemaining} colis restant{packagesRemaining > 1 ? 's' : ''}</div>
      </div>
    </div>
  );
}
