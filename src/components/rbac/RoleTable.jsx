import { Eye, Edit, Trash2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoleTable({ roles, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th>Rôle</th>
            <th>Code</th>
            <th>Description</th>
            <th>Permissions</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => {
            const isSystem = r.isSystem === true;
            return (
              <tr key={r.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <ShieldCheck size={18} className="text-primary" />
                    <span className="fw-medium">{r.name}</span>
                    {isSystem && <span className="badge bg-secondary ms-1">Système</span>}
                  </div>
                </td>
                <td><code className="small">{r.code}</code></td>
                <td className="text-muted small" style={{ maxWidth: 220 }}>{r.description || '—'}</td>
                <td><span className="badge bg-primary-subtle text-primary">{r.permissions?.length || 0}</span></td>
                <td className="text-end">
                  <div className="d-flex gap-1 justify-content-end">
                    <Link to={`/roles/${r.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"><Eye size={14} /></Link>
                    <Link to={`/roles/${r.id}/edit`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"><Edit size={14} /></Link>
                    {!isSystem && (
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" onClick={() => onDelete(r.id)}><Trash2 size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
