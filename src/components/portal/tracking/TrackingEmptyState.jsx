import { Package, Search } from 'lucide-react';

export default function TrackingEmptyState({ onSearch }) {
  return (
    <div className="tks-empty">
      <div className="tks-empty__icon">
        <Package size={48} />
      </div>
      <h3>Suivez votre colis en temps réel</h3>
      <p>
        Saisissez votre numéro de suivi pour connaître la position exacte de votre
        expédition, où qu'elle soit au Cameroun.
      </p>
      <div className="tks-empty__examples">
        <span className="tks-empty__example-title">Numéros de test :</span>
        <div className="tks-empty__example-list">
          {['SUI-20260701-001', 'SUI-20260710-002', 'SUI-20260715-003'].map((num) => (
            <button
              key={num}
              className="tks-empty__example"
              onClick={() => onSearch(num)}
              type="button"
            >
              <Search size={12} />
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
