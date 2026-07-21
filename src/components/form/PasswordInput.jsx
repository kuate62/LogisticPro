import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../form/TextInput.css';
import './PasswordInput.css';

export const PasswordInput = forwardRef(function PasswordInput({ className = '', ...props }, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`lp-input-group lp-password-input ${className}`}>
      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className="lp-input lp-input--password"
        placeholder="••••••••"
        autoComplete="current-password"
        {...props}
      />
      <button
        type="button"
        className="lp-password-input__toggle"
        onClick={() => setVisible(!visible)}
        tabIndex={-1}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

export default PasswordInput;
