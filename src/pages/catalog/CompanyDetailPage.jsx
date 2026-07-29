import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Star, ArrowLeft, Package, Globe, Phone, Mail, Users } from 'lucide-react';
import useCompanyCatalogStore from '../../store/useCompanyCatalogStore';
import VerifiedBadge from '../../components/catalog/VerifiedBadge';
import LoadingCompanies from '../../components/catalog/LoadingCompanies';
import './Catalog.css';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const { selectedCompany: company, detailLoading: loading, fetchCompany } = useCompanyCatalogStore();

  useEffect(() => { if (id) fetchCompany(id); }, [id, fetchCompany]);

  if (loading) return <div className="cat-detail"><LoadingCompanies /></div>;
  if (!company) return <div className="cat-detail cat-detail__empty"><p>Entreprise non trouvée.</p><Link to="/entreprises">Retour au catalogue</Link></div>;

  const initials = company.tradeName
    .split(/[\s/-]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

  return (
    <div className="cat-detail">
      <Link to="/entreprises" className="cat-detail__back">
        <ArrowLeft size={16} /> Retour au catalogue
      </Link>

      <div className="cat-detail__card">
        <div className="cat-detail__header">
          <div className="cat-detail__logo" style={{ background: `${company.color}15`, color: company.color }}>
            {initials}
          </div>
          <div className="cat-detail__titles">
            <h1 className="cat-detail__name">
              {company.tradeName}
              {company.verified && <VerifiedBadge size="md" />}
            </h1>
            <p className="cat-detail__full-name">{company.name}</p>
          </div>
        </div>

        <p className="cat-detail__desc">{company.description}</p>

        <div className="cat-detail__tags">
          {company.categories.map((cat) => (
            <span key={cat} className="cat-detail__tag">{cat}</span>
          ))}
        </div>

        <div className="cat-detail__grid">
          <div className="cat-detail__info">
            <h3>Informations</h3>
            <div className="cat-detail__info-row"><MapPin size={16} /><span>{company.address}, {company.city}, {company.country}</span></div>
            <div className="cat-detail__info-row"><Phone size={16} /><span>{company.phone}</span></div>
            <div className="cat-detail__info-row"><Mail size={16} /><span>{company.email}</span></div>
            {company.website && (
              <div className="cat-detail__info-row"><Globe size={16} /><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></div>
            )}
          </div>

          <div className="cat-detail__stats">
            <h3>Statistiques</h3>
            <div className="cat-detail__stat"><Building2 size={16} /><span>{company.agenciesCount} agences</span></div>
            <div className="cat-detail__stat"><Users size={16} /><span>{company.employeesCount} employés</span></div>
            <div className="cat-detail__stat"><Clock size={16} /><span>Temps de réponse : {company.responseTime}</span></div>
            <div className="cat-detail__stat"><Star size={16} className="cat-card__star" /><span>Note : {company.rating}/5</span></div>
          </div>
        </div>

        <div className="cat-detail__badges">
          {company.verified && <span className="cat-card__badge cat-card__badge--verified">Entreprise vérifiée</span>}
          {company.availableToday && <span className="cat-card__badge cat-card__badge--available">Disponible aujourd'hui</span>}
        </div>

        <div className="cat-detail__actions">
          <Link to={`/track?company=${company.id}`} className="cat-card__btn cat-card__btn--primary cat-card__btn--lg">
            <Package size={16} /> Suivre un colis
          </Link>
        </div>
      </div>
    </div>
  );
}
