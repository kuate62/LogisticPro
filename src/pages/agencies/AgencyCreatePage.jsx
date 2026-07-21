import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import useAgencyStore from '../../store/useAgencyStore';
import { agencyCreateSchema, formValuesToAgencyPayload } from '../../helpers/agencyValidation';
import { CONGO_REGIONS } from '../../config/constants';
import './AgencyFormPage.css';

const DEFAULT_VALUES = {
  name: '', code: '', phone: '', email: '', address: '',
  city: '', region: '', country: 'Cameroun', description: '',
  isPrimary: false,
  managerName: '', managerEmail: '', managerPhone: '',
  latitude: '', longitude: '',
  scheduleMondayOpen: '07:00', scheduleMondayClose: '18:00', scheduleMondayClosed: false,
  scheduleTuesdayOpen: '07:00', scheduleTuesdayClose: '18:00', scheduleTuesdayClosed: false,
  scheduleWednesdayOpen: '07:00', scheduleWednesdayClose: '18:00', scheduleWednesdayClosed: false,
  scheduleThursdayOpen: '07:00', scheduleThursdayClose: '18:00', scheduleThursdayClosed: false,
  scheduleFridayOpen: '07:00', scheduleFridayClose: '18:00', scheduleFridayClosed: false,
  scheduleSaturdayOpen: '08:00', scheduleSaturdayClose: '13:00', scheduleSaturdayClosed: false,
  scheduleSundayOpen: '', scheduleSundayClose: '', scheduleSundayClosed: true,
  logo: null,
};

