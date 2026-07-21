import { Search, X } from 'lucide-react';

export default function RouteSearch({ value, onChange, placeholder = 'Rechercher un trajet...' }) {
  return (
    <div className="position-relative" style={{ maxWidth: 380 }}>
      <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
      <input
        type="text"
        className="form-control ps-5 pe-5 py-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          type="button"
          className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
          onClick={() => onChange({ target: { value: '' } })}
        >
          <X size={14} className="text-muted" />
        </button>
      )}
    </div>
  );
}
