import { Package, Truck, Users, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { formatAgencyCurrency } from '../../helpers/agencyFormatters';
import './AgencyStatistics.css';

export function AgencyStatistics({ stats, loading }) {
  if (loading) {
    return (
      <div className="lp-agency-stats">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="lp-agency-stats__card lp-agency-stats__card--loading">
            <div className="lp-agency-stats__skeleton-icon" />
            <div className="lp-agency-stats__skeleton-value" />
            <div className="lp-agency-stats__skeleton-label" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    { icon: Package, label: 'Total colis', value: stats.packages.total, color: '#2563EB' },
    { icon: Truck, label: 'Expéditions', value: stats.shipments.total, color: '#7C3AED' },
    { icon: Users, label: 'Employés', value: stats.employees, color: '#0EA5E9' },
    { icon: TrendingUp, label: 'Ponctualité', value: `${stats.punctuality}%`, color: '#16A34A' },
    { icon: Clock, label: 'En transit', value: stats.packages.inTransit, color: '#F59E0B' },
    { icon: DollarSign, label: 'Revenu total', value: formatAgencyCurrency(stats.revenue.total), color: '#16A34A' },
  ];

  return (
    <div className="lp-agency-stats">
      {cards.map((card) => (
        <div key={card.label} className="lp-agency-stats__card">
          <div className="lp-agency-stats__icon" style={{ backgroundColor: card.color + '15', color: card.color }}>
            <card.icon size={20} />
          </div>
          <span className="lp-agency-stats__value">{card.value}</span>
          <span className="lp-agency-stats__label">{card.label}</span>
        </div>
      ))}
    </div>
  );
}

export default AgencyStatistics;
