import { Search as SearchIcon, X } from 'lucide-react';
import { DEBOUNCE_DELAY } from '../../config/constants';
import { useRef, useState, useCallback } from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Rechercher...' }) {
  const [local, setLocal] = useState(value);
  const timer = useRef(null);

  const handleChange = useCallback((e) => {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(v), DEBOUNCE_DELAY);
  }, [onChange]);

  const handleClear = () => { setLocal(''); onChange(''); };

  return (
    <div className="position-relative" style={{ maxWidth: 340 }}>
      <SearchIcon size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
      <input
        type="text"
        className="form-control ps-5 pe-5 py-2"
        placeholder={placeholder}
        value={local}
        onChange={handleChange}
      />
      {local && (
        <button type="button" className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent" onClick={handleClear}>
          <X size={14} className="text-muted" />
        </button>
      )}
    </div>
  );
}
