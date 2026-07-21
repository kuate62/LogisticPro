import { Edit, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PricingStatus from './PricingStatus';
import { PRICING_CATEGORIES } from '../../config/constants';

function SortIcon({ field, currentSort }) {
  if (currentSort.field !== field) return <ChevronsUpDown size={14} className="text-muted ms-1" />;
  return currentSort.direction === 'asc'
    ? <ChevronUp size={14} className="text-primary ms-1" />
    : <ChevronDown size={14} className="text-primary ms-1" />;
}

function getCategoryLabel(value) {
  const cat = PRICING_CATEGORIES.find((c) => c.value === value);
  return cat ? cat.label : value;
}

export default function PricingTable({ pricings, sort, onSort, onEdit }) {
  const navigate = useNavigate();

  const th = (field, label) => (
    <th role="button" className="text-nowrap user-select-none" onClick={() => onSort({ field, direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc' })}>
      {label}
      <SortIcon field={field} currentSort={sort} />
    </th>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            {th('code', 'Code')}
            {th('name', 'Nom')}
            {th('originCity', 'Départ')}
            {th('destinationCity', 'Destination')}
            {th('category', 'Catégorie')}
            {th('maxWeight', 'Poids')}
            {th('unitPrice', 'Prix')}
            {th('status', 'Statut')}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pricings.map((p) => (
            <tr key={p.id}>
              <td><code className="small fw-semibold">{p.code}</code></td>
              <td className="small fw-medium">{p.name}</td>
              <td className="small">{p.originCity}</td>
              <td className="small">{p.destinationCity}</td>
              <td><span className="badge bg-primary-subtle text-primary">{getCategoryLabel(p.category)}</span></td>
              <td className="small">{p.minWeight} - {p.maxWeight} kg</td>
              <td className="small fw-medium">{(p.unitPrice || 0).toLocaleString('fr-FR')} FC</td>
              <td><PricingStatus status={p.status} /></td>
              <td className="text-end">
                <div className="d-flex gap-1 justify-content-end">
                  <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1" title="Voir" onClick={() => navigate(`/pricing/${p.id}`)}>
                    <ChevronUp size={14} className="rotate-90" />
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1" title="Modifier" onClick={() => onEdit(p)}>
                    <Edit size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
