import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, Loader2, MonitorSmartphone, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDateTime } from '../../utils/format';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Saisissez votre mot de passe actuel'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

const LOGIN_STATUS_LABELS = { success: 'Réussie', failed: 'Échouée' };

export function ProfileSecurity({ security, changePassword, saving }) {
  const [twoFactor, setTwoFactor] = useState(security?.twoFactorEnabled || false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onSubmit = async (values) => {
    const result = await changePassword(values);
    if (result) {
      toast.success(result.message || 'Mot de passe modifié');
      reset();
    } else {
      toast.error('Erreur lors du changement de mot de passe');
    }
  };

  const toggleTwoFactor = () => {
    setTwoFactor((v) => !v);
    toast.success(`Authentification à deux facteurs ${!twoFactor ? 'activée' : 'désactivée'}`);
  };

  return (
    <div className="client-profile-security">
      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title"><KeyRound size={16} /> Mot de passe</h3>
        </div>
        <div className="ag-card__body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="client-form-field">
              <label htmlFor="currentPassword">Mot de passe actuel <span className="client-form-required">*</span></label>
              <input id="currentPassword" type="password" {...register('currentPassword')} className={`client-input ${errors.currentPassword ? 'client-input--error' : ''}`} autoComplete="current-password" />
              {errors.currentPassword && <span className="client-form-error">{errors.currentPassword.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="newPassword">Nouveau mot de passe <span className="client-form-required">*</span></label>
              <input id="newPassword" type="password" {...register('newPassword')} className={`client-input ${errors.newPassword ? 'client-input--error' : ''}`} autoComplete="new-password" />
              {errors.newPassword && <span className="client-form-error">{errors.newPassword.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe <span className="client-form-required">*</span></label>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} className={`client-input ${errors.confirmPassword ? 'client-input--error' : ''}`} autoComplete="new-password" />
              {errors.confirmPassword && <span className="client-form-error">{errors.confirmPassword.message}</span>}
            </div>
            <div className="client-form-actions">
              <button type="submit" className="client-btn-primary" disabled={isSubmitting || saving}>
                {isSubmitting || saving ? <><Loader2 size={15} className="client-spinner" /> Mise à jour...</> : 'Modifier le mot de passe'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title"><ShieldCheck size={16} /> Sécurité du compte</h3>
        </div>
        <div className="ag-card__body">
          <div className="client-twofa-row">
            <div>
              <p className="client-twofa-row__title">Authentification à deux facteurs</p>
              <p className="client-twofa-row__desc">
                Renforcez la sécurité de votre compte avec une vérification supplémentaire à la connexion.
              </p>
            </div>
            <button
              type="button"
              className={`client-toggle ${twoFactor ? 'client-toggle--on' : ''}`}
              role="switch"
              aria-checked={twoFactor}
              onClick={toggleTwoFactor}
            >
              <span className="client-toggle__thumb" />
            </button>
          </div>
          {security?.lastPasswordChange && (
            <p className="client-twofa-note">Dernier changement de mot de passe : {formatDateTime(security.lastPasswordChange)}</p>
          )}
        </div>
      </div>

      <div className="ag-card">
        <div className="ag-card__header">
          <h3 className="ag-card__title"><MonitorSmartphone size={16} /> Dernières connexions</h3>
        </div>
        <div className="ag-card__body" style={{ padding: 0 }}>
          {security?.loginHistory && security.loginHistory.length > 0 ? (
            <div className="ag-table-wrapper">
              <table className="ag-table">
                <thead>
                  <tr>
                    <th>Appareil</th>
                    <th>Localisation</th>
                    <th>IP</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {security.loginHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.device}</td>
                      <td>{entry.location}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{entry.ip}</td>
                      <td>{formatDateTime(entry.date)}</td>
                      <td>
                        <span className={`ag-badge ag-badge--${entry.status === 'success' ? 'success' : 'danger'}`}>
                          {LOGIN_STATUS_LABELS[entry.status] || entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ag-empty"><p className="ag-empty__desc">Aucune connexion enregistrée.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSecurity;
