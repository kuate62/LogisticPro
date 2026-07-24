import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/admin/PageHeader';
import './ProfilePage.css';

const MOCK_USER = {
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'admin@logisticpro.com',
  role: 'Super Admin',
  phone: '+237 699 123 456',
};

function getInitials(firstName, lastName) {
  return `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
}

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = user
    ? { firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', role: user.role || 'Admin', phone: user.phone || '' }
    : MOCK_USER;

  return (
    <div className="sa-profile">
      <PageHeader title="Mon profil" subtitle="Gérez vos informations personnelles" />

      <div className="sa-profile__card">
        <div className="sa-profile__card-header">
          <span className="sa-profile__avatar-lg">{getInitials(profile.firstName, profile.lastName)}</span>
          <div className="sa-profile__card-info">
            <h3 className="sa-profile__card-name">{profile.firstName} {profile.lastName}</h3>
            <p className="sa-profile__card-email">{profile.email}</p>
            <span className="sa-profile__role-badge">{profile.role}</span>
          </div>
        </div>
      </div>

      <div className="sa-profile__section">
        <h4 className="sa-profile__section-title">Informations personnelles</h4>
        <div className="sa-profile__form-grid">
          <div className="sa-profile__field">
            <label className="sa-profile__label">Nom</label>
            <input className="sa-profile__input" type="text" value={profile.lastName} readOnly />
          </div>
          <div className="sa-profile__field">
            <label className="sa-profile__label">Prénom</label>
            <input className="sa-profile__input" type="text" value={profile.firstName} readOnly />
          </div>
          <div className="sa-profile__field">
            <label className="sa-profile__label">Email</label>
            <input className="sa-profile__input" type="email" value={profile.email} readOnly />
          </div>
          <div className="sa-profile__field">
            <label className="sa-profile__label">Téléphone</label>
            <input className="sa-profile__input" type="tel" value={profile.phone || '—'} readOnly />
          </div>
        </div>
      </div>

      <div className="sa-profile__section">
        <h4 className="sa-profile__section-title">Changer le mot de passe</h4>
        <div className="sa-profile__form-grid">
          <div className="sa-profile__field sa-profile__field--full">
            <label className="sa-profile__label">Mot de passe actuel</label>
            <input className="sa-profile__input" type="password" placeholder="••••••••" readOnly />
          </div>
          <div className="sa-profile__field">
            <label className="sa-profile__label">Nouveau mot de passe</label>
            <input className="sa-profile__input" type="password" placeholder="••••••••" readOnly />
          </div>
          <div className="sa-profile__field">
            <label className="sa-profile__label">Confirmer le mot de passe</label>
            <input className="sa-profile__input" type="password" placeholder="••••••••" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
