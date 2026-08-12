import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorState({ message = 'Une erreur est survenue.', onRetry }) {
  return (
    <div className="client-error" role="alert">
      <AlertTriangle size={28} color="var(--color-danger)" />
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="client-error__retry" onClick={onRetry}>
          <RefreshCw size={14} /> Réessayer
        </button>
      )}
    </div>
  );
}

export default ErrorState;
