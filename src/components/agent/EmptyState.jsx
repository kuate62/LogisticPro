export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="ag-empty">
      {Icon && (
        <div className="ag-empty__icon">
          <Icon size={28} />
        </div>
      )}
      <h4 className="ag-empty__title">{title}</h4>
      {description && <p className="ag-empty__desc">{description}</p>}
    </div>
  );
}

export default EmptyState;
