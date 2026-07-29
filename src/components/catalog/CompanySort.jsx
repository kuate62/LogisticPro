import { ArrowUpDown } from 'lucide-react';
import useCompanyCatalogStore from '../../store/useCompanyCatalogStore';

const sortOptions = [
  { value: 'name_asc', label: 'A → Z' },
  { value: 'name_desc', label: 'Z → A' },
  { value: 'newest', label: 'Plus récentes' },
  { value: 'popular', label: 'Plus populaires' },
  { value: 'rating', label: 'Mieux notées' },
];

export default function CompanySort() {
  const { sort, setSort } = useCompanyCatalogStore();

  return (
    <div className="cat-sort">
      <ArrowUpDown size={14} />
      <label htmlFor="cat-sort" className="sr-only">Trier par</label>
      <select
        id="cat-sort"
        className="cat-sort__select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
