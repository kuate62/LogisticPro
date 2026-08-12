export function DashboardStatCard({ value, label, icon: Icon, color = 'primary', loading }) {
  if (loading) {
    return (
      <div className="ag-stat-card">
        <div className="ag-loading" style={{ width: '100%', padding: 0 }}>
          <div className="ag-loading__row ag-loading__row--md" />
          <div className="ag-loading__row ag-loading__row--sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="ag-stat-card">
      <div className={`ag-stat-card__icon ag-stat-card__icon--${color}`}>
        <Icon size={22} />
      </div>
      <div className="ag-stat-card__body">
        <div className="ag-stat-card__value">{value}</div>
        <p className="ag-stat-card__label">{label}</p>
      </div>
    </div>
  );
}

export default DashboardStatCard;
