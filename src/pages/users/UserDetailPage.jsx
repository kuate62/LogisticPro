import { useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Shield, Clock, ToggleLeft, ToggleRight, RotateCcw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useUser, useUserForm } from '../../hooks/useUser';
import ListSkeleton from '../../components/rbac/ListSkeleton';
import StatusBadge from '../../components/rbac/StatusBadge';
import Avatar from '../../components/rbac/Avatar';
import toast from 'react-hot-toast';
export default function UserDetailPage() {
  const { id } = useParams();
  const { user, loading, fetch, clearSelected } = useUser();
  const { update, resetPassword } = useUserForm();

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);

  if (loading.detail || !user) return <ListSkeleton />;

  const isSystem = user.roleIsSystem === true;

  const handleToggle = async () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try { await update(id, { status: newStatus }); toast.success(`Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'}`); fetch(id); } catch { toast.error('Erreur'); }
  };

  const handleResetPassword = async () => {
    if (window.confirm('Envoyer un email de réinitialisation du mot de passe ?')) {
      try { await resetPassword(id); toast.success('Email de réinitialisation envoyé'); } catch { toast.error('Erreur'); }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/users" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-1">{user.firstName} {user.lastName}</h4>
          <p className="text-muted mb-0 small">{user.email}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/users/${id}/edit`} className="btn btn-outline-primary btn-sm">Modifier</Link>
          <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center gap-1" onClick={handleResetPassword}><RotateCcw size={14} /> Réinitialiser MDP</button>
          <button type="button" className={`btn btn-sm ${user.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`} onClick={handleToggle}>
            {user.status === 'active' ? <><ToggleLeft size={14} /> Désactiver</> : <><ToggleRight size={14} /> Activer</>}
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
            <h6 className="fw-semibold mb-3">Profil</h6>
            <div className="row g-3">
              <div className="col-md-6 d-flex align-items-center gap-3">
                <Avatar firstName={user.firstName} lastName={user.lastName} size={56} />
                <div>
                  <div className="fw-medium">{user.firstName} {user.lastName}</div>
                  <StatusBadge status={user.status} />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2 small"><Mail size={14} className="text-muted" /> {user.email}</div>
              <div className="col-md-6 d-flex align-items-center gap-2 small"><Phone size={14} className="text-muted" /> {user.phone}</div>
              <div className="col-md-6 d-flex align-items-center gap-2 small"><Shield size={14} className="text-muted" /> {user.roleName || user.roleId}</div>
              <div className="col-md-6 small text-muted">Agence: {user.agencyName || user.agencyId}</div>
              <div className="col-md-6 small text-muted">Poste: {user.position}</div>
              {user.lastLogin && <div className="col-md-6 d-flex align-items-center gap-2 small"><Clock size={14} className="text-muted" /> Dernière connexion: {user.lastLogin}</div>}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-white rounded-3 shadow-sm p-4">
            <h6 className="fw-semibold mb-3">Détails du rôle</h6>
            {isSystem && <div className="badge bg-secondary mb-2">Rôle système</div>}
            <div className="small text-muted">Les rôles système ne peuvent pas être modifiés depuis la gestion des rôles.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
