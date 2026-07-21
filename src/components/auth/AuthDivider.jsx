import './AuthDivider.css';

export function AuthDivider({ text = 'ou' }) {
  return (
    <div className="lp-auth-divider">
      <div className="lp-auth-divider__line" />
      <span className="lp-auth-divider__text">{text}</span>
      <div className="lp-auth-divider__line" />
    </div>
  );
}

export default AuthDivider;
