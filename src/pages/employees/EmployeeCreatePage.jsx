import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployeeForm from '../../components/rbac/EmployeeForm';
import { useEmployeeForm } from '../../hooks/useEmployee';

export default function EmployeeCreatePage() {
  const { create } = useEmployeeForm();

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/employees" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><UserPlus size={22} className="text-primary" /> Nouvel employé</h4>
          <p className="text-muted mb-0 small">Ajouter un nouvel employé au système</p>
        </div>
      </div>
      <EmployeeForm onSubmit={create} />
    </div>
  );
}
