import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './KPICard.css';

export function KPICard({ title, value, icon: Icon, color = 'primary', trend, trendValue, to, loading }) {
  if (loading) {
    return (
      <div className="lp-kpi-card lp-kpi-card--loading">
        <div className="lp-kpi-card__skeleton lp-kpi-card__skeleton--icon" />
        <div className="lp-kpi-card__skeleton lp-kpi-card__skeleton--value" />
        <div className="lp-kpi-card__skeleton lp-kpi-card__skeleton--title" />
      </div>
    );
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendClass = trend === 'up' ? 'lp-kpi-card__trend--up' : trend === 'down' ? 'lp-kpi-card__trend--down' : 'lp-kpi-card__trend--neutral';

  const content = (
    <div className={`lp-kpi-card lp-kpi-card--${color}`}>
      <div className="lp-kpi-card__header">
        <div className={`lp-kpi-card__icon lp-kpi-card__icon--${color}`}>
          <Icon size={20} />
        </div>
        {trendValue !== undefined && (
          <span className={`lp-kpi-card__trend ${trendClass}`}>
            <TrendIcon size={14} />
            {trendValue}
          </span>
        )}
      </div>
      <p className="lp-kpi-card__value">{value}</p>
      <p className="lp-kpi-card__title">{title}</p>
    </div>
  );

  if (to) {
    return <Link to={to} className="lp-kpi-card__link">{content}</Link>;
  }

  return content;
}

export default KPICard;
