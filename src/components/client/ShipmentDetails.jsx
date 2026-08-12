import { Package, Wallet, MapPin } from 'lucide-react';
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

function PartyBlock({ title, icon, person, address, phone }) {
  return (
    <div className="client-party">
      <div className="client-party__title">
        {icon}
        <span>{title}</span>
      </div>
      <p className="client-party__name">{person}</p>
      {address && <p className="client-party__sub">{address}</p>}
      {phone && <p className="client-party__sub">{phone}</p>}
    </div>
  );
}

export function ShipmentDetails({ shipment, formatCurrency, formatDate, formatDateTime }) {
  if (!shipment) return null;

  return (
    <div className="client-shipment-details">
      <div className="client-shipment-details__head">
        <div>
          <span className="client-reference">{shipment.reference}</span>
          <span className="client-shipment-details__status">
            <ClientStatusBadge status={shipment.status} />
          </span>
        </div>
        <span className="client-detail-meta">
          Créée le {formatDateTime(shipment.createdAt)}
        </span>
      </div>

      <div className="client-shipment-details__grid">
        <PartyBlock
          title="Expéditeur"
          icon={<MapPin size={15} />}
          person={shipment.expediteur?.name}
          address={shipment.expediteur?.address}
          phone={shipment.expediteur?.phone}
        />
        <PartyBlock
          title="Destinataire"
          icon={<MapPin size={15} />}
          person={shipment.destinataire?.name}
          address={shipment.destinataire?.address}
          phone={shipment.destinataire?.phone}
        />
      </div>

      <div className="client-shipment-details__grid">
        <div className="client-info-card">
          <div className="client-info-card__title">
            <Package size={15} /> Trajet
          </div>
          <DetailItem label="Départ" value={shipment.origin} />
          <DetailItem label="Destination" value={shipment.destination} />
          <DetailItem label="Colis" value={`${shipment.packageCount} colis`} />
          <DetailItem label="Poids total" value={`${shipment.totalWeight} kg`} />
        </div>
        <div className="client-info-card">
          <div className="client-info-card__title">
            <Wallet size={15} /> Paiement
          </div>
          <DetailItem label="Montant total" value={formatCurrency(shipment.totalAmount)} />
          <DetailItem label="Montant payé" value={formatCurrency(shipment.paidAmount)} />
          <DetailItem
            label="Reste à payer"
            value={formatCurrency(shipment.totalAmount - shipment.paidAmount)}
          />
          <DetailItem
            label="Méthode"
            value={CLIENT_METHOD_LABELS[shipment.paymentMethod] || shipment.paymentMethod}
          />
        </div>
      </div>

      <div className="client-shipment-details__footer">
        <DetailItem label="Livraison estimée" value={formatDate(shipment.estimatedDeliveryDate)} />
        {shipment.notes && <DetailItem label="Notes" value={shipment.notes} />}
      </div>
    </div>
  );
}

export default ShipmentDetails;
