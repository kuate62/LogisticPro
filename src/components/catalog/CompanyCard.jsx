import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Star, ArrowRight, Package } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

export default function CompanyCard({ company }) {
  const initials = company.tradeName
    .split(/[\s/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <article className="cat-card">
      <div className="cat-card__header">
        <div className="cat-card__logo" style={{ background: `${company.color}12`, color: company.color }}>
          {initials}
        </div>
        <div className="cat-card__titles">
          <h3 className="cat-card__name">
            {company.tradeName}
            {company.verified && <VerifiedBadge size="sm" />}
          </h3>
          <p className="cat-card__full-name">{company.name}</p>
        </div>
      </div>

      <p className="cat-card__desc">{company.description}</p>

      <div className="cat-card__tags">
        {company.categories.slice(0, 2).map((cat) => (
          <span key={cat} className="cat-card__tag">{cat}</span>
        ))}
        {company.categories.length > 2 && (
          <span className="cat-card__tag cat-card__tag--muted">+{company.categories.length - 2}</span>
        )}
      </div>

      <div className="cat-card__meta">
        <span className="cat-card__meta-item">
          <MapPin size={14} /> {company.city}
        </span>
        <span className="cat-card__meta-item">
          <Building2 size={14} /> {company.agenciesCount} agences
        </span>
        <span className="cat-card__meta-item">
          <Clock size={14} /> {company.responseTime}
        </span>
        <span className="cat-card__meta-item">
          <Star size={14} className="cat-card__star" /> {company.rating}
        </span>
      </div>

      <div className="cat-card__badges">
        {company.verified && <span className="cat-card__badge cat-card__badge--verified">Vérifiée</span>}
        {company.availableToday && <span className="cat-card__badge cat-card__badge--available">Disponible</span>}
      </div>

      <div className="cat-card__actions">
        <Link to={`/entreprises/${company.id}`} className="cat-card__btn cat-card__btn--primary">
          Voir le portail <ArrowRight size={14} />
        </Link>
        <Link to={`/track?company=${company.id}`} className="cat-card__btn cat-card__btn--secondary">
          <Package size={14} /> Suivre un colis
        </Link>
      </div>
    </article>
  );
}
