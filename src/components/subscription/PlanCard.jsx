import { Check, Calendar, CreditCard } from 'lucide-react';
import Badge from 'react-bootstrap/Badge';

const STATUS_MAP = { active: { label: 'Actif', color: 'success' }, expired: { label: 'Expiré', color: 'danger' }, suspended: { label: 'Suspendu', color: 'warning' } };

export default function PlanCard({ plan, subscription }) {
  const statusInfo = STATUS_MAP[subscription?.status] || STATUS_MAP.active;

  return (
    <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4">
      <div className="p-4" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)' }}>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="text-white-50 small mb-1">Plan actuel</div>
            <h3 className="text-white fw-bold mb-1">{plan?.name || '—'}</h3>
            <div className="text-white fs-4 fw-bold">
              {(plan?.price || 0).toLocaleString('fr-FR')} <span className="fs-6 fw-normal">{plan?.currency || 'FCFA'}/{plan?.billingCycle === 'monthly' ? 'mois' : 'an'}</span>
            </div>
          </div>
          <Badge bg={statusInfo.color} className="px-3 py-2 fs-6">{statusInfo.label}</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <h6 className="fw-semibold mb-3">Fonctionnalités incluses</h6>
            <ul className="list-unstyled">
              {(plan?.features || []).map((f, i) => (
                <li key={i} className="d-flex align-items-start gap-2 mb-2 small">
                  <Check size={14} className="text-success mt-1 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h6 className="fw-semibold mb-3">Détails de l'abonnement</h6>
            <div className="small">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted d-flex align-items-center gap-1"><Calendar size={14} /> Date de début</span>
                <span className="fw-medium">{subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString('fr-FR') : '—'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted d-flex align-items-center gap-1"><Calendar size={14} /> Date de fin</span>
                <span className="fw-medium">{subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString('fr-FR') : '—'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted d-flex align-items-center gap-1"><Calendar size={14} /> Prochaine facturation</span>
                <span className="fw-medium">{subscription?.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString('fr-FR') : '—'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted d-flex align-items-center gap-1"><CreditCard size={14} /> Moyen de paiement</span>
                <span className="fw-medium">{subscription?.paymentMethod || '—'}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Renouvellement automatique</span>
                <Badge bg={subscription?.autoRenew ? 'success' : 'secondary'}>{subscription?.autoRenew ? 'Oui' : 'Non'}</Badge>
              </div>
            </div>
            {plan?.description && <p className="text-muted small mt-3 mb-0 fst-italic">{plan.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
