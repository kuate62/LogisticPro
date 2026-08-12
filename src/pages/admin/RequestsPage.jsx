import { useState, useEffect, useMemo } from 'react';
import { Inbox, Search, Check, X, Building2, Mail, Phone, MapPin, Calendar, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/admin/PageHeader';
import EmptyState from '../../components/admin/EmptyState';
import LoadingState from '../../components/admin/LoadingState';
import { useRequests } from '../../hooks/useAdmin';
import './RequestsPage.css';

const STATUS_TABS = [
  { value: 'all', label: 'Toutes' },
  { value: 'pending', label: 'En attente' },
  { value: 'approved', label: 'Approuvées' },
  { value: 'rejected', label: 'Rejetées' },
];

const STATUS_META = {
  pending: { label: 'En attente', className: 'lp-req__badge--pending' },
  approved: { label: 'Approuvée', className: 'lp-req__badge--approved' },
  rejected: { label: 'Rejetée', className: 'lp-req__badge--rejected' },
};

const PLAN_LABELS = { free: 'Gratuit', starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function RequestsPage() {
  const { requests, loading, error, fetchRequests, reviewRequest } = useRequests();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filtered = useMemo(() => {
    let list = requests || [];
    if (filter !== 'all') list = list.filter((r) => r.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          `${r.companyName || ''} ${r.contactName || ''} ${r.email || ''} ${r.city || ''} ${r.reference || ''}`
            .toLowerCase()
            .includes(q)
      );
    }
    return list;
  }, [requests, filter, search]);

  const pendingCount = (requests || []).filter((r) => r.status === 'pending').length;

  const handleApprove = async (req) => {
    setSubmitting(true);
    try {
      await reviewRequest(req.id, 'approve');
      toast.success(`Demande ${req.companyName} approuvée`);
    } catch {
      toast.error('Erreur lors de l\'approbation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejecting) return;
    setSubmitting(true);
    try {
      await reviewRequest(rejecting.id, 'reject', rejectReason);
      toast.success(`Demande ${rejecting.companyName} rejetée`);
      setRejecting(null);
      setRejectReason('');
    } catch {
      toast.error('Erreur lors du rejet');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lp-req">
      <PageHeader
        title="Demandes de partenariat"
        subtitle={`${pendingCount} demande(s) en attente · ${requests?.length || 0} au total`}
        actions={[
          { label: 'Actualiser', icon: RefreshCw, variant: 'secondary', onClick: fetchRequests },
        ]}
      />

      <div className="lp-req__toolbar">
        <div className="lp-req__tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              className={`lp-req__tab ${filter === tab.value ? 'lp-req__tab--active' : ''}`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span className="lp-req__tab-count">
                  {(requests || []).filter((r) => r.status === tab.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="lp-req__search">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher entreprise, contact, ville, référence..."
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Chargement des demandes..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Aucune demande"
          message="Aucune demande de partenariat ne correspond à ces critères."
        />
      ) : (
        <div className="lp-req__list">
          {filtered.map((req) => {
            const meta = STATUS_META[req.status] || STATUS_META.pending;
            const isExpanded = expandedId === req.id;
            return (
              <div key={req.id} className={`lp-req__card${isExpanded ? ' lp-req__card--expanded' : ''}`}>
                <button
                  type="button"
                  className="lp-req__card-main"
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                >
                  <div className="lp-req__card-identity">
                    <div className="lp-req__card-icon"><Building2 size={20} /></div>
                    <div className="lp-req__card-titles">
                      <h4 className="lp-req__card-name">{req.companyName}</h4>
                      <span className="lp-req__card-meta">
                        {req.reference && <>{req.reference} · </>}
                        {req.contactName} · {req.city || '—'}
                      </span>
                    </div>
                  </div>
                  <div className="lp-req__card-plan">{PLAN_LABELS[req.plan] || req.plan || 'Gratuit'}</div>
                  <div className="lp-req__card-right">
                    <span className={`lp-req__badge ${meta.className}`}>{meta.label}</span>
                    <span className="lp-req__card-date">{formatDate(req.createdAt)}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="lp-req__detail">
                    <div className="lp-req__detail-grid">
                      <div className="lp-req__detail-item">
                        <span className="lp-req__detail-label">Société</span>
                        <span className="lp-req__detail-value">
                          {req.companyName}{req.companySigle ? ` (${req.companySigle})` : ''}
                        </span>
                      </div>
                      <div className="lp-req__detail-item">
                        <span className="lp-req__detail-label">RCCM / Contribuable</span>
                        <span className="lp-req__detail-value">{req.siret || '—'}</span>
                      </div>
                      <div className="lp-req__detail-item">
                        <span className="lp-req__detail-label">Responsable</span>
                        <span className="lp-req__detail-value">{req.contactName || '—'} {req.managerRole ? `· ${req.managerRole}` : ''}</span>
                      </div>
                      <div className="lp-req__detail-item">
                        <span className="lp-req__detail-label">Plan souhaité</span>
                        <span className="lp-req__detail-value">{PLAN_LABELS[req.plan] || req.plan || 'Gratuit'}</span>
                      </div>
                    </div>

                    <div className="lp-req__detail-contact">
                      <span><Mail size={14} /> {req.email || '—'}</span>
                      <span><Phone size={14} /> {req.phone || '—'}</span>
                      <span><MapPin size={14} /> {[req.address, req.city, req.region, req.country].filter(Boolean).join(', ') || '—'}</span>
                      <span><Calendar size={14} /> Déposée le {formatDate(req.createdAt)}</span>
                    </div>

                    {(req.message || req.website || req.agencyCount || req.employeeCount || req.source) && (
                      <div className="lp-req__detail-message">
                        {req.message && <p className="lp-req__detail-desc">{req.message}</p>}
                        <div className="lp-req__detail-tags">
                          {req.website && <span className="lp-req__detail-tag">Site : {req.website}</span>}
                          {req.agencyCount && <span className="lp-req__detail-tag">Agences : {req.agencyCount}</span>}
                          {req.employeeCount && <span className="lp-req__detail-tag">Employés : {req.employeeCount}</span>}
                          {req.source && <span className="lp-req__detail-tag">Source : {req.source}</span>}
                        </div>
                      </div>
                    )}

                    {req.status === 'rejected' && req.rejectionReason && (
                      <div className="lp-req__detail-reason">
                        Motif du rejet : {req.rejectionReason}
                      </div>
                    )}

                    {req.status === 'pending' && (
                      <div className="lp-req__actions">
                        <button
                          type="button"
                          className="lp-req__btn lp-req__btn--approve"
                          disabled={submitting}
                          onClick={() => handleApprove(req)}
                        >
                          <Check size={16} /> Approuver
                        </button>
                        <button
                          type="button"
                          className="lp-req__btn lp-req__btn--reject"
                          disabled={submitting}
                          onClick={() => { setRejecting(req); setRejectReason(''); }}
                        >
                          <X size={16} /> Rejeter
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {rejecting && (
        <div className="lp-req__modal-backdrop" onClick={() => !submitting && setRejecting(null)}>
          <div className="lp-req__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="lp-req__modal-title">Rejeter la demande</h3>
            <p className="lp-req__modal-subtitle">
              {rejecting.companyName} · {rejecting.contactName || ''} · {rejecting.email || ''}
            </p>
            <label className="lp-req__modal-label" htmlFor="reject-reason">Motif du rejet (optionnel)</label>
            <textarea
              id="reject-reason"
              className="lp-req__modal-textarea"
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Expliquez à l'entreprise pourquoi sa demande est rejetée..."
            />
            <div className="lp-req__modal-actions">
              <button
                type="button"
                className="lp-req__btn lp-req__btn--ghost"
                disabled={submitting}
                onClick={() => setRejecting(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="lp-req__btn lp-req__btn--reject"
                disabled={submitting}
                onClick={handleReject}
              >
                {submitting ? 'Traitement...' : 'Confirmer le rejet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
