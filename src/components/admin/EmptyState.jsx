import './EmptyState.css';

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="sa-empty-state">
      {Icon && (
        <div className="sa-empty-state__icon">
          <Icon size={48} />
        </div>
      )}
      <h3 className="sa-empty-state__title">{title}</h3>
      {message && <p className="sa-empty-state__message">{message}</p>}
      {action && (
        <button className="sa-empty-state__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
