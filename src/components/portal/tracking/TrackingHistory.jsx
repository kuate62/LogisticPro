import { Clock, Trash2 } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

export default function TrackingHistory({ history = [], onSelect, onClear }) {
  if (!history.length) return null;

  return (
    <div className="tks-history">
      <div className="tks-history__header">
        <h4>
          <Clock size={16} />
          Recherches récentes
        </h4>
        <button className="tks-history__clear" onClick={onClear} type="button">
          <Trash2 size={14} />
          Effacer
        </button>
      </div>
      <div className="tks-history__list">
        {history.map((item) => (
          <button
            key={item.trackingNumber}
            className="tks-history__item"
            onClick={() => onSelect(item.trackingNumber)}
            type="button"
          >
            <span className="tks-history__number">{item.trackingNumber}</span>
            {item.status && <TrackingStatusBadge status={item.status} size="sm" />}
            <span className="tks-history__date">
              {new Date(item.searchedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
