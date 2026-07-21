import { Truck, Package, Clock, CheckCircle, AlertTriangle, XCircle, DollarSign, Weight } from 'lucide-react';

export default function ShipmentStatistics({ statistics, loading }) {
  if (loading) return <div className="row g-3">{[1, 2, 3, 4].map((i) => <div key={i} className="col-md-3"><div className="bg-white rounded-3 shadow-sm p-4"><div className="bg-secondary bg-opacity-25 rounded" style={{ height: 56 }} /></div></div>)}</div>;
  if (!statistics) return null;

  const cards = [
    { icon: Truck, label: 'Total', value: statistics.total, color: 'primary' },
    { icon: Clock, label: 'En attente', value: statistics.pending, color: 'warning' },
    { icon: AlertTriangle, label: 'En transport', value: statistics.inTransit, color: 'info' },
    { icon: CheckCircle, label: 'Livrées', value: statistics.delivered, color: 'success' },
    { icon: XCircle, label: 'Annulées', value: statistics.cancelled, color: 'danger' },
    { icon: Package, label: 'Total colis', value: statistics.totalPackages, color: 'primary' },
    { icon: Weight, label: 'Poids total', value: `${statistics.totalWeight} kg`, color: 'secondary' },
    { icon: DollarSign, label: 'Revenu', value: `${(statistics.totalRevenue || 0).toLocaleString('fr-FR')} FC`, color: 'success' },
  ];

  return (
    <div className="row g-3">
      {cards.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="col-md-3 col-6">
          <div className="bg-white rounded-3 shadow-sm p-3 h-100 border-start border-4 border-{color}">
            <div className="d-flex align-items-center gap-2 mb-1"><Icon size={16} className={`text-${color}`} /><span className="text-muted" style={{ fontSize: 12 }}>{label}</span></div>
            <div className="fs-5 fw-bold text-dark">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
