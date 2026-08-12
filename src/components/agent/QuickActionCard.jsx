export function QuickActionCard({ icon: Icon, label, hint, color = 'primary', onClick }) {
  return (
    <button className="ag-quick-action" onClick={onClick} type="button">
      <div className={`ag-quick-action__icon ag-quick-action__icon--${color}`}>
        <Icon size={22} />
      </div>
      <span className="ag-quick-action__label">{label}</span>
      {hint && <span className="ag-quick-action__hint">{hint}</span>}
    </button>
  );
}

export default QuickActionCard;
