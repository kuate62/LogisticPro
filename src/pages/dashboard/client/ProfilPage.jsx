import { useClientProfile } from '../../../hooks/useClientProfile';
import { useCurrentClient } from '../../../hooks/useCurrentClient';
import { PageHeader, ProfileInformation, ProfileSecurity, ErrorState } from '../../../components/client';
import { LoadingState } from '../../../components/agent';

export default function ProfilPage() {
  const { clientId, loading: clientLoading } = useCurrentClient();
  const {
    profile, company, preferredAgency, agencies, security,
    loading, error, refresh,
    updateProfile, changePassword, uploadAvatar, removeAvatar, saving,
  } = useClientProfile(clientId);

  if (clientLoading || (loading && !profile)) return <LoadingState />;
  if (error && !profile) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div>
      <PageHeader
        title="Mon profil"
        subtitle={profile ? `${profile.firstName} ${profile.lastName}` : 'Gérez vos informations personnelles'}
      />

      {profile && company && (
        <div className="client-profile-summary">
          <div className="client-avatar-large">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" />
            ) : (
              <span>{`${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`}</span>
            )}
          </div>
          <div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{profile.email} · {profile.phone}</p>
            <span className="client-category-tag">Client {company.name}</span>
          </div>
        </div>
      )}

      <ProfileInformation
        profile={profile}
        agencies={agencies}
        updateProfile={updateProfile}
        uploadAvatar={uploadAvatar}
        removeAvatar={removeAvatar}
        saving={saving}
      />

      <ProfileSecurity
        security={security}
        changePassword={changePassword}
        saving={saving}
      />

      {preferredAgency && (
        <div className="ag-card">
          <div className="ag-card__header">
            <h3 className="ag-card__title">Agence préférée</h3>
          </div>
          <div className="ag-card__body">
            <div className="client-agency-pref">
              <div className="client-agency-pref__name">{preferredAgency.name}</div>
              <div className="client-agency-pref__meta">
                {preferredAgency.city} · {preferredAgency.phone}
              </div>
              <div className="client-agency-pref__hours">
                {Array.isArray(preferredAgency.hours)
                  ? `${preferredAgency.hours[0]} – ${preferredAgency.hours[1]}`
                  : preferredAgency.hours}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
