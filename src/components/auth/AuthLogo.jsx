import './AuthLogo.css';

export function AuthLogo({ size = 'md' }) {
  return (
    <div className={`lp-auth-logo lp-auth-logo--${size}`}>
      <div className="lp-auth-logo__icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
          <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.6" />
        </svg>
      </div>
      <div className="lp-auth-logo__text">
        <span className="lp-auth-logo__name" style={{ color: 'white'}}>LogisticPro</span>
      </div>
    </div>
  );
}

export default AuthLogo;
