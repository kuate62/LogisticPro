import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Edit2, Power, MapPin, Phone, Mail, Clock,
  Users, Truck, Globe, FileText, History,
  BarChart3, Loader2, Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import useAgencyStore from '../../store/useAgencyStore';
import useAgencyStatistics from '../../hooks/useAgencyStatistics';
import {
  AgencyStatus, AgencyLogo, AgencyStatistics,
} from '../../components/agencies';
import {
  formatAgencyPhone, formatAgencyDate, formatAgencyCurrency,
  formatAgencyAddress, formatAgencySchedule,
} from '../../helpers/agencyFormatters';
import { PACKAGE_STATUS_LABELS } from '../../config/constants';
import './AgencyDetailPage.css';

const TABS = [
  { key: 'info', label: 'Informations', icon: Globe },
  { key: 'stats', label: 'Statistiques', icon: BarChart3 },
  { key: 'employees', label: 'Employés', icon: Users },
  { key: 'shipments', label: 'Expéditions', icon: Truck },
  { key: 'history', label: 'Historique', icon: History },
  { key: 'docs', label: 'Documents', icon: FileText },
];

export function AgencyDetailPage() {
  const { id } = useParams();
  const { companyId } = useAuth();
  const {
    selectedAgency, loading, agencyEmployees, agencyShipments,
    agencyHistory, agencyDocuments,
    fetchAgencyDetail, fetchAgencyEmployees, fetchAgencyShipments,
    fetchAgencyHistory, fetchAgencyDocuments, toggleAgencyStatus, clearSelected,
  } = useAgencyStore();

  const { stats, loading: statsLoading } = useAgencyStatistics(id);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchAgencyDetail(companyId, id);
    return () => clearSelected();
  }, [companyId, id, fetchAgencyDetail, clearSelected]);

  useEffect(() => {
    if (!selectedAgency) return;
    if (activeTab === 'employees') fetchAgencyEmployees(companyId, id);
    if (activeTab === 'shipments') fetchAgencyShipments(companyId, id);
    if (activeTab === 'history') fetchAgencyHistory(companyId, id);
    if (activeTab === 'docs') fetchAgencyDocuments(companyId, id);
  }, [activeTab, companyId, id, selectedAgency, fetchAgencyEmployees, fetchAgencyShipments, fetchAgencyHistory, fetchAgencyDocuments]);

  const handleToggle = async () => {
    try {
      const result = await toggleAgencyStatus(companyId, id);
      const label = result.status === 'active' ? 'réactivée' : 'désactivée';
      toast.success(`Agence ${label}`);
    } catch {
      toast.error('Erreur lors du changement de statut');
    }
  };

  if (loading.detail) {
    return (
      <div className="lp-detail-page">
        <div className="lp-detail-page__loading">
          <Loader2 size={32} className="lp-detail-spinner" />
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  if (!selectedAgency) {
    return (
      <div className="lp-detail-page">
        <div className="lp-detail-page__error">Agence non trouvée</div>
      </div>
    );
  }

  const agency = selectedAgency;
  const schedule = formatAgencySchedule(agency.schedule);

  return (
    <div className="lp-detail-page">
      <div className="lp-detail-page__header">
        <Link to="/agencies" className="lp-detail-page__back">
          <ArrowLeft size={18} /> Agences
        </Link>
      </div>

      <div className="lp-detail-hero">
        <AgencyLogo agency={agency} size="lg" />
        <div className="lp-detail-hero__info">
          <div className="lp-detail-hero__name-row">
            <h1 className="lp-detail-hero__name">{agency.name}</h1>
            {agency.isPrimary && <Star size={16} className="lp-detail-hero__star" />}
            <AgencyStatus status={agency.status} size="lg" />
          </div>
          <p className="lp-detail-hero__code">{agency.code}</p>
          <div className="lp-detail-hero__meta">
            <span><MapPin size={14} /> {agency.city}, {agency.region}</span>
            <span><Phone size={14} /> {formatAgencyPhone(agency.phone)}</span>
            <span><Mail size={14} /> {agency.email}</span>
          </div>
        </div>
        <div className="lp-detail-hero__actions">
          <Link to={`/agencies/${id}/edit`} className="lp-detail-hero__btn lp-detail-hero__btn--edit">
            <Edit2 size={16} /> Modifier
          </Link>
          <button
            className={`lp-detail-hero__btn ${agency.status === 'active' ? 'lp-detail-hero__btn--danger' : 'lp-detail-hero__btn--success'}`}
            onClick={handleToggle}
            type="button"
          >
            <Power size={16} /> {agency.status === 'active' ? 'Désactiver' : 'Réactiver'}
          </button>
        </div>
      </div>

      <div className="lp-detail-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`lp-detail-tab ${activeTab === tab.key ? 'lp-detail-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lp-detail-content">
        {activeTab === 'info' && (
          <div className="lp-detail-grid">
            <div className="lp-detail-card">
              <h3 className="lp-detail-card__title">Informations générales</h3>
              <div className="lp-detail-card__body">
                <DetailRow label="Nom" value={agency.name} />
                <DetailRow label="Code" value={agency.code} mono />
                <DetailRow label="Description" value={agency.description || '—'} />
                <DetailRow label="Adresse" value={formatAgencyAddress(agency)} />
                <DetailRow label="Pays" value={agency.country} />
                <DetailRow label="Agence principale" value={agency.isPrimary ? 'Oui' : 'Non'} />
                <DetailRow label="Créée le" value={formatAgencyDate(agency.createdAt)} />
                <DetailRow label="Dernière MAJ" value={formatAgencyDate(agency.updatedAt)} />
              </div>
            </div>

            <div className="lp-detail-card">
              <h3 className="lp-detail-card__title">Responsable</h3>
              <div className="lp-detail-card__body">
                <DetailRow label="Nom" value={agency.manager?.name || '—'} />
                <DetailRow label="Email" value={agency.manager?.email || '—'} />
                <DetailRow label="Téléphone" value={formatAgencyPhone(agency.manager?.phone)} mono />
              </div>
            </div>

            <div className="lp-detail-card">
              <h3 className="lp-detail-card__title">Coordonnées GPS</h3>
              <div className="lp-detail-card__body">
                <DetailRow label="Latitude" value={agency.latitude ?? '—'} />
                <DetailRow label="Longitude" value={agency.longitude ?? '—'} />
              </div>
            </div>

            <div className="lp-detail-card lp-detail-card--full">
              <h3 className="lp-detail-card__title"><Clock size={16} /> Horaires</h3>
              <div className="lp-detail-schedule">
                {schedule.map((day) => (
                  <div key={day.day} className={`lp-detail-schedule__row ${day.closed ? 'lp-detail-schedule__row--closed' : ''}`}>
                    <span className="lp-detail-schedule__day">{day.day}</span>
                    <span className="lp-detail-schedule__time">
                      {day.closed ? 'Fermé' : `${day.open} — ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <AgencyStatistics stats={stats} loading={statsLoading} />
            {stats && (
              <div className="lp-detail-grid lp-detail-grid--mt">
                <div className="lp-detail-card">
                  <h3 className="lp-detail-card__title">Colis</h3>
                  <div className="lp-detail-card__body">
                    <DetailRow label="Total" value={stats.packages.total} />
                    <DetailRow label="Livrés" value={stats.packages.delivered} />
                    <DetailRow label="En transit" value={stats.packages.inTransit} />
                    <DetailRow label="En attente" value={stats.packages.pending} />
                  </div>
                </div>
                <div className="lp-detail-card">
                  <h3 className="lp-detail-card__title">Revenus</h3>
                  <div className="lp-detail-card__body">
                    <DetailRow label="Total" value={formatAgencyCurrency(stats.revenue.total)} />
                    <DetailRow label="Ce mois" value={formatAgencyCurrency(stats.revenue.thisMonth)} />
                    <DetailRow label="Mois dernier" value={formatAgencyCurrency(stats.revenue.lastMonth)} />
                  </div>
                </div>
                <div className="lp-detail-card">
                  <h3 className="lp-detail-card__title">Expéditions</h3>
                  <div className="lp-detail-card__body">
                    <DetailRow label="Total" value={stats.shipments.total} />
                    <DetailRow label="Terminées" value={stats.shipments.completed} />
                    <DetailRow label="En cours" value={stats.shipments.inProgress} />
                    <DetailRow label="Planifiées" value={stats.shipments.planned} />
                  </div>
                </div>
                <div className="lp-detail-card">
                  <h3 className="lp-detail-card__title">Performance</h3>
                  <div className="lp-detail-card__body">
                    <DetailRow label="Ponctualité" value={`${stats.punctuality}%`} />
                    <DetailRow label="Employés" value={stats.employees} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="lp-detail-card">
            <h3 className="lp-detail-card__title">Employés de l'agence</h3>
            {loading.employees ? (
              <div className="lp-detail-card__loading"><Loader2 size={20} className="lp-detail-spinner" /> Chargement...</div>
            ) : agencyEmployees.length === 0 ? (
              <p className="lp-detail-card__empty">Aucun employé</p>
            ) : (
              <table className="lp-detail-table">
                <thead>
                  <tr><th>Nom</th><th>Rôle</th><th>Téléphone</th><th>Statut</th></tr>
                </thead>
                <tbody>
                  {agencyEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="lp-detail-table__bold">{emp.firstName} {emp.lastName}</td>
                      <td>{emp.role}</td>
                      <td className="lp-detail-table__mono">{formatAgencyPhone(emp.phone)}</td>
                      <td><span className={`lp-detail-badge ${emp.isActive ? 'lp-detail-badge--success' : 'lp-detail-badge--danger'}`}>{emp.isActive ? 'Actif' : 'Inactif'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="lp-detail-card">
            <h3 className="lp-detail-card__title">Expéditions récentes</h3>
            {loading.shipments ? (
              <div className="lp-detail-card__loading"><Loader2 size={20} className="lp-detail-spinner" /> Chargement...</div>
            ) : agencyShipments.length === 0 ? (
              <p className="lp-detail-card__empty">Aucune expédition</p>
            ) : (
              <table className="lp-detail-table">
                <thead>
                  <tr><th>Code</th><th>Destination</th><th>Colis</th><th>Statut</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {agencyShipments.map((s) => (
                    <tr key={s.id}>
                      <td className="lp-detail-table__mono">{s.code}</td>
                      <td>{s.destination}</td>
                      <td>{s.packages}</td>
                      <td><span className="lp-detail-badge lp-detail-badge--info">{PACKAGE_STATUS_LABELS[s.status] || s.status}</span></td>
                      <td>{formatAgencyDate(s.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="lp-detail-card">
            <h3 className="lp-detail-card__title">Historique</h3>
            {loading.history ? (
              <div className="lp-detail-card__loading"><Loader2 size={20} className="lp-detail-spinner" /> Chargement...</div>
            ) : agencyHistory.length === 0 ? (
              <p className="lp-detail-card__empty">Aucun historique</p>
            ) : (
              <div className="lp-detail-timeline">
                {agencyHistory.map((h) => (
                  <div key={h.id} className="lp-detail-timeline__item">
                    <div className="lp-detail-timeline__dot" />
                    <div className="lp-detail-timeline__content">
                      <strong>{h.action}</strong>
                      <p>{h.description}</p>
                      <span>{h.user} — {formatAgencyDate(h.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="lp-detail-card">
            <h3 className="lp-detail-card__title">Documents</h3>
            {loading.documents ? (
              <div className="lp-detail-card__loading"><Loader2 size={20} className="lp-detail-spinner" /> Chargement...</div>
            ) : agencyDocuments.length === 0 ? (
              <p className="lp-detail-card__empty">Aucun document</p>
            ) : (
              <div className="lp-detail-docs">
                {agencyDocuments.map((doc) => (
                  <div key={doc.id} className="lp-detail-docs__item">
                    <FileText size={20} />
                    <div className="lp-detail-docs__info">
                      <span className="lp-detail-docs__name">{doc.name}</span>
                      <span className="lp-detail-docs__meta">{doc.type.toUpperCase()} — {doc.size} — {formatAgencyDate(doc.uploadedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono = false }) {
  return (
    <div className="lp-detail-row">
      <span className="lp-detail-row__label">{label}</span>
      <span className={`lp-detail-row__value ${mono ? 'lp-detail-row__value--mono' : ''}`}>{value}</span>
    </div>
  );
}

export default AgencyDetailPage;
