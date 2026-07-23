import { useState } from 'react';
import { Search, Hash } from 'lucide-react';

export default function TrackingSearch({ onSearch, loading = false, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className="tks-search" onSubmit={handleSubmit}>
      <div className="tks-search__wrapper">
        <div className="tks-search__icon">
          <Hash size={20} />
        </div>
        <input
          className="tks-search__input"
          type="text"
          placeholder="Ex: SUI-20260701-001"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          disabled={loading}
        />
        <button
          className="tks-search__btn"
          type="submit"
          disabled={loading || !value.trim()}
        >
          {loading ? (
            <span className="tks-search__spinner" />
          ) : (
            <>
              <Search size={18} />
              Suivre
            </>
          )}
        </button>
      </div>
      <p className="tks-search__hint">
        Entrez votre numéro de suivi ou de shipment (commençant par SUI- ou EXP-)
      </p>
    </form>
  );
}
