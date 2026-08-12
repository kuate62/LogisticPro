import './AuthLogo.css';

export function AuthLogo({ size = 'md' }) {
  return (
    <div className={`lp-auth-logo lp-auth-logo--${size}`}>
      <div className="lp-auth-logo__icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#863bff" />
          <g transform="translate(4 3.5)" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
          </g>
        </svg>
      </div>
      <div className="lp-auth-logo__text">
        <span className="lp-auth-logo__name" style={{ color: 'white'}}>LogisticPro</span>
      </div>
    </div>
  );
}

export default AuthLogo;
