import { forwardRef } from 'react';
import '../form/TextInput.css';

export const EmailInput = forwardRef(function EmailInput({ className = '', ...props }, ref) {
  return (
    <div className={`lp-input-group ${className}`}>
      <input
        ref={ref}
        type="email"
        className="lp-input"
        placeholder="exemple@email.com"
        autoComplete="email"
        {...props}
      />
    </div>
  );
});

export default EmailInput;
