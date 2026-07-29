import { Search, Building2 } from 'lucide-react';

export default function CompanyHero() {
  return (
    <section className="cat-hero">
      <div className="cat-hero__inner">
        <div className="cat-hero__visual">
          <div className="cat-hero__icon-ring">
            <Building2 size={32} />
          </div>
          <div className="cat-hero__dots">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="cat-hero__dot" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
        </div>
        <span className="cat-hero__badge">Marketplace</span>
        <h1 className="cat-hero__title">Trouvez votre entreprise de transport</h1>
        <p className="cat-hero__subtitle">
          Découvrez toutes les entreprises partenaires présentes sur notre plateforme.
        </p>
        <div className="cat-hero__search-preview">
          <Search size={18} />
          <span>Rechercher une entreprise...</span>
        </div>
      </div>
    </section>
  );
}
