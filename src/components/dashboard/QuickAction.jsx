import { Link } from 'react-router-dom';
import './QuickAction.css';

export function QuickAction({ icon: Icon, label, to, onClick, color = 'primary' }) {
  const content = (
    <div className={`lp-quick-action lp-quick-action--${color}`}>
      <div className={`lp-quick-action__icon lp-quick-action__icon--${color}`}>
        <Icon size={20} />
      </div>
      <span className="lp-quick-action__label">{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="lp-quick-action__link">{content}</Link>;
  }

  return (
    <button className="lp-quick-action__link" onClick={onClick} type="button">
      {content}
    </button>
  );
}

export default QuickAction;
