import './DashboardCard.css';

export function DashboardCard({ title, subtitle, action, children, className = '', loading, empty }) {
  return (
    <div className={`lp-dcard ${className}`}>
      {(title || action) && (
        <div className="lp-dcard__header">
          <div>
            {title && <h3 className="lp-dcard__title">{title}</h3>}
            {subtitle && <p className="lp-dcard__subtitle">{subtitle}</p>}
          </div>
          {action && <div className="lp-dcard__action">{action}</div>}
        </div>
      )}
      <div className="lp-dcard__body">
        {loading && (
          <div className="lp-dcard__loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="lp-dcard__skeleton-row" />
            ))}
          </div>
        )}
        {!loading && empty && (
          <div className="lp-dcard__empty">
            <p className="lp-dcard__empty-text">{empty}</p>
          </div>
        )}
        {!loading && !empty && children}
      </div>
    </div>
  );
}

export default DashboardCard;
