import './FormSuccess.css';

export function FormSuccess({ message, className = '' }) {
  if (!message) return null;
  return (
    <div className={`lp-form-success ${className}`} role="status">
      <p className="lp-form-success__text">{message}</p>
    </div>
  );
}

export default FormSuccess;
