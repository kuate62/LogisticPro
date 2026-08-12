import { RotateCcw } from 'lucide-react';

export function FilterBar({ filters, options, onChange, onReset }) {
  return (
    <div className="ag-filters">
      {Object.entries(options).map(([key, config]) => (
        <select
          key={key}
          className="ag-filters__select"
          value={filters[key] || ''}
          onChange={(e) => onChange({ [key]: e.target.value })}
          aria-label={config.label}
        >
          <option value="">{config.label}</option>
          {config.items.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      ))}
      {onReset && (
        <button className="ag-filters__reset" onClick={onReset} type="button">
          <RotateCcw size={14} /> Réinitialiser
        </button>
      )}
    </div>
  );
}

export default FilterBar;
