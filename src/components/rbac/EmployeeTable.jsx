import { Eye, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../rbac/StatusBadge';
import Avatar from '../rbac/Avatar';
import SortIcon from '../rbac/SortIcon';
import { EMPLOYEE_POSITIONS } from '../../config/constants';

export default function EmployeeTable({ employees, sort, onSort, onToggle }) {
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
            <th>Employé</th>
            {th('employeeCode', 'Matricule')}
            {th('position', 'Poste')}
            {th('city', 'Ville')}
            {th('status', 'Statut')}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <Avatar firstName={emp.firstName} lastName={emp.lastName} size={36} />
                  <div>
                    <div className="fw-medium">{emp.firstName} {emp.lastName}</div>
                    <div className="text-muted small">{emp.email}</div>
                  </div>
                </div>
              </td>
              <td><code className="small">{emp.employeeCode}</code></td>
              <td>{EMPLOYEE_POSITIONS[emp.position] || emp.position}</td>
              <td>{emp.city}</td>
              <td><StatusBadge status={emp.status} /></td>
              <td className="text-end">
                <div className="d-flex gap-1 justify-content-end">
                  <Link to={`/employees/${emp.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"><Eye size={14} /></Link>
                  <Link to={`/employees/${emp.id}/edit`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"><Edit size={14} /></Link>
                  <button type="button" className="btn btn-sm btn-outline-warning rounded-pill px-2 py-1" onClick={() => onToggle(emp.id)}>
                    {emp.status === 'active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
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
