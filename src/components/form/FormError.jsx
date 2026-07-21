import './FormError.css';

export function FormError({ message, className = '' }) {
  if (!message) return null;
  return (
    <div className={`lp-form-error ${className}`} role="alert">
      <p className="lp-form-error__text">{message}</p>
    </div>
  );
}

export default FormError;
