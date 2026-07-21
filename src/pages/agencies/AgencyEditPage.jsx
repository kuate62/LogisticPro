import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import useAgencyStore from '../../store/useAgencyStore';
import { agencyCreateSchema, formValuesToAgencyPayload, agencyToFormValues } from '../../helpers/agencyValidation';
import { CONGO_REGIONS } from '../../config/constants';
import './AgencyFormPage.css';

export function AgencyEditPageWrapper() {
  const { id } = useParams();
  const { companyId } = useAuth();
  const { selectedAgency, fetchAgencyDetail, clearSelected } = useAgencyStore();

  useEffect(() => {
    fetchAgencyDetail(companyId, id);
    return () => clearSelected();
  }, [companyId, id, fetchAgencyDetail, clearSelected]);

  if (!selectedAgency) {
    return (
      <div className="lp-form-page">
        <div className="lp-form-page__loading">
          <Loader2 size={32} className="lp-btn__spinner" />
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  return <AgencyEditForm agency={selectedAgency} />;
}

function AgencyEditForm({ agency }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companyId } = useAuth();
  const { updateAgency } = useAgencyStore();
  const [values, setValues] = useState(() => agencyToFormValues(agency));
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
    if (!file.type.startsWith('image/')) { toast.error('Format non supporté'); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 Mo'); return; }
    setLogoPreview(URL.createObjectURL(file));
    setValue('logo', file);
  };

  const removeLogo = () => { setLogoPreview(null); setValue('logo', null); };

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
    if (!validate()) { toast.error('Veuillez corriger les erreurs'); return; }
    setIsSubmitting(true);
    try {
      const payload = formValuesToAgencyPayload(values);
      await updateAgency(companyId, id, payload);
      toast.success('Agence modifiée avec succès');
      navigate(`/agencies/${id}`);
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la modification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = [
    { key: 'Monday', label: 'Lundi' }, { key: 'Tuesday', label: 'Mardi' },
    { key: 'Wednesday', label: 'Mercredi' }, { key: 'Thursday', label: 'Jeudi' },
    { key: 'Friday', label: 'Vendredi' }, { key: 'Saturday', label: 'Samedi' },
    { key: 'Sunday', label: 'Dimanche' },
  ];

  return (
    <div className="lp-form-page">
      <div className="lp-form-page__header">
        <Link to={`/agencies/${id}`} className="lp-form-page__back">
          <ArrowLeft size={18} /> Retour
        </Link>
        <h1 className="lp-form-page__title">Modifier — {agency.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="lp-form-page__form">
        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Informations générales</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Nom <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.name ? 'lp-form-input--error' : ''}`} value={values.name || ''} onChange={(e) => setValue('name', e.target.value)} />
              {errors.name && <span className="lp-form-error">{errors.name}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Code <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.code ? 'lp-form-input--error' : ''}`} value={values.code || ''} onChange={(e) => setValue('code', e.target.value)} style={{ fontFamily: 'monospace' }} />
              {errors.code && <span className="lp-form-error">{errors.code}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Téléphone <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.phone ? 'lp-form-input--error' : ''}`} value={values.phone || ''} onChange={(e) => setValue('phone', e.target.value)} />
              {errors.phone && <span className="lp-form-error">{errors.phone}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Email <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.email ? 'lp-form-input--error' : ''}`} type="email" value={values.email || ''} onChange={(e) => setValue('email', e.target.value)} />
              {errors.email && <span className="lp-form-error">{errors.email}</span>}
            </div>
            <div className="lp-form-grid__field lp-form-grid__field--full">
              <label className="lp-form-label">Description</label>
              <textarea className="lp-form-textarea" value={values.description || ''} onChange={(e) => setValue('description', e.target.value)} rows={3} />
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-checkbox">
                <input type="checkbox" checked={!!values.isPrimary} onChange={(e) => setValue('isPrimary', e.target.checked)} />
                <span>Agence principale</span>
              </label>
            </div>
          </div>
        </div>

        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Adresse</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field lp-form-grid__field--full">
              <label className="lp-form-label">Adresse <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.address ? 'lp-form-input--error' : ''}`} value={values.address || ''} onChange={(e) => setValue('address', e.target.value)} />
              {errors.address && <span className="lp-form-error">{errors.address}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Ville <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.city ? 'lp-form-input--error' : ''}`} value={values.city || ''} onChange={(e) => setValue('city', e.target.value)} />
              {errors.city && <span className="lp-form-error">{errors.city}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Région <span className="lp-form-required">*</span></label>
              <select className={`lp-form-select ${errors.region ? 'lp-form-input--error' : ''}`} value={values.region || ''} onChange={(e) => setValue('region', e.target.value)}>
                <option value="">Sélectionner</option>
                {CONGO_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <span className="lp-form-error">{errors.region}</span>}
            </div>
          </div>
        </div>

        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Coordonnées GPS</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Latitude</label>
              <input className="lp-form-input" type="number" step="any" value={values.latitude || ''} onChange={(e) => setValue('latitude', e.target.value)} />
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Longitude</label>
              <input className="lp-form-input" type="number" step="any" value={values.longitude || ''} onChange={(e) => setValue('longitude', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Responsable</h2>
          <div className="lp-form-grid">
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Nom <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerName ? 'lp-form-input--error' : ''}`} value={values.managerName || ''} onChange={(e) => setValue('managerName', e.target.value)} />
              {errors.managerName && <span className="lp-form-error">{errors.managerName}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Email <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerEmail ? 'lp-form-input--error' : ''}`} type="email" value={values.managerEmail || ''} onChange={(e) => setValue('managerEmail', e.target.value)} />
              {errors.managerEmail && <span className="lp-form-error">{errors.managerEmail}</span>}
            </div>
            <div className="lp-form-grid__field">
              <label className="lp-form-label">Téléphone <span className="lp-form-required">*</span></label>
              <input className={`lp-form-input ${errors.managerPhone ? 'lp-form-input--error' : ''}`} value={values.managerPhone || ''} onChange={(e) => setValue('managerPhone', e.target.value)} />
              {errors.managerPhone && <span className="lp-form-error">{errors.managerPhone}</span>}
            </div>
          </div>
        </div>

        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Logo</h2>
          <div className="lp-form-logo">
            {logoPreview ? (
              <div className="lp-form-logo__preview">
                <img src={logoPreview} alt="Aperçu" />
                <button className="lp-form-logo__remove" onClick={removeLogo} type="button"><X size={16} /></button>
              </div>
            ) : (
              <label className="lp-form-logo__upload">
                <Upload size={24} />
                <span>Télécharger un logo</span>
                <span className="lp-form-logo__hint">PNG, JPG — Max 2 Mo</span>
                <input type="file" accept="image/*" onChange={handleLogo} hidden />
              </label>
            )}
          </div>
        </div>

        <div className="lp-form-section">
          <h2 className="lp-form-section__title">Horaires</h2>
          <div className="lp-form-schedule">
            {days.map(({ key, label }) => {
              const closedKey = `schedule${key}Closed`;
              const openKey = `schedule${key}Open`;
              const closeKey = `schedule${key}Close`;
              return (
                <div key={key} className="lp-form-schedule__row">
                  <span className="lp-form-schedule__day">{label}</span>
                  <label className="lp-form-checkbox lp-form-checkbox--sm">
                    <input type="checkbox" checked={!!values[closedKey]} onChange={(e) => setValue(closedKey, e.target.checked)} />
                    <span>Fermé</span>
                  </label>
                  {!values[closedKey] && (
                    <div className="lp-form-schedule__times">
                      <input className="lp-form-input lp-form-input--time" type="time" value={values[openKey] || ''} onChange={(e) => setValue(openKey, e.target.value)} />
                      <span className="lp-form-schedule__sep">—</span>
                      <input className="lp-form-input lp-form-input--time" type="time" value={values[closeKey] || ''} onChange={(e) => setValue(closeKey, e.target.value)} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lp-form-page__footer">
          <Link to={`/agencies/${id}`} className="lp-form-page__cancel">Annuler</Link>
          <button className="lp-form-page__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 size={16} className="lp-btn__spinner" /> Enregistrement...</> : <><Save size={16} /> Enregistrer</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgencyEditPageWrapper;
