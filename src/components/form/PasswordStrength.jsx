import './PasswordStrength.css';

const CRITERIA = [
  { test: (p) => p.length >= 8, label: '8 caractères minimum' },
  { test: (p) => /[A-Z]/.test(p), label: 'Une majuscule' },
  { test: (p) => /[a-z]/.test(p), label: 'Une minuscule' },
  { test: (p) => /\d/.test(p), label: 'Un chiffre' },
  { test: (p) => /[^A-Za-z0-9]/.test(p), label: 'Un caractère spécial' },
];

function getStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  const score = CRITERIA.filter((c) => c.test(password)).length;
  if (score <= 1) return { score, label: 'Faible', color: 'weak' };
  if (score <= 3) return { score, label: 'Moyen', color: 'medium' };
  return { score, label: 'Fort', color: 'strong' };
}

export function PasswordStrength({ password = '' }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="lp-password-strength">
      <div className="lp-password-strength__bar">
        <div
          className={`lp-password-strength__fill lp-password-strength__fill--${color}`}
          style={{ width: `${(score / CRITERIA.length) * 100}%` }}
        />
      </div>
      <div className="lp-password-strength__info">
        <span className={`lp-password-strength__label lp-password-strength__label--${color}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default PasswordStrength;
