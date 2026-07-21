import { Users, UserCheck, UserX, Ban, TrendingUp, Award } from 'lucide-react';

export default function ClientStatistics({ statistics, loading }) {
  if (loading) {
    return (
      <div className="row g-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-4 h-100"><div className="bg-secondary bg-opacity-25 rounded" style={{ width: '60%', height: 16 }} /><div className="bg-secondary bg-opacity-25 rounded mt-2" style={{ width: '40%', height: 28 }} /></div></div>
        ))}
      </div>
    );
  }

  if (!statistics) return null;

  const cards = [
    { icon: Users, label: 'Total clients', value: statistics.total, color: 'primary' },
    { icon: UserCheck, label: 'Clients actifs', value: statistics.active, color: 'success' },
    { icon: UserX, label: 'Inactifs', value: statistics.inactive, color: 'secondary' },
    { icon: Ban, label: 'Bloqués', value: statistics.blocked, color: 'danger' },
  ];

  return (
    <div>
      <div className="row g-3 mb-4">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="col-md-3">
            <div className="bg-white rounded-3 shadow-sm p-4 h-100 border-start border-4 border-{color}">
              <div className="d-flex align-items-center gap-2 mb-2"><Icon size={18} className={`text-${color}`} /><span className="text-muted small">{label}</span></div>
              <div className="fs-3 fw-bold text-dark">{value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="bg-white rounded-3 shadow-sm p-4">
            <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><Award size={16} className="text-warning" /> Top clients</h6>
            {statistics.topClients?.map((c, i) => (
              <div key={c.id} className={`d-flex align-items-center justify-content-between ${i > 0 ? 'border-top pt-2 mt-2' : ''}`}>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-primary rounded-pill">{i + 1}</span>
                  <span className="small fw-medium">{c.name}</span>
                </div>
                <span className="small text-muted">{c.totalSpent?.toLocaleString('fr-FR')} FC</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-white rounded-3 shadow-sm p-4">
            <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><TrendingUp size={16} className="text-success" /> Clients les plus actifs</h6>
            {statistics.mostActive?.map((c, i) => (
              <div key={c.id} className={`d-flex align-items-center justify-content-between ${i > 0 ? 'border-top pt-2 mt-2' : ''}`}>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success rounded-pill">{i + 1}</span>
                  <span className="small fw-medium">{c.name}</span>
                </div>
                <span className="small text-muted">{c.shipments} expé.</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
