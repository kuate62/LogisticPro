import { SearchX, Building2, RotateCcw } from 'lucide-react';

export default function EmptyCompanies({ type = 'empty' }) {
  const configs = {
    empty: { icon: Building2, title: 'Aucune entreprise disponible', desc: 'Il n\'y a pas encore d\'entreprises partenaires sur la plateforme.' },
    search: { icon: SearchX, title: 'Aucun résultat', desc: 'Aucune entreprise ne correspond à votre recherche. Essayez avec d\'autres termes ou réinitialisez les filtres.' },
    error: { icon: SearchX, title: 'Erreur de chargement', desc: 'Une erreur est survenue lors du chargement des entreprises. Veuillez réessayer.' },
  };

  const cfg = configs[type] || configs.empty;
  const Icon = cfg.icon;

  const handleReset = () => { window.location.reload(); };

  return (
    <div className="cat-empty">
      <div className="cat-empty__icon">
        <Icon size={48} />
      </div>
      <h3 className="cat-empty__title">{cfg.title}</h3>
      <p className="cat-empty__desc">{cfg.desc}</p>
      {type !== 'error' && (
        <button className="cat-empty__btn" onClick={handleReset}>
          <RotateCcw size={14} /> Réinitialiser
        </button>
      )}
    </div>
  );
}
