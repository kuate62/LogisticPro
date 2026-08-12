import { useState } from 'react';
import { Search, Loader2, PackageSearch, Truck, MapPin, Calendar } from 'lucide-react';
import { useClientTracking } from '../../../hooks/useClientTracking';
import { TrackingTimeline, TrackingHistory, ClientStatusBadge } from '../../../components/client';
import { formatDate, formatDateTime } from '../../../utils/format';

export default function TrackingPage() {
  const { result, loading, error, searched, lastQuery, track, reset } = useClientTracking();
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    track(query);
  };

  const handleReset = () => {
    setQuery('');
    reset();
  };

  return (
    <div className="client-tracking-page">
      <div className="client-tracking-hero">
        <h1>Suivi de colis</h1>
        <p>
          Suivez votre expédition en temps réel. Saisissez votre numéro de suivi ci-dessous.
        </p>

        <form className="client-tracking-search" onSubmit={onSubmit}>
          <div className="client-tracking-search__input">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex : LP-6001"
              aria-label="Numéro de suivi"
            />
          </div>
          <button type="submit" className="client-btn-primary" disabled={loading}>
            {loading ? <Loader2 size={16} className="client-spinner" /> : 'Suivre'}
          </button>
        </form>

        {error && <p className="client-tracking-hero__error">{error}</p>}
      </div>

      {loading && (
        <div className="client-tracking-loading">
          <div className="ag-loading__spinner" />
          <p>Recherche du colis...</p>
        </div>
      )}

      {!loading && searched && !result && !error && (
        <div className="ag-card">
          <div className="ag-card__body">
            <div className="client-tracking-notfound">
              <PackageSearch size={40} />
              <h3>Aucun colis trouvé</h3>
              <p>
                Aucun colis ne correspond au numéro <strong>{lastQuery}</strong>. Vérifiez le numéro saisi ou
                contactez votre agence.
              </p>
              <button type="button" className="client-btn-secondary" onClick={handleReset}>
                Nouvelle recherche
              </button>
            </div>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="client-tracking-result">
          <div className="client-tracking-result__head">
            <div>
              <span className="client-reference">{result.parcel.trackingNumber}</span>
              <ClientStatusBadge status={result.parcel.status} />
            </div>
            <span className="client-detail-meta">
              Dernière mise à jour : {formatDateTime(result.parcel.updatedAt)}
            </span>
          </div>

          <div className="client-tracking-summary">
            <div className="client-tracking-summary__item">
              <Truck size={18} />
              <span className="client-tracking-summary__label">Origine</span>
              <span className="client-tracking-summary__value">{result.originAgency?.name || result.shipment?.origin || '—'}</span>
            </div>
            <div className="client-tracking-summary__item">
              <MapPin size={18} />
              <span className="client-tracking-summary__label">Destination</span>
              <span className="client-tracking-summary__value">{result.currentAgency?.name || result.shipment?.destination || '—'}</span>
            </div>
            <div className="client-tracking-summary__item">
              <Calendar size={18} />
              <span className="client-tracking-summary__label">Livraison estimée</span>
              <span className="client-tracking-summary__value">{formatDate(result.estimatedDeliveryDate)}</span>
            </div>
          </div>

          <div className="ag-card">
            <div className="ag-card__header">
              <h3 className="ag-card__title">Progression</h3>
            </div>
            <div className="ag-card__body">
              <TrackingTimeline status={result.parcel.status} />
              <div className="client-tracking-next">
                <strong>Prochaine étape :</strong> {result.nextStep?.label} — {result.nextStep?.description}
              </div>
            </div>
          </div>

          <div className="ag-card">
            <div className="ag-card__header">
              <h3 className="ag-card__title">Historique de suivi</h3>
              <button type="button" className="client-btn-secondary" onClick={handleReset}>
                Nouvelle recherche
              </button>
            </div>
            <div className="ag-card__body" style={{ padding: 0 }}>
              <TrackingHistory history={result.history} formatDateTime={formatDateTime} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
