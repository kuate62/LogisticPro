export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="client-page-header">
      <div className="client-page-header__text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="client-page-header__actions">{actions}</div>}
    </div>
  );
}

export default PageHeader;
