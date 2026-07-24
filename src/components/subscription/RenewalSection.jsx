import { useCallback } from 'react';
import { Repeat, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RenewalSection({ subscription, onToggleAutoRenew, onCancel }) {
  const handleToggle = useCallback(async () => {
    try { await onToggleAutoRenew(); toast.success('Renouvellement automatique modifié'); } catch { toast.error('Erreur'); }
  }, [onToggleAutoRenew]);

  const handleCancel = useCallback(async () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Cette action est irréversible.')) {
      try { await onCancel(); toast.success('Abonnement annulé'); } catch { toast.error('Erreur'); }
    }
  }, [onCancel]);

  if (!subscription) return null;

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
      <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><Repeat size={16} className="text-primary" /> Gestion du renouvellement</h6>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Renouvellement automatique</span>
              <span className={`badge bg-${subscription.autoRenew ? 'success' : 'secondary'}`}>{subscription.autoRenew ? 'Activé' : 'Désactivé'}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Prochaine facturation</span>
              <span className="fw-medium">{subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString('fr-FR') : '—'}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Moyen de paiement</span>
              <span className="fw-medium">{subscription.paymentMethod || '—'}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-md-end gap-2">
          {subscription.status === 'active' && (
            <>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleToggle}>
                {subscription.autoRenew ? 'Désactiver renouvellement' : 'Activer renouvellement'}
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={handleCancel}>
                <XCircle size={14} /> Annuler l'abonnement
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
