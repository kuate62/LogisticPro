import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Package, MapPin, CreditCard, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usePackage, usePackageForm } from '../../hooks/usePackages';
import PackageStatus from '../../components/packages/PackageStatus';
import PackageTimeline from '../../components/packages/PackageTimeline';
import { PACKAGE_METHOD_LABELS } from '../../config/constants';

const TABS = [
  { key: 'info', label: 'Informations' },
  { key: 'suivi', label: 'Suivi' },
  { key: 'expedition', label: 'Expédition' },
  { key: 'paiement', label: 'Paiement' },
  { key: 'historique', label: 'Historique' },
];

export default function PackageDetailPage() {
  const { id } = useParams();
  const { pkg, loading, history, payments, invoices, fetch, fetchHistory, fetchPayments, fetchInvoices, clearSelected } = usePackage();
  const { cancel, updateStatus } = usePackageForm();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);
  useEffect(() => {
    if (activeTab === 'suivi') fetchHistory(id);
    if (activeTab === 'paiement') fetchPayments(id);
    if (activeTab === 'historique') fetchInvoices(id);
  }, [activeTab, id, fetchHistory, fetchPayments, fetchInvoices]);

  const handleCancel = useCallback(async () => {
    if (window.confirm('Annuler ce colis ?')) {
      try { await cancel(id); toast.success('Colis annulé'); fetch(id); } catch { toast.error('Erreur'); }
    }
  }, [cancel, id, fetch]);

  const handleStatusChange = useCallback(async (newStatus) => {
    try { await updateStatus(id, newStatus); toast.success('Statut mis à jour'); fetch(id); } catch { toast.error('Erreur'); }
  }, [updateStatus, id, fetch]);

  if (loading.detail || !pkg) return <div className="bg-white rounded-3 shadow-sm p-5 text-center"><div className="spinner-border text-primary" role="status" /></div>;

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/packages" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Package size={22} className="text-primary" /> {pkg.trackingCode}
          </h4>
          <div className="d-flex align-items-center gap-2">
            <PackageStatus status={pkg.status} />
            <span className="text-muted small">{new Date(pkg.createdAt).toLocaleString('fr-FR')}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          {['pending', 'registered', 'ready'].includes(pkg.status) && (
            <div className="dropdown">
              <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">Changer statut</button>
              <ul className="dropdown-menu">
                {pkg.status === 'pending' && <li><button className="dropdown-item" onClick={() => handleStatusChange('registered')}>Enregistré</button></li>}
                {pkg.status === 'registered' && <li><button className="dropdown-item" onClick={() => handleStatusChange('ready')}>Prêt</button></li>}
                {pkg.status === 'ready' && <li><button className="dropdown-item" onClick={() => handleStatusChange('in_transit')}>En transit</button></li>}
              </ul>
            </div>
          )}
          {['pending', 'registered', 'ready'].includes(pkg.status) && (
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleCancel}>Annuler</button>
          )}
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        {TABS.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button type="button" className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
          </li>
        ))}
      </ul>

      {activeTab === 'info' && (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
              <h6 className="fw-semibold mb-3">Informations générales</h6>
              <div className="row g-3 small">
                <div className="col-md-6">
                  <div className="text-muted mb-1">Expéditeur</div>
                  <div className="fw-medium">{pkg.senderName}</div>
                  <div>{pkg.senderPhone}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted mb-1">Destinataire</div>
                  <div className="fw-medium">{pkg.receiverName}</div>
                  <div>{pkg.receiverPhone}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted mb-1">Trajet</div>
                  <div className="fw-medium">{pkg.originCity} → {pkg.destinationCity}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted mb-1">Catégorie</div>
                  <div><span className="badge bg-light text-dark">{pkg.category}</span></div>
                </div>
                {pkg.observation && (
                  <div className="col-12">
                    <div className="text-muted mb-1">Observation</div>
                    <div className="fst-italic">"{pkg.observation}"</div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h6 className="fw-semibold mb-3">Détails du colis</h6>
              <div className="row g-3 small">
                <div className="col-md-6">
                  <div className="text-muted mb-1">Libellé</div>
                  <div className="fw-medium">{pkg.label}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted mb-1">Description</div>
                  <div>{pkg.description}</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted mb-1">Poids</div>
                  <div className="fw-medium">{pkg.weight} kg</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted mb-1">Dimensions</div>
                  <div>{pkg.length}×{pkg.width}×{pkg.height} cm</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted mb-1">Valeur déclarée</div>
                  <div>{(pkg.declaredValue || 0).toLocaleString('fr-FR')} FC</div>
                </div>
                <div className="col-md-3">
                  <div className="text-muted mb-1">Fragile / Assuré</div>
                  <div>{pkg.fragile ? '🔋 Oui' : 'Non'} / {pkg.insured ? '🛡️ Oui' : 'Non'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
              <h6 className="fw-semibold mb-3">Poids</h6>
              <div className="progress mb-2" style={{ height: 8 }}>
                <div className="progress-bar bg-primary" style={{ width: `${Math.min(100, (pkg.weight / 50) * 100)}%` }} />
              </div>
              <div className="small text-muted">{pkg.weight} kg</div>
            </div>
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h6 className="fw-semibold mb-3">Tarification</h6>
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Transport</span>
                <span>{(pkg.transportAmount || 0).toLocaleString('fr-FR')} FC</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Assurance</span>
                <span>{(pkg.insuranceAmount || 0).toLocaleString('fr-FR')} FC</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span className="text-primary">{(pkg.totalAmount || 0).toLocaleString('fr-FR')} FC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'suivi' && <PackageTimeline history={history} loading={loading.history} />}

      {activeTab === 'expedition' && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><MapPin size={16} className="text-primary" /> Agence d'origine</h6>
              <div className="small">
                <div className="fw-medium">{pkg.originAgencyName}</div>
                <div className="text-muted">{pkg.originCity}</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><MapPin size={16} className="text-success" /> Agence de destination</h6>
              <div className="small">
                <div className="fw-medium">{pkg.destinationAgencyName}</div>
                <div className="text-muted">{pkg.destinationCity}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'paiement' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><CreditCard size={16} className="text-muted" /> Paiements</h6>
          {payments.length === 0 ? (
            <div className="text-muted small text-center py-4">Aucun paiement enregistré</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr><th>Référence</th><th>Méthode</th><th>Montant</th><th>Statut</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td className="small fw-medium">{p.reference}</td>
                      <td className="small">{PACKAGE_METHOD_LABELS[p.method] || p.method}</td>
                      <td className="small fw-medium">{(p.amount || 0).toLocaleString('fr-FR')} FC</td>
                      <td className="small">
                        <span className={`badge bg-${p.status === 'paid' ? 'success' : 'warning'}`}>{p.status === 'paid' ? 'Payé' : 'En attente'}</span>
                      </td>
                      <td className="small text-muted">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'historique' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2"><FileText size={16} className="text-muted" /> Factures</h6>
          {invoices.length === 0 ? (
            <div className="text-muted small text-center py-4">Aucune facture</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr><th>N° Facture</th><th>Montant HT</th><th>TVA (18%)</th><th>Total TTC</th><th>Statut</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="small fw-medium">{inv.invoiceNumber}</td>
                      <td className="small">{(inv.amount || 0).toLocaleString('fr-FR')} FC</td>
                      <td className="small">{(inv.taxAmount || 0).toLocaleString('fr-FR')} FC</td>
                      <td className="small fw-medium">{(inv.totalAmount || 0).toLocaleString('fr-FR')} FC</td>
                      <td className="small">
                        <span className={`badge bg-${inv.status === 'paid' ? 'success' : 'danger'}`}>{inv.status === 'paid' ? 'Payée' : 'Impayée'}</span>
                      </td>
                      <td className="small text-muted">{new Date(inv.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
