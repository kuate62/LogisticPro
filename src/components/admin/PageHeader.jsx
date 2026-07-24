import './PageHeader.css';

export default function PageHeader({ title, subtitle, actions = [] }) {
  return (
    <div className="sa-page-header">
      <div className="sa-page-header__text">
        <h1 className="sa-page-header__title">{title}</h1>
        {subtitle && <p className="sa-page-header__subtitle">{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div className="sa-page-header__actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`sa-page-header__btn sa-page-header__btn--${action.variant || 'primary'}`}
              onClick={action.onClick}
            >
              {action.icon && <action.icon size={16} />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
