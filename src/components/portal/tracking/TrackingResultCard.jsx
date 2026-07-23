import { Package, MapPin, Calendar, Hash, Weight, Boxes } from 'lucide-react';
import TrackingStatusBadge from './TrackingStatusBadge';

export default function TrackingResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="tks-result">
      <div className="tks-result__header">
        <div className="tks-result__number">
          <Hash size={18} />
          <span>{result.trackingNumber}</span>
        </div>
        <TrackingStatusBadge status={result.status} />
      </div>

      <div className="tks-result__route">
        <div className="tks-result__city">
          <MapPin size={16} />
          <div>
            <small>Ville d'origine</small>
            <strong>{result.originCity}</strong>
          </div>
        </div>
        <div className="tks-result__route-line">
          <div className="tks-result__route-dot tks-result__route-dot--start" />
          <div className="tks-result__route-track" />
          <div className={`tks-result__route-dot ${result.status === 'delivered' ? 'tks-result__route-dot--end' : ''}`} />
        </div>
        <div className="tks-result__city">
          <MapPin size={16} />
          <div>
            <small>Destination</small>
            <strong>{result.destinationCity}</strong>
          </div>
        </div>
      </div>

      <div className="tks-result__meta">
        <div className="tks-result__meta-item">
          <Calendar size={14} />
          <span>Expédié le {new Date(result.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="tks-result__meta-item">
          <Boxes size={14} />
          <span>{result.packageCount} colis{result.packageCount > 1 ? 's' : ''}</span>
        </div>
        <div className="tks-result__meta-item">
          <Weight size={14} />
          <span>{result.totalWeight} kg</span>
        </div>
        {result.estimatedDelivery && (
          <div className="tks-result__meta-item">
            <Package size={14} />
            <span>Livraison prévue le {new Date(result.estimatedDelivery).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        )}
      </div>

      {result.currentAgency && (
        <div className="tks-result__location">
          <Package size={14} />
          <span>Position actuelle : <strong>{result.currentAgency}{result.currentCity ? `, ${result.currentCity}` : ''}</strong></span>
        </div>
      )}
    </div>
  );
}
