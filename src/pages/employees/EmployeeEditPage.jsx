import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEmployee, useEmployeeForm } from '../../hooks/useEmployee';
import EmployeeForm from '../../components/rbac/EmployeeForm';
import ListSkeleton from '../../components/rbac/ListSkeleton';

export default function EmployeeEditPage() {
  const { id } = useParams();
  const { employee, loading, fetch, clearSelected } = useEmployee();
  const { update } = useEmployeeForm();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !employee) return <ListSkeleton />;

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/employees" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1">Modifier l'employé</h4>
          <p className="text-muted mb-0 small">{employee.firstName} {employee.lastName}</p>
        </div>
      </div>
      <EmployeeForm initialData={employee} isEdit onSubmit={(data) => update(id, data)} />
    </div>
  );
}
