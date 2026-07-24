import { useEffect } from 'react';
import { Users } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/admin/PageHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';
import LoadingState from '../../components/admin/LoadingState';
import { usePlatformUsers } from '../../hooks/useAdmin';
import './SuperAdminsPage.css';

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

function getInitials(firstName, lastName) {
  return `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
}

export default function SuperAdminsPage() {
  const { platformUsers, loading, error, fetchPlatformUsers } = usePlatformUsers();

  useEffect(() => {
    fetchPlatformUsers();
  }, [fetchPlatformUsers]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const superAdmins = (platformUsers || []).filter((u) => u.role === 'super_admin');

  return (
    <div className="sa-super-admins">
      <PageHeader title="Super Admins" subtitle={`${superAdmins.length} administrateur(s)`} />

      {loading ? (
        <LoadingState />
      ) : superAdmins.length === 0 ? (
        <EmptyState icon={Users} title="Aucun super administrateur" message="Aucun super administrateur trouvé sur la plateforme." />
      ) : (
        <div className="sa-super-admins__table-wrap">
          <table className="sa-super-admins__table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Dernière connexion</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {superAdmins.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="sa-super-admins__user">
                      <span className="sa-super-admins__avatar">{getInitials(user.firstName, user.lastName)}</span>
                      <span className="sa-super-admins__name">{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="sa-super-admins__email">{user.email}</td>
                  <td className="sa-super-admins__date">{formatDate(user.lastLogin)}</td>
                  <td>
                    <StatusBadge status={user.isActive ? 'active' : 'inactive'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
