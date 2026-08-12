import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Package } from 'lucide-react';
import { useClientShipment } from '../../../hooks/useClientShipment';
import { PageHeader, ShipmentDetails, ClientStatusBadge, ErrorState } from '../../../components/client';
import { LoadingState } from '../../../components/agent';
import { formatCurrency, formatDate, formatDateTime } from '../../../utils/format';

export default function ShipmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipment, parcels, loading, error, refresh, clear } = useClientShipment(id);
  const [viewParcels, setViewParcels] = useState(false);

  return (
    <div>
      <Link to="/dashboard/client/expeditions" className="client-back-link" onClick={clear}>
        <ArrowLeft size={16} /> Retour aux expéditions
      </Link>

      {loading && !shipment ? <LoadingState /> : null}
      {error && !shipment ? <ErrorState message={error} onRetry={refresh} /> : null}

      {shipment && (
        <>
          <PageHeader
            title={shipment.reference}
            subtitle={`Expédition ${shipment.origin} → ${shipment.destination}`}
            actions={<ClientStatusBadge status={shipment.status} />}
          />

          <ShipmentDetails
            shipment={shipment}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            formatDateTime={formatDateTime}
          />

          <div className="ag-card">
            <div className="ag-card__header">
              <h3 className="ag-card__title"><Package size={16} /> Colis inclus ({parcels.length})</h3>
              <button
                type="button"
                className="client-btn-secondary"
                onClick={() => setViewParcels((v) => !v)}
              >
                {viewParcels ? 'Réduire' : 'Voir le détail'}
              </button>
            </div>
            <div className="ag-card__body" style={{ padding: 0 }}>
              {parcels.length === 0 ? (
                <div className="ag-empty"><p className="ag-empty__desc">Aucun colis associé.</p></div>
              ) : viewParcels ? (
                <div className="client-parcel-list">
                  {parcels.map((p) => (
                    <div key={p.id} className="client-parcel-row" onClick={() => navigate(`/dashboard/client/colis/${p.id}`)}>
                      <div className="client-parcel-row__info">
                        <span className="client-reference">{p.trackingNumber}</span>
                        <span>{p.category} · {p.weight} kg</span>
                      </div>
                      <ClientStatusBadge status={p.status} />
                      <ChevronRight size={15} className="client-parcel-row__chevron" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="client-parcel-chips">
                  {parcels.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="client-parcel-chip"
                      onClick={() => navigate(`/dashboard/client/colis/${p.id}`)}
                    >
                      {p.trackingNumber}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
