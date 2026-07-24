import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Edit, Pause, Play, Archive, Mail, Phone, Globe,
  MapPin, Building2, Users, Package, Truck, Box, HardDrive,
  Calendar, FileText,
} from 'lucide-react';
import StatusBadge from '../../components/admin/StatusBadge';
import StatCard from '../../components/admin/StatCard';
import ConfirmModal from '../../components/admin/ConfirmModal';
import LoadingState from '../../components/admin/LoadingState';
import { useEnterprise, usePlans } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';
import './CompanyDetailPage.css';

const TABS = ['Informations', 'Abonnement', 'Statistiques'];

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enterprise, loading, error, fetch, updateStatus } = useEnterprise(id);
  const { plans, fetchPlans } = usePlans();

  const [activeTab, setActiveTab] = useState('Informations');
  const [showSuspend, setShowSuspend] = useState(false);
  const [showReactivate, setShowReactivate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    fetch(id);
    fetchPlans();
  }, [fetch, fetchPlans, id]);

  const plan = useMemo(() => {
    if (!enterprise || !plans.length) return null;
    return plans.find((p) => p.id === enterprise.planId);
  }, [enterprise, plans]);

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  };

  const formatCurrency = (v) =>
    new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits: 0 }).format(v);

  const handleStatusChange = async (status) => {
    setActing(true);
    try {
      await updateStatus(id, status);
      toast.success(
        status === 'suspended' ? 'Entreprise suspendue' :
        status === 'active' ? 'Entreprise réactivée' :
        'Entreprise archivée'
      );
      setShowSuspend(false);
      setShowReactivate(false);
      setShowArchive(false);
    } catch {
      toast.error('Erreur lors du changement de statut');
    } finally {
      setActing(false);
    }
  };

  if (loading && !enterprise) return <LoadingState />;
  if (error) return <div className="sa-company-detail__error">{error}</div>;
  if (!enterprise) return null;

  return (
    <div className="sa-company-detail">
      <button className="sa-company-detail__back" onClick={() => navigate('/admin/companies')}>
        <ArrowLeft size={18} />
        <span>Retour aux entreprises</span>
      </button>

      <div className="sa-company-detail__header">
        <div className="sa-company-detail__header-info">
          <div className="sa-company-detail__logo">
            {enterprise.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="sa-company-detail__name">{enterprise.name}</h1>
            <span className="sa-company-detail__trade">{enterprise.tradeName}</span>
          </div>
          <StatusBadge status={enterprise.status} />
        </div>
        <div className="sa-company-detail__header-actions">
          <button
            className="sa-company-detail__btn sa-company-detail__btn--edit"
            onClick={() => navigate(`/admin/companies/${id}/edit`)}
          >
            <Edit size={16} />
            Modifier
          </button>
          {enterprise.status === 'active' && (
            <button
              className="sa-company-detail__btn sa-company-detail__btn--suspend"
              onClick={() => setShowSuspend(true)}
            >
              <Pause size={16} />
              Suspendre
            </button>
          )}
          {enterprise.status === 'suspended' && (
            <button
              className="sa-company-detail__btn sa-company-detail__btn--reactivate"
              onClick={() => setShowReactivate(true)}
            >
              <Play size={16} />
              Réactiver
            </button>
          )}
          {enterprise.status !== 'archived' && (
            <button
              className="sa-company-detail__btn sa-company-detail__btn--archive"
              onClick={() => setShowArchive(true)}
            >
              <Archive size={16} />
              Archiver
            </button>
          )}
        </div>
      </div>

      <div className="sa-company-detail__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`sa-company-detail__tab ${activeTab === tab ? 'sa-company-detail__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Informations' && (
        <div className="sa-company-detail__grid">
          <div className="sa-company-detail__card">
            <h3 className="sa-company-detail__card-title">
              <Mail size={16} />
              Coordonnées
            </h3>
            <div className="sa-company-detail__fields">
              <div className="sa-company-detail__field">
                <Mail size={14} />
                <span className="sa-company-detail__field-label">Email</span>
                <span>{enterprise.email}</span>
              </div>
              <div className="sa-company-detail__field">
                <Phone size={14} />
                <span className="sa-company-detail__field-label">Téléphone</span>
                <span>{enterprise.phone}</span>
              </div>
              <div className="sa-company-detail__field">
                <Globe size={14} />
                <span className="sa-company-detail__field-label">Site web</span>
                <span>{enterprise.website || '-'}</span>
              </div>
              <div className="sa-company-detail__field">
                <MapPin size={14} />
                <span className="sa-company-detail__field-label">Ville</span>
                <span>{enterprise.city}</span>
              </div>
              <div className="sa-company-detail__field">
                <MapPin size={14} />
                <span className="sa-company-detail__field-label">Région</span>
                <span>{enterprise.region || '-'}</span>
              </div>
              <div className="sa-company-detail__field">
                <MapPin size={14} />
                <span className="sa-company-detail__field-label">Pays</span>
                <span>{enterprise.country}</span>
              </div>
              <div className="sa-company-detail__field">
                <MapPin size={14} />
                <span className="sa-company-detail__field-label">Adresse</span>
                <span>{enterprise.address}</span>
              </div>
              <div className="sa-company-detail__field">
                <MapPin size={14} />
                <span className="sa-company-detail__field-label">Code postal</span>
                <span>{enterprise.postalCode || '-'}</span>
              </div>
            </div>
          </div>

          <div className="sa-company-detail__card">
            <h3 className="sa-company-detail__card-title">
              <Building2 size={16} />
              Entreprise
            </h3>
            <div className="sa-company-detail__fields">
              <div className="sa-company-detail__field">
                <Building2 size={14} />
                <span className="sa-company-detail__field-label">Nom commercial</span>
                <span>{enterprise.tradeName}</span>
              </div>
              <div className="sa-company-detail__field">
                <FileText size={14} />
                <span className="sa-company-detail__field-label">Description</span>
                <span>{enterprise.description || '-'}</span>
              </div>
              <div className="sa-company-detail__field">
                <Calendar size={14} />
                <span className="sa-company-detail__field-label">Créée le</span>
                <span>{formatDate(enterprise.createdAt)}</span>
              </div>
              <div className="sa-company-detail__field">
                <Calendar size={14} />
                <span className="sa-company-detail__field-label">Modifiée le</span>
                <span>{formatDate(enterprise.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Abonnement' && enterprise.subscription && (
        <div className="sa-company-detail__grid">
          <div className="sa-company-detail__card">
            <h3 className="sa-company-detail__card-title">
              <FileText size={16} />
              Plan actuel
            </h3>
            <div className="sa-company-detail__plan-info">
              <div className="sa-company-detail__plan-name">{plan?.name || enterprise.planId}</div>
              <div className="sa-company-detail__plan-price">
                {formatCurrency(plan?.price || 0)} <small>FCFA/mois</small>
              </div>
              <div className="sa-company-detail__field">
                <span className="sa-company-detail__field-label">Début</span>
                <span>{formatDate(enterprise.subscription.startDate)}</span>
              </div>
              <div className="sa-company-detail__field">
                <span className="sa-company-detail__field-label">Fin</span>
                <span>{formatDate(enterprise.subscription.endDate)}</span>
              </div>
              <div className="sa-company-detail__field">
                <span className="sa-company-detail__field-label">Statut</span>
                <StatusBadge status={enterprise.subscription.status} />
              </div>
            </div>
          </div>

          <div className="sa-company-detail__card">
            <h3 className="sa-company-detail__card-title">
              <HardDrive size={16} />
              Quotas
            </h3>
            <div className="sa-company-detail__quotas">
              {Object.entries(enterprise.quotas).map(([key, quota]) => {
                const labels = { agencies: 'Agences', users: 'Utilisateurs', storage: 'Stockage' };
                const units = { storage: ' Go' };
                const isUnlimited = quota.max === -1;
                const pct = isUnlimited ? 0 : Math.min((quota.used / quota.max) * 100, 100);
                return (
                  <div key={key} className="sa-company-detail__quota">
                    <div className="sa-company-detail__quota-header">
                      <span>{labels[key]}</span>
                      <span>{isUnlimited ? `${quota.used} / ∞` : `${quota.used} / ${quota.max}${units[key] || ''}`}</span>
                    </div>
                    {!isUnlimited && (
                      <div className="sa-company-detail__quota-bar">
                        <div
                          className={`sa-company-detail__quota-fill ${pct >= 90 ? 'sa-company-detail__quota-fill--danger' : pct >= 70 ? 'sa-company-detail__quota-fill--warning' : ''}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Statistiques' && enterprise.stats && (
        <div className="sa-company-detail__stats-grid">
          <StatCard icon={Building2} label="Agences" value={enterprise.stats.agencies} color="primary" />
          <StatCard icon={Users} label="Employés" value={enterprise.stats.employees} color="info" />
          <StatCard icon={Users} label="Clients" value={enterprise.stats.clients} color="success" />
          <StatCard icon={Truck} label="Colis envoyés" value={enterprise.stats.shipments} color="primary" />
          <StatCard icon={Package} label="Colis total" value={enterprise.stats.packages} color="warning" />
          <StatCard icon={Box} label="Volume (m³)" value={enterprise.stats.volume} color="default" />
        </div>
      )}

      <ConfirmModal
        show={showSuspend}
        title="Suspendre l'entreprise"
        message="Êtes-vous sûr de vouloir suspendre cette entreprise ? Son accès sera bloqué."
        confirmLabel={acting ? 'Suspension...' : 'Suspendre'}
        confirmVariant="danger"
        onConfirm={() => handleStatusChange('suspended')}
        onCancel={() => setShowSuspend(false)}
      />

      <ConfirmModal
        show={showReactivate}
        title="Réactiver l'entreprise"
        message="Êtes-vous sûr de vouloir réactiver cette entreprise ?"
        confirmLabel={acting ? 'Réactivation...' : 'Réactiver'}
        confirmVariant="primary"
        onConfirm={() => handleStatusChange('active')}
        onCancel={() => setShowReactivate(false)}
      />

      <ConfirmModal
        show={showArchive}
        title="Archiver l'entreprise"
        message="Cette action est irréversible. L'entreprise sera définitivement archivée."
        confirmLabel={acting ? 'Archivage...' : 'Archiver'}
        confirmVariant="danger"
        onConfirm={() => handleStatusChange('archived')}
        onCancel={() => setShowArchive(false)}
      />
    </div>
  );
}
