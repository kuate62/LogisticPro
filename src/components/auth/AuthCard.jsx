import './AuthCard.css';

export function AuthCard({ children, className = '' }) {
  return (
    <div className={`lp-auth-card ${className}`}>
      {children}
    </div>
  );
}

export default AuthCard;
