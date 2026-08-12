import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Rechercher...' }) {
  return (
    <div className="ag-search">
      <Search size={16} className="ag-search__icon" />
      <input
        className="ag-search__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button className="ag-search__clear" onClick={() => onChange('')} type="button" aria-label="Effacer la recherche">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
