import './LoadingState.css';

export default function LoadingState({ message = 'Chargement...' }) {
  return (
    <div className="sa-loading-state">
      <div className="sa-loading-state__spinner" />
      {message && <p className="sa-loading-state__message">{message}</p>}
    </div>
  );
}
