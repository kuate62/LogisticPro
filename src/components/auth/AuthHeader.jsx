import './AuthHeader.css';

export function AuthHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`lp-auth-header ${className}`}>
      <h1 className="lp-auth-header__title">{title}</h1>
      {subtitle && <p className="lp-auth-header__subtitle">{subtitle}</p>}
    </div>
  );
}

export default AuthHeader;
