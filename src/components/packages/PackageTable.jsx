import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import PackageStatus from './PackageStatus';

function SortIcon({ field, sort }) {
  if (sort.field !== field) return null;
  return sort.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

export default function PackageTable({ packages, sort, onSort, onCancel }) {
  const handleSort = (field) => {
    onSort({ field, direction: sort.field === field && sort.direction === 'desc' ? 'asc' : 'desc' });
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="small fw-semibold" style={{ cursor: 'pointer' }} onClick={() => handleSort('trackingCode')}>Code <SortIcon field="trackingCode" sort={sort} /></th>
            <th className="small fw-semibold" style={{ cursor: 'pointer' }} onClick={() => handleSort('label')}>Libellé <SortIcon field="label" sort={sort} /></th>
            <th className="small fw-semibold">Catégorie</th>
            <th className="small fw-semibold">Expéditeur</th>
            <th className="small fw-semibold">Destinataire</th>
            <th className="small fw-semibold">Trajet</th>
            <th className="small fw-semibold text-end" style={{ cursor: 'pointer' }} onClick={() => handleSort('weight')}>Poids <SortIcon field="weight" sort={sort} /></th>
            <th className="small fw-semibold text-end" style={{ cursor: 'pointer' }} onClick={() => handleSort('totalAmount')}>Montant <SortIcon field="totalAmount" sort={sort} /></th>
            <th className="small fw-semibold text-center">Statut</th>
            <th className="small fw-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td className="small fw-medium">{pkg.trackingCode}</td>
              <td className="small">{pkg.label}</td>
              <td className="small"><span className="badge bg-light text-dark">{pkg.category}</span></td>
              <td className="small">{pkg.senderName}</td>
              <td className="small">{pkg.receiverName}</td>
              <td className="small text-muted">{pkg.originCity} → {pkg.destinationCity}</td>
              <td className="small text-end">{pkg.weight} kg</td>
              <td className="small text-end fw-medium">{(pkg.totalAmount || 0).toLocaleString('fr-FR')} FC</td>
              <td className="small text-center"><PackageStatus status={pkg.status} /></td>
              <td className="small text-center">
                <div className="d-flex gap-1 justify-content-center">
                  <Link to={`/packages/${pkg.id}`} className="btn btn-outline-primary btn-sm">Voir</Link>
                  {['pending', 'registered', 'ready'].includes(pkg.status) && (
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onCancel(pkg.id)}>Annuler</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
