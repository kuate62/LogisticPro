import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, Loader2, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  address: z.string().min(4, 'Adresse trop courte'),
  city: z.string().min(2, 'Ville invalide'),
  preferredAgencyId: z.string().min(1, 'Sélectionnez une agence'),
});

export function ProfileInformation({
  profile,
  agencies,
  updateProfile,
  uploadAvatar,
  removeAvatar,
  saving,
}) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      city: profile?.city || '',
      preferredAgencyId: profile?.preferredAgencyId || '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        preferredAgencyId: profile.preferredAgencyId || '',
      });
    }
  }, [profile, reset]);

  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Format de fichier non supporté');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Le fichier ne doit pas dépasser 2 Mo');
      return;
    }
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    const result = await uploadAvatar(file);
    if (result) {
      toast.success('Photo de profil mise à jour');
    } else {
      toast.error('Erreur lors de la mise à jour de la photo');
      setAvatarPreview(null);
    }
  };

  const onRemoveAvatar = async () => {
    const result = await removeAvatar();
    if (result) toast.success('Photo de profil supprimée');
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (values) => {
    const result = await updateProfile(values);
    if (result) {
      toast.success('Profil mis à jour avec succès');
    } else {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const avatarSrc = avatarPreview || profile?.avatar;

  return (
    <div className="ag-card">
      <div className="ag-card__header">
        <h3 className="ag-card__title">Informations personnelles</h3>
      </div>
      <div className="ag-card__body">
        <div className="client-avatar-row">
          <div className="client-avatar-large">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Avatar" />
            ) : (
              <span>{profile ? `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}` : '—'}</span>
            )}
          </div>
          <div className="client-avatar-actions">
            <button type="button" className="client-btn-secondary" onClick={() => fileInputRef.current?.click()}>
              <Camera size={15} /> Changer la photo
            </button>
            {avatarSrc && (
              <button type="button" className="client-btn-ghost" onClick={onRemoveAvatar}>
                <Trash2 size={15} /> Supprimer
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onAvatarChange} hidden />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="client-form-grid">
            <div className="client-form-field">
              <label htmlFor="firstName">Prénom <span className="client-form-required">*</span></label>
              <input id="firstName" {...register('firstName')} className={`client-input ${errors.firstName ? 'client-input--error' : ''}`} />
              {errors.firstName && <span className="client-form-error">{errors.firstName.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="lastName">Nom <span className="client-form-required">*</span></label>
              <input id="lastName" {...register('lastName')} className={`client-input ${errors.lastName ? 'client-input--error' : ''}`} />
              {errors.lastName && <span className="client-form-error">{errors.lastName.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="email">Email <span className="client-form-required">*</span></label>
              <input id="email" type="email" {...register('email')} className={`client-input ${errors.email ? 'client-input--error' : ''}`} />
              {errors.email && <span className="client-form-error">{errors.email.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="phone">Téléphone <span className="client-form-required">*</span></label>
              <input id="phone" {...register('phone')} className={`client-input ${errors.phone ? 'client-input--error' : ''}`} />
              {errors.phone && <span className="client-form-error">{errors.phone.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="address">Adresse <span className="client-form-required">*</span></label>
              <input id="address" {...register('address')} className={`client-input ${errors.address ? 'client-input--error' : ''}`} />
              {errors.address && <span className="client-form-error">{errors.address.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="city">Ville <span className="client-form-required">*</span></label>
              <input id="city" {...register('city')} className={`client-input ${errors.city ? 'client-input--error' : ''}`} />
              {errors.city && <span className="client-form-error">{errors.city.message}</span>}
            </div>
            <div className="client-form-field">
              <label htmlFor="preferredAgencyId">Agence préférée <span className="client-form-required">*</span></label>
              <select
                id="preferredAgencyId"
                {...register('preferredAgencyId')}
                className={`client-input ${errors.preferredAgencyId ? 'client-input--error' : ''}`}
              >
                <option value="">Sélectionner une agence</option>
                {agencies.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} — {a.city}</option>
                ))}
              </select>
              {errors.preferredAgencyId && <span className="client-form-error">{errors.preferredAgencyId.message}</span>}
            </div>
          </div>

          <div className="client-form-actions">
            <button type="submit" className="client-btn-primary" disabled={isSubmitting || saving}>
              {isSubmitting || saving ? <><Loader2 size={15} className="client-spinner" /> Enregistrement...</> : <><Save size={15} /> Enregistrer</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
