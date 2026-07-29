import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import useCompanyCatalogStore from '../../store/useCompanyCatalogStore';

export default function CompanySearchBar() {
  const query = useCompanyCatalogStore((s) => s.query);
  const setQuery = useCompanyCatalogStore((s) => s.setQuery);
  const fetchCompanies = useCompanyCatalogStore((s) => s.fetchCompanies);
  const [local, setLocal] = useState(query);
  const timer = useRef(null);

  const handleChange = (value) => {
    setLocal(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setQuery(value); }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);
    setQuery(local);
    fetchCompanies();
  };

  const clear = () => { setLocal(''); setQuery(''); };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <form className="cat-search" onSubmit={handleSubmit} role="search">
      <Search size={18} className="cat-search__icon" />
      <input
        type="text"
        className="cat-search__input"
        placeholder="Rechercher une entreprise..."
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Rechercher une entreprise"
      />
      {local && (
        <button type="button" className="cat-search__clear" onClick={clear} aria-label="Effacer">
          <X size={16} />
        </button>
      )}
    </form>
  );
}
