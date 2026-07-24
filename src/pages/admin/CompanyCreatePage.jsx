import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useEnterprises, usePlans } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';
import './CompanyCreatePage.css';

const STEPS = ['Informations', 'Adresse', 'Abonnement', 'Administrateur', 'Validation'];

const REGIONS = [
  'Littoral', 'Centre', 'Nord-Ouest', 'Sud-Ouest', 'Adamaoua',
  'Extrême-Nord', 'Nord', 'Est', 'Ouest', 'Sud',
];

const CITIES = [
  'Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Kribi',
  'Garoua', 'Maroua', 'Bertoua', 'Limbé', 'Buea',
];

const EMPTY = {
  name: '', tradeName: '', email: '', phone: '', website: '', description: '',
  country: 'Cameroun', region: '', city: '', address: '', postalCode: '',
  planId: '',
  responsible: { firstName: '', lastName: '', email: '', phone: '', position: '' },
};

export default function CompanyCreatePage() {
  const navigate = useNavigate();
  const { createEnterprise } = useEnterprises();
  const { plans, fetchPlans } = usePlans();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const updateResp = (field, value) =>
    setForm((p) => ({ ...p, responsible: { ...p.responsible, [field]: value } }));

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.email.trim();
    if (step === 1) return form.region && form.city;
    if (step === 2) return form.planId;
    if (step === 3) return form.responsible.firstName.trim() && form.responsible.lastName.trim() && form.responsible.email.trim();
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createEnterprise({
        name: form.name,
        tradeName: form.tradeName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        description: form.description,
        city: form.city,
        address: form.address,
        postalCode: form.postalCode,
        region: form.region,
        country: form.country,
        planId: form.planId,
        responsible: form.responsible,
      });
      toast.success('Entreprise créée avec succès');
      navigate('/admin/companies');
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (v) =>
    new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits: 0 }).format(v);

  const selectedPlan = plans.find((p) => p.id === form.planId);

  return (
    <div className="sa-company-create">
      <div className="sa-company-create__steps">
        {STEPS.map((s, i) => (
          <div key={s} className="sa-company-create__step-wrapper">
            <div
              className={`sa-company-create__step ${i === step ? 'sa-company-create__step--active' : ''} ${i < step ? 'sa-company-create__step--done' : ''}`}
            >
              <div className="sa-company-create__step-circle">
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className="sa-company-create__step-label">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`sa-company-create__step-line ${i < step ? 'sa-company-create__step-line--done' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <div className="sa-company-create__form-card">
        {step === 0 && (
          <div className="sa-company-create__form-section">
            <h3 className="sa-company-create__section-title">Informations de l'entreprise</h3>
            <div className="sa-company-create__form-grid">
              <div className="sa-company-create__field">
                <label>Nom de l'entreprise *</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Nom complet" />
              </div>
              <div className="sa-company-create__field">
                <label>Nom commercial</label>
                <input type="text" value={form.tradeName} onChange={(e) => update('tradeName', e.target.value)} placeholder="Sigle ou nom commercial" />
              </div>
              <div className="sa-company-create__field">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="contact@entreprise.cm" />
              </div>
              <div className="sa-company-create__field">
                <label>Téléphone</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+237 6XX XXX XXX" />
              </div>
              <div className="sa-company-create__field">
                <label>Site web</label>
                <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)} placeholder="https://..." />
              </div>
              <div className="sa-company-create__field sa-company-create__field--full">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} placeholder="Description de l'entreprise..." />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="sa-company-create__form-section">
            <h3 className="sa-company-create__section-title">Adresse</h3>
            <div className="sa-company-create__form-grid">
              <div className="sa-company-create__field">
                <label>Pays</label>
                <input type="text" value={form.country} disabled />
              </div>
              <div className="sa-company-create__field">
                <label>Région *</label>
                <select value={form.region} onChange={(e) => update('region', e.target.value)}>
                  <option value="">Sélectionner une région</option>
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="sa-company-create__field">
                <label>Ville *</label>
                <select value={form.city} onChange={(e) => update('city', e.target.value)}>
                  <option value="">Sélectionner une ville</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sa-company-create__field">
                <label>Adresse</label>
                <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Rue, quartier..." />
              </div>
              <div className="sa-company-create__field">
                <label>Code postal</label>
                <input type="text" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder="23700" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="sa-company-create__form-section">
            <h3 className="sa-company-create__section-title">Choisir un plan</h3>
            <div className="sa-company-create__plans">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className={`sa-company-create__plan-card ${form.planId === plan.id ? 'sa-company-create__plan-card--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={form.planId === plan.id}
                    onChange={(e) => update('planId', e.target.value)}
                    className="sa-company-create__plan-radio"
                  />
                  <div className="sa-company-create__plan-name">{plan.name}</div>
                  <div className="sa-company-create__plan-price">
                    {formatCurrency(plan.price)} <small>FCFA/mois</small>
                  </div>
                  {plan.description && <p className="sa-company-create__plan-desc">{plan.description}</p>}
                  <ul className="sa-company-create__plan-features">
                    {plan.features?.slice(0, 4).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="sa-company-create__form-section">
            <h3 className="sa-company-create__section-title">Administrateur</h3>
            <div className="sa-company-create__form-grid">
              <div className="sa-company-create__field">
                <label>Prénom *</label>
                <input type="text" value={form.responsible.firstName} onChange={(e) => updateResp('firstName', e.target.value)} placeholder="Prénom" />
              </div>
              <div className="sa-company-create__field">
                <label>Nom *</label>
                <input type="text" value={form.responsible.lastName} onChange={(e) => updateResp('lastName', e.target.value)} placeholder="Nom" />
              </div>
              <div className="sa-company-create__field">
                <label>Email *</label>
                <input type="email" value={form.responsible.email} onChange={(e) => updateResp('email', e.target.value)} placeholder="admin@entreprise.cm" />
              </div>
              <div className="sa-company-create__field">
                <label>Téléphone</label>
                <input type="tel" value={form.responsible.phone} onChange={(e) => updateResp('phone', e.target.value)} placeholder="+237 6XX XXX XXX" />
              </div>
              <div className="sa-company-create__field">
                <label>Poste</label>
                <input type="text" value={form.responsible.position} onChange={(e) => updateResp('position', e.target.value)} placeholder="Directeur Général" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="sa-company-create__form-section">
            <h3 className="sa-company-create__section-title">Récapitulatif</h3>
            <div className="sa-company-create__summary">
              <div className="sa-company-create__summary-group">
                <h4>Entreprise</h4>
                <div className="sa-company-create__summary-row"><span>Nom</span><span>{form.name}</span></div>
                <div className="sa-company-create__summary-row"><span>Commercial</span><span>{form.tradeName || '-'}</span></div>
                <div className="sa-company-create__summary-row"><span>Email</span><span>{form.email}</span></div>
                <div className="sa-company-create__summary-row"><span>Téléphone</span><span>{form.phone || '-'}</span></div>
                <div className="sa-company-create__summary-row"><span>Site web</span><span>{form.website || '-'}</span></div>
              </div>
              <div className="sa-company-create__summary-group">
                <h4>Adresse</h4>
                <div className="sa-company-create__summary-row"><span>Pays</span><span>{form.country}</span></div>
                <div className="sa-company-create__summary-row"><span>Région</span><span>{form.region}</span></div>
                <div className="sa-company-create__summary-row"><span>Ville</span><span>{form.city}</span></div>
                <div className="sa-company-create__summary-row"><span>Adresse</span><span>{form.address || '-'}</span></div>
                <div className="sa-company-create__summary-row"><span>Code postal</span><span>{form.postalCode || '-'}</span></div>
              </div>
              <div className="sa-company-create__summary-group">
                <h4>Abonnement</h4>
                <div className="sa-company-create__summary-row">
                  <span>Plan</span>
                  <span>{selectedPlan?.name || form.planId}</span>
                </div>
                {selectedPlan && (
                  <div className="sa-company-create__summary-row">
                    <span>Prix</span>
                    <span>{formatCurrency(selectedPlan.price)} FCFA/mois</span>
                  </div>
                )}
              </div>
              <div className="sa-company-create__summary-group">
                <h4>Administrateur</h4>
                <div className="sa-company-create__summary-row"><span>Nom</span><span>{form.responsible.firstName} {form.responsible.lastName}</span></div>
                <div className="sa-company-create__summary-row"><span>Email</span><span>{form.responsible.email}</span></div>
                <div className="sa-company-create__summary-row"><span>Téléphone</span><span>{form.responsible.phone || '-'}</span></div>
                <div className="sa-company-create__summary-row"><span>Poste</span><span>{form.responsible.position || '-'}</span></div>
              </div>
            </div>
          </div>
        )}

        <div className="sa-company-create__nav">
          {step > 0 && (
            <button className="sa-company-create__nav-btn sa-company-create__nav-btn--prev" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} />
              Précédent
            </button>
          )}
          <div className="sa-company-create__nav-spacer" />
          {step < STEPS.length - 1 ? (
            <button
              className="sa-company-create__nav-btn sa-company-create__nav-btn--next"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
            >
              Suivant
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="sa-company-create__nav-btn sa-company-create__nav-btn--submit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Création...' : 'Créer l\'entreprise'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