export function AgencyCreatePage() {
  const navigate = useNavigate();
  const { companyId } = useAuth();
  const { createAgency } = useAgencyStore();
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const setValue = useCallback((name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  }, [errors]);

  const handleLogo = (e) => {
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
    setLogoPreview(URL.createObjectURL(file));
    setValue('logo', file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setValue('logo', null);
  };

  const validate = useCallback(() => {
    const result = agencyCreateSchema.safeParse(values);
    if (result.success) { setErrors({}); return true; }
    const fieldErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return false;
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = formValuesToAgencyPayload(values);
      await createAgency(companyId, payload);
      toast.success('Agence créée avec succès');
      navigate('/agencies');
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = [
    { key: 'Monday', label: 'Lundi' },
    { key: 'Tuesday', label: 'Mardi' },
    { key: 'Wednesday', label: 'Mercredi' },
    { key: 'Thursday', label: 'Jeudi' },
    { key: 'Friday', label: 'Vendredi' },
    { key: 'Saturday', label: 'Samedi' },
    { key: 'Sunday', label: 'Dimanche' },
  ];

  return (
    <div className="lp-form-page">
      <div className="lp-form-page__header">
        <Link to="/agencies" className="lp-form-page__back">
          <ArrowLeft size={18} />
          Retour
        </Link>
        <h1 className="lp-form-page__title">Nouvelle agence</h1>
      </div>

      <form onSubmit={handleSubmit} className="lp-form-page__form">
        {/* Section: Informations générales */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Informations générales</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Nom de l'agence <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.name ? 'lp-form-input--error' : ''}`} value={values.name} onChange={(e) => setValue('name', e.target.value)} placeholder="Ex: Agence Centrale" />
              {errors.name && <span className="lp-form-error">{errors.name}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Code agence <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.code ? 'lp-form-input--error' : ''}`} value={values.code} onChange={(e) => setValue('code', e.target.value)} placeholder="Ex: AGC-KIN-001" style={{ fontFamily: 'monospace' }} />
              {errors.code && <span className="lp-form-error">{errors.code}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Téléphone <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.phone ? 'lp-form-input--error' : ''}`} value={values.phone} onChange={(e) => setValue('phone', e.target.value)} placeholder="+243 81 234 5678" />
              {errors.phone && <span className="lp-form-error">{errors.phone}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Email <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.email ? 'lp-form-input--error' : ''}`} type="email" value={values.email} onChange={(e) => setValue('email', e.target.value)} placeholder="agence@transport.cd" />
              {errors.email && <span className="lp-form-error">{errors.email}</span>}
            </div>
            <div className="lp-form-grid__field lp-form-grid__field--full">
              <label className="lp-form-label">Description</label>
              <textarea className="lp-form-textarea" value={values.description} onChange={(e) => setValue('description', e.target.value)} rows={3} placeholder="Description de l'agence..." />
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-checkbox">
                <input type="checkbox" checked={values.isPrimary} onChange={(e) => setValue('isPrimary', e.target.checked)} />
                <span>Agence principale</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Adresse */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Adresse</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field lp-form-grid__field--full">
              <label className="lp-form-label">Adresse <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.address ? 'lp-form-input--error' : ''}`} value={values.address} onChange={(e) => setValue('address', e.target.value)} placeholder="12, Avenue de la Paix" />
              {errors.address && <span className="lp-form-error">{errors.address}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Ville <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.city ? 'lp-form-input--error' : ''}`} value={values.city} onChange={(e) => setValue('city', e.target.value)} placeholder="Kinshasa" />
              {errors.city && <span className="lp-form-error">{errors.city}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Région <span className="lp-form-required">*</span></label>
              <select className={`lp-form-select ${errors.region ? 'lp-form-input--error' : ''}`} value={values.region} onChange={(e) => setValue('region', e.target.value)}>
                <option value="">Sélectionner</option>
                {CONGO_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <span className="lp-form-error">{errors.region}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Pays</label>
              <input className="lp-form-input" value={values.country} onChange={(e) => setValue('country', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Section: Coordonnées GPS */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Coordonnées GPS <span className="lp-form-section__badge">Optionnel</span></h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Latitude</label>
              <input className="lp-form-input" type="number" step="any" value={values.latitude} onChange={(e) => setValue('latitude', e.target.value)} placeholder="-4.3217" />
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Longitude</label>
              <input className="lp-form-input" type="number" step="any" value={values.longitude} onChange={(e) => setValue('longitude', e.target.value)} placeholder="15.3114" />
            </div>
          </div>
        </div>

        {/* Section: Responsable */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Responsable</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Nom complet <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerName ? 'lp-form-input--error' : ''}`} value={values.managerName} onChange={(e) => setValue('managerName', e.target.value)} placeholder="Patrick Lukusa" />
              {errors.managerName && <span className="lp-form-error">{errors.managerName}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Email <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerEmail ? 'lp-form-input--error' : ''}`} type="email" value={values.managerEmail} onChange={(e) => setValue('managerEmail', e.target.value)} placeholder="responsable@transport.cd" />
              {errors.managerEmail && <span className="lp-form-error">{errors.managerEmail}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Téléphone <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerPhone ? 'lp-form-input--error' : ''}`} value={values.managerPhone} onChange={(e) => setValue('managerPhone', e.target.value)} placeholder="+243 83 456 7890" />
              {errors.managerPhone && <span className="lp-form-error">{errors.managerPhone}</span>}
            </div>
          </div>
        </div>

        {/* Section: Logo */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Logo <span className="lp-form-section__badge">Optionnel</span></h2>
          <div className="lp-form-logo">
            {logoPreview ? (
              <div className="lp-form-logo__preview">
                <img src={logoPreview} alt="Aperçu" />
                <button className="lp-form-logo__remove" onClick={removeLogo} type="button"><X size={16} /></button>
              </div>
            ) : (
              <label className="lp-form-logo__upload">
                <Upload size={24} />
                <span>Cliquez pour télécharger</span>
                <span className="lp-form-logo__hint">PNG, JPG — Max 2 Mo</span>
                <input type="file" accept="image/*" onChange={handleLogo} hidden />
              </label>
            )}
          </div>
        </div>

        {/* Section: Horaires */}
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Horaires d'ouverture</h2>
          <div className="lp-form-schedule">
            {days.map(({ key, label }) => {
              const closedKey = `schedule${key}Closed`;
              const openKey = `schedule${key}Open`;
              const closeKey = `schedule${key}Close`;
              return (
                <div key={key} className="lp-form-schedule__row">
                  <span className="lp-form-schedule__day">{label}</span>
                  <label className="lp-form-checkbox lp-form-checkbox--sm">
                    <input type="checkbox" checked={values[closedKey]} onChange={(e) => setValue(closedKey, e.target.checked)} />
                    <span>Fermé</span>
                  </label>
                  {!values[closedKey] && (
                    <div className="lp-form-schedule__times">
                      <input className="lp-form-input lp-form-input--time" type="time" value={values[openKey]} onChange={(e) => setValue(openKey, e.target.value)} />
                      <span className="lp-form-schedule__sep">—</span>
                      <input className="lp-form-input lp-form-input--time" type="time" value={values[closeKey]} onChange={(e) => setValue(closeKey, e.target.value)} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="lp-form-page__footer">
          <Link to="/agencies" className="lp-form-page__cancel">Annuler</Link>
          <button className="lp-form-page__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 size={16} className="lp-btn__spinner" /> Création...</> : <><Save size={16} /> Créer l'agence</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgencyCreatePage;
