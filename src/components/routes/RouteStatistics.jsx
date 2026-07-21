import { Route, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function RouteStatistics({ statistics, loading }) {
  if (loading) {
    return (
      <div className="row g-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="col-md-3 col-6">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <div className="bg-secondary bg-opacity-25 rounded" style={{ height: 56 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) return null;

  const cards = [
    { icon: Route, label: 'Total', value: statistics.total, color: 'primary' },
    { icon: Clock, label: 'Planifiés', value: statistics.planned, color: 'warning' },
    { icon: AlertTriangle, label: 'En transport', value: statistics.in_transit, color: 'info' },
    { icon: CheckCircle, label: 'Terminés', value: statistics.completed, color: 'success' },
    { icon: XCircle, label: 'Annulés', value: statistics.cancelled, color: 'danger' },
  ];

  return (
    <div className="row g-3">
      {cards.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="col-md-3 col-6">
          <div className={`bg-white rounded-3 shadow-sm p-3 h-100 border-start border-4 border-${color}`}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <Icon size={16} className={`text-${color}`} />
              <span className="text-muted" style={{ fontSize: 12 }}>{label}</span>
            </div>
            <div className="fs-5 fw-bold text-dark">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
