import './FormField.css';

export function FormField({ label, error, helperText, required, children, className = '' }) {
  return (
    <div className={`lp-form-field ${error ? 'lp-form-field--error' : ''} ${className}`}>
      {label && (
        <label className="lp-form-field__label">
          {label}
          {required && <span className="lp-form-field__required">*</span>}
        </label>
      )}
      <div className="lp-form-field__input-wrapper">
        {children}
      </div>
      {error && <p className="lp-form-field__error">{error}</p>}
      {!error && helperText && <p className="lp-form-field__helper">{helperText}</p>}
    </div>
  );
}

export default FormField;
