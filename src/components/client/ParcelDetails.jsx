import { Package, Scale, MapPin, Calendar } from 'lucide-react';
import { ClientStatusBadge } from './ClientStatusBadge';
import { CLIENT_METHOD_LABELS } from '../../data/mockClientData';

function DetailItem({ label, value }) {
  return (
    <div className="client-detail-item">
      <span className="client-detail-item__label">{label}</span>
      <span className="client-detail-item__value">{value || '—'}</span>
    </div>
  );
}

export function ParcelDetails({ parcel, shipment, formatCurrency, formatDate, formatDateTime }) {
  if (!parcel) return null;

  const origin = shipment?.origin || '—';
  const destination = shipment?.destination || parcel.destination || '—';
  const paymentStatus = shipment?.paymentStatus;

  return (
    <div className="client-shipment-details">
      <div className="client-shipment-details__head">
        <div>
          <span className="client-reference">{parcel.trackingNumber}</span>
          <span className="client-shipment-details__status">
            <ClientStatusBadge status={parcel.status} />
          </span>
        </div>
        <span className="client-detail-meta">
          Dernière mise à jour : {formatDateTime(parcel.updatedAt)}
        </span>
      </div>

      <div className="client-shipment-details__grid">
        <div className="client-info-card">
          <div className="client-info-card__title">
            <Package size={15} /> Informations du colis
          </div>
          <DetailItem label="Catégorie" value={parcel.category} />
          <DetailItem label="Description" value={parcel.description} />
          <DetailItem label="Valeur déclarée" value={formatCurrency(parcel.declaredValue)} />
        </div>
        <div className="client-info-card">
          <div className="client-info-card__title">
            <Scale size={15} /> Caractéristiques
          </div>
          <DetailItem label="Poids" value={`${parcel.weight} kg`} />
          <DetailItem label="Dimensions" value={parcel.dimensions ? `${parcel.dimensions.length} × ${parcel.dimensions.width} × ${parcel.dimensions.height} cm` : '—'} />
        </div>
      </div>

      <div className="client-info-card">
        <div className="client-info-card__title">
          <MapPin size={15} /> Trajet
        </div>
        <DetailItem label="Départ" value={origin} />
        <DetailItem label="Destination" value={destination} />
        {parcel.arrivalDate && (
          <DetailItem label="Date d'arrivée" value={formatDate(parcel.arrivalDate)} />
        )}
      </div>

      {shipment && (
        <div className="client-info-card">
          <div className="client-info-card__title">
            <Calendar size={15} /> Expédition associée
          </div>
          <DetailItem label="Référence" value={shipment.reference} />
          <DetailItem label="Livraison estimée" value={formatDate(shipment.estimatedDeliveryDate)} />
          <DetailItem label="Statut paiement" value={paymentStatus ? <ClientStatusBadge status={paymentStatus} /> : '—'} />
          <DetailItem label="Méthode de paiement" value={CLIENT_METHOD_LABELS[shipment.paymentMethod] || shipment.paymentMethod} />
        </div>
      )}
    </div>
  );
}

export default ParcelDetails;
