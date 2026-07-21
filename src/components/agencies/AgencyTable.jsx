import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, ChevronsUpDown, Eye, Edit2, Power } from 'lucide-react';
import AgencyLogo from './AgencyLogo';
import AgencyStatus from './AgencyStatus';
import { formatAgencyPhone, formatAgencyDate } from '../../helpers/agencyFormatters';
import './AgencyTable.css';

function SortIcon({ field, sortField, sortDirection }) {
  if (sortField !== field) return <ChevronsUpDown size={14} className="lp-table__sort-icon lp-table__sort-icon--inactive" />;
  return sortDirection === 'asc'
    ? <ChevronUp size={14} className="lp-table__sort-icon" />
    : <ChevronDown size={14} className="lp-table__sort-icon" />;
}

export function AgencyTable({ agencies, sort, onSort, onToggle, loading }) {
  const handleSort = (field) => {
    const newDir = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction: newDir });
  };

  if (loading) {
    return (
      <div className="lp-table-wrap">
        <div className="lp-table-loading">
          <div className="lp-table-loading__spinner" />
          <span>Chargement des agences...</span>
        </div>
      </div>
    );
  }

  if (!agencies || agencies.length === 0) {
    return null;
  }

  return (
    <div className="lp-table-wrap">
      <table className="lp-table">
        <thead>
          <tr>
            <th className="lp-table__th" onClick={() => handleSort('name')}>
              <span>Agence</span>
              <SortIcon field="name" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th" onClick={() => handleSort('city')}>
              <span>Ville</span>
              <SortIcon field="city" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th lp-table__th--hide-mobile">Responsable</th>
            <th className="lp-table__th lp-table__th--hide-mobile">Téléphone</th>
            <th className="lp-table__th lp-table__th--center" onClick={() => handleSort('employeesCount')}>
              <span>Employés</span>
              <SortIcon field="employeesCount" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th lp-table__th--center lp-table__th--hide-mobile" onClick={() => handleSort('shipmentsCount')}>
              <span>Expéditions</span>
              <SortIcon field="shipmentsCount" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th lp-table__th--center" onClick={() => handleSort('status')}>
              <span>Statut</span>
              <SortIcon field="status" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th lp-table__th--hide-mobile" onClick={() => handleSort('createdAt')}>
              <span>Créée le</span>
              <SortIcon field="createdAt" sortField={sort.field} sortDirection={sort.direction} />
            </th>
            <th className="lp-table__th lp-table__th--right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.id} className="lp-table__row">
              <td className="lp-table__td">
                <div className="lp-table__agency">
                  <AgencyLogo agency={agency} size="sm" />
                  <div className="lp-table__agency-info">
                    <Link to={`/agencies/${agency.id}`} className="lp-table__agency-name">
                      {agency.name}
                    </Link>
                    <span className="lp-table__agency-code">{agency.code}</span>
                  </div>
                </div>
              </td>
              <td className="lp-table__td">{agency.city}</td>
              <td className="lp-table__td lp-table__td--hide-mobile">{agency.manager?.name || '—'}</td>
              <td className="lp-table__td lp-table__td--hide-mobile lp-table__td--mono">{formatAgencyPhone(agency.phone)}</td>
              <td className="lp-table__td lp-table__td--center">{agency.employeesCount}</td>
              <td className="lp-table__td lp-table__td--center lp-table__td--hide-mobile">{agency.shipmentsCount}</td>
              <td className="lp-table__td lp-table__td--center"><AgencyStatus status={agency.status} size="sm" /></td>
              <td className="lp-table__td lp-table__td--hide-mobile">{formatAgencyDate(agency.createdAt)}</td>
              <td className="lp-table__td lp-table__td--right">
                <div className="lp-table__actions">
                  <Link to={`/agencies/${agency.id}`} className="lp-table__action" title="Voir">
                    <Eye size={15} />
                  </Link>
                  <Link to={`/agencies/${agency.id}/edit`} className="lp-table__action lp-table__action--edit" title="Modifier">
                    <Edit2 size={15} />
                  </Link>
                  <button
                    className={`lp-table__action ${agency.status === 'active' ? 'lp-table__action--danger' : 'lp-table__action--success'}`}
                    onClick={() => onToggle?.(agency.id)}
                    title={agency.status === 'active' ? 'Désactiver' : 'Réactiver'}
                    type="button"
                  >
                    <Power size={15} />
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

export default AgencyTable;
