import './StatCard.css';

export default function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  return (
    <div className={`sa-stat-card sa-stat-card--${color}`}>
      <div className="sa-stat-card__icon">
        {Icon && <Icon size={24} />}
      </div>
      <div className="sa-stat-card__content">
        <span className="sa-stat-card__value">{value}</span>
        <span className="sa-stat-card__label">{label}</span>
      </div>
    </div>
  );
}
