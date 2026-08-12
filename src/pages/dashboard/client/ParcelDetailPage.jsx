import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useClientParcel } from '../../../hooks/useClientParcel';
import { PageHeader, ParcelDetails, TrackingTimeline, TrackingHistory, ClientStatusBadge, ErrorState } from '../../../components/client';
import { LoadingState } from '../../../components/agent';
import { formatCurrency, formatDate, formatDateTime } from '../../../utils/format';

export default function ParcelDetailPage() {
  const { id } = useParams();
  const { parcel, loading, error, refresh, clear } = useClientParcel(id);
  const [showHistory, setShowHistory] = useState(false);

  if (loading && !parcel) return <LoadingState />;
  if (error && !parcel) return <ErrorState message={error} onRetry={refresh} />;

  const shipment = parcel ? parcel.shipment || null : null;
  const history = parcel ? (parcel.tracking || []) : [];

  return (
    <div>
      <Link to="/dashboard/client/colis" className="client-back-link" onClick={clear}>
        <ArrowLeft size={16} /> Retour aux colis
      </Link>

      {parcel && (
        <>
          <PageHeader
            title={parcel.trackingNumber}
            subtitle={`Colis ${parcel.category} · ${parcel.weight} kg`}
            actions={<ClientStatusBadge status={parcel.status} />}
          />

          <div className="ag-card">
            <div className="ag-card__header">
              <h3 className="ag-card__title"><MapPin size={16} /> Progression de la livraison</h3>
            </div>
            <div className="ag-card__body">
              <TrackingTimeline status={parcel.status} />
            </div>
          </div>

          <ParcelDetails
            parcel={parcel}
            shipment={shipment || undefined}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            formatDateTime={formatDateTime}
          />

          <div className="ag-card">
            <div className="ag-card__header">
              <h3 className="ag-card__title">Historique de suivi</h3>
              <button
                type="button"
                className="client-btn-secondary"
                onClick={() => setShowHistory((v) => !v)}
              >
                {showHistory ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <div className="ag-card__body" style={{ padding: 0 }}>
              {showHistory ? (
                <TrackingHistory history={history} formatDateTime={formatDateTime} />
              ) : (
                <div className="ag-empty">
                  <p className="ag-empty__desc">
                    {history.length > 0 ? `${history.length} événement${history.length > 1 ? 's' : ''} enregistré${history.length > 1 ? 's' : ''}` : 'Aucun événement.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
