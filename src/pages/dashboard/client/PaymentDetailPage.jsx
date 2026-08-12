import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Wallet, MapPin, Calendar, Receipt } from 'lucide-react';
import { useClientPayment } from '../../../hooks/useClientPayment';
import { PageHeader, ClientStatusBadge, ErrorState } from '../../../components/client';
import { LoadingState } from '../../../components/agent';
import { CLIENT_METHOD_LABELS } from '../../../data/mockClientData';
import { formatCurrency, formatDate, formatDateTime } from '../../../utils/format';

function DetailItem({ label, value }) {
  return (
    <div className="client-detail-item">
      <span className="client-detail-item__label">{label}</span>
      <span className="client-detail-item__value">{value || '—'}</span>
    </div>
  );
}

export default function PaymentDetailPage() {
  const { id } = useParams();
  const { details, loading, error, refresh, clear } = useClientPayment(id);

  if (loading && !details) return <LoadingState />;
  if (error && !details) return <ErrorState message={error} onRetry={refresh} />;

  const { payment, shipment, agency } = details || {};

  return (
    <div>
      <Link to="/dashboard/client/paiements" className="client-back-link" onClick={clear}>
        <ArrowLeft size={16} /> Retour aux paiements
      </Link>

      {payment && (
        <>
          <PageHeader
            title={payment.reference}
            subtitle={payment.description || 'Paiement d\'expédition'}
            actions={<ClientStatusBadge status={payment.status} />}
          />

          <div className="client-payment-hero">
            <span className="client-payment-hero__amount">{formatCurrency(payment.amount)}</span>
            <span className="client-payment-hero__method">
              {CLIENT_METHOD_LABELS[payment.method] || payment.method}
            </span>
          </div>

          <div className="client-shipment-details">
            <div className="client-shipment-details__grid">
              <div className="client-info-card">
                <div className="client-info-card__title">
                  <Receipt size={15} /> Paiement
                </div>
                <DetailItem label="Référence paiement" value={payment.reference} />
                <DetailItem label="Date" value={formatDateTime(payment.date)} />
                <DetailItem label="Méthode" value={CLIENT_METHOD_LABELS[payment.method] || payment.method} />
                <DetailItem label="Statut" value={<ClientStatusBadge status={payment.status} />} />
              </div>
              <div className="client-info-card">
                <div className="client-info-card__title">
                  <Wallet size={15} /> Expédition
                </div>
                <DetailItem label="Référence expédition" value={payment.shipmentReference} />
                <DetailItem label="Trajet" value={shipment ? `${shipment.origin} → ${shipment.destination}` : '—'} />
                <DetailItem label="Montant total" value={shipment ? formatCurrency(shipment.totalAmount) : '—'} />
                <DetailItem label="Montant payé" value={shipment ? formatCurrency(shipment.paidAmount) : '—'} />
              </div>
            </div>

            <div className="client-shipment-details__grid">
              <div className="client-info-card">
                <div className="client-info-card__title">
                  <MapPin size={15} /> Agence
                </div>
                <DetailItem label="Agence" value={agency?.name} />
                <DetailItem label="Ville" value={agency?.city} />
                <DetailItem label="Adresse" value={agency?.address} />
                <DetailItem label="Téléphone" value={agency?.phone} />
              </div>
              <div className="client-info-card">
                <div className="client-info-card__title">
                  <Calendar size={15} /> Chronologie
                </div>
                <DetailItem label="Livraison estimée" value={shipment ? formatDate(shipment.estimatedDeliveryDate) : '—'} />
                <DetailItem label="Date du paiement" value={formatDate(payment.date)} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
