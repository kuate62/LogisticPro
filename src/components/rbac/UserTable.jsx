import { Eye, Edit, RotateCcw, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../rbac/StatusBadge';
import Avatar from '../rbac/Avatar';
import SortIcon from '../rbac/SortIcon';

export default function UserTable({ users, sort, onSort, onToggle, onReset }) {
  const th = (field, label) => (
    <th role="button" className="text-nowrap user-select-none" onClick={() => onSort({ field, direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc' })}>
      {label} <SortIcon field={field} currentSort={sort} />
    </th>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th>Utilisateur</th>
            {th('email', 'Email')}
            <th>Rôle</th>
            <th>Agence</th>
            {th('status', 'Statut')}
            {th('lastLogin', 'Dernière connexion')}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <Avatar firstName={u.firstName} lastName={u.lastName} size={36} />
                  <div>
                    <div className="fw-medium">{u.firstName} {u.lastName}</div>
                    <div className="text-muted small">{u.phone}</div>
                  </div>
                </div>
              </td>
              <td className="small">{u.email}</td>
              <td><span className="badge bg-primary-subtle text-primary">{u.roleName || u.roleId}</span></td>
              <td className="small">{u.agencyName || u.agencyId}</td>
              <td><StatusBadge status={u.status} /></td>
              <td className="small text-muted">{u.lastLogin || '—'}</td>
              <td className="text-end">
                <div className="d-flex gap-1 justify-content-end">
                  <Link to={`/users/${u.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"><Eye size={14} /></Link>
                  <Link to={`/users/${u.id}/edit`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"><Edit size={14} /></Link>
                  <button type="button" className="btn btn-sm btn-outline-info rounded-pill px-2 py-1" title="Réinitialiser le mot de passe" onClick={() => onReset(u.id)}><RotateCcw size={14} /></button>
                  <button type="button" className="btn btn-sm btn-outline-warning rounded-pill px-2 py-1" onClick={() => onToggle(u.id)}>
                    {u.status === 'active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
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
