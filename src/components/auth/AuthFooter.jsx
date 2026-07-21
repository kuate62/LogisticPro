import './AuthFooter.css';

export function AuthFooter({ children, className = '' }) {
  return (
    <div className={`lp-auth-footer ${className}`}>
      {children}
    </div>
  );
}

export default AuthFooter;
