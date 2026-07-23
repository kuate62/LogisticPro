import { AlertTriangle, RefreshCw, Search } from 'lucide-react';

export default function TrackingErrorState({ error, onRetry, onReset }) {
  return (
    <div className="tks-error">
      <div className="tks-error__icon">
        <AlertTriangle size={48} />
      </div>
      <h3>Colis non trouvé</h3>
      <p className="tks-error__message">{error}</p>
      <div className="tks-error__actions">
        {onRetry && (
          <button className="tks-error__btn tks-error__btn--primary" onClick={onRetry} type="button">
            <RefreshCw size={16} />
            Réessayer
          </button>
        )}
        {onReset && (
          <button className="tks-error__btn tks-error__btn--outline" onClick={onReset} type="button">
            <Search size={16} />
            Nouvelle recherche
          </button>
        )}
      </div>
      <div className="tks-error__help">
        <p>Vérifiez que le numéro est correct. Il doit commencer par <strong>SUI-</strong> ou <strong>EXP-</strong>.</p>
        <p>Si le problème persiste, contactez-nous au <strong>+237 699 123 456</strong></p>
      </div>
    </div>
  );
}
