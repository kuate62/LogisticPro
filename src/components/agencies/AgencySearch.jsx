import { Search, X } from 'lucide-react';
import './AgencySearch.css';

export function AgencySearch({ value, onChange, onClear, placeholder = 'Rechercher une agence...' }) {
  return (
    <div className="lp-agency-search">
      <span className="lp-agency-search__icon">
        <Search size={18} />
      </span>
      <input
        type="text"
        className="lp-agency-search__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Rechercher"
      />
      {value && (
        <button
          className="lp-agency-search__clear"
          onClick={onClear}
          type="button"
          aria-label="Effacer la recherche"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default AgencySearch;
