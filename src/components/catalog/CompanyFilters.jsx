import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import useCompanyCatalogStore from '../../store/useCompanyCatalogStore';
import { companyCategories, regions } from '../../api/mockCompanies';

const cities = ['Douala', 'Yaoundé', 'Bamenda', 'Garoua', 'Bafoussam', 'Maroua'];
const countries = ['Cameroun'];

export default function CompanyFilters() {
  const { filters, setFilter, resetFilters } = useCompanyCatalogStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasActiveFilters = Object.values(filters).some((v) => v && v !== '');

  const content = (
    <div className="cat-filters__body">
      <div className="cat-filters__group">
        <label className="cat-filters__label">Ville</label>
        <select
          className="cat-filters__select"
          value={filters.city}
          onChange={(e) => setFilter('city', e.target.value)}
        >
          <option value="">Toutes les villes</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="cat-filters__group">
        <label className="cat-filters__label">Région</label>
        <select
          className="cat-filters__select"
          value={filters.region}
          onChange={(e) => setFilter('region', e.target.value)}
        >
          <option value="">Toutes les régions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="cat-filters__group">
        <label className="cat-filters__label">Pays</label>
        <select
          className="cat-filters__select"
          value={filters.country}
          onChange={(e) => setFilter('country', e.target.value)}
        >
          <option value="">Tous les pays</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="cat-filters__group">
        <label className="cat-filters__label">Catégorie</label>
        <select
          className="cat-filters__select"
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {companyCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="cat-filters__toggles">
        <label className="cat-filters__toggle">
          <input
            type="checkbox"
            checked={filters.verified}
            onChange={(e) => setFilter('verified', e.target.checked)}
          />
          <span className="cat-filters__toggle-switch" />
          <span>Vérifiée uniquement</span>
        </label>
        <label className="cat-filters__toggle">
          <input
            type="checkbox"
            checked={filters.availableToday}
            onChange={(e) => setFilter('availableToday', e.target.checked)}
          />
          <span className="cat-filters__toggle-switch" />
          <span>Disponible aujourd'hui</span>
        </label>
      </div>

      {hasActiveFilters && (
        <button className="cat-filters__reset" onClick={resetFilters}>
          <RotateCcw size={14} /> Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="cat-filters cat-filters--desktop">
        <div className="cat-filters__header">
          <SlidersHorizontal size={16} />
          <span>Filtres</span>
          {hasActiveFilters && <span className="cat-filters__count">Actifs</span>}
        </div>
        {content}
      </div>

      <button className="cat-filters__mobile-toggle" onClick={() => setDrawerOpen(true)}>
        <SlidersHorizontal size={16} />
        Filtres
        {hasActiveFilters && <span className="cat-filters__mobile-count">!</span>}
      </button>

      {drawerOpen && (
        <div className="cat-filters__drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="cat-filters__drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cat-filters__drawer-header">
              <span>Filtres</span>
              <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
