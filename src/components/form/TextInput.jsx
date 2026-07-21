import { forwardRef } from 'react';
import './TextInput.css';

export const TextInput = forwardRef(function TextInput(
  { error, className = '', icon: Icon, ...props },
  ref
) {
  return (
    <div className={`lp-input-group ${error ? 'lp-input-group--error' : ''} ${Icon ? 'lp-input-group--icon' : ''} ${className}`}>
      {Icon && (
        <span className="lp-input-group__icon">
          <Icon size={18} />
        </span>
      )}
      <input
        ref={ref}
        type="text"
        className={`lp-input ${Icon ? 'lp-input--has-icon' : ''}`}
        {...props}
      />
    </div>
  );
});

export default TextInput;
