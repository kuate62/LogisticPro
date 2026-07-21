import { ArrowLeft, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { usePricingForm } from '../../hooks/usePricing';
import { pricingFormSchema, pricingFormValuesToPayload } from '../../helpers/pricingValidation';
import { PRICING_CATEGORIES } from '../../config/constants';

export default function PricingCreatePage() {
  const { create } = usePricingForm();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      name: '',
      originAgencyId: '',
      originCity: '',
      destinationAgencyId: '',
      destinationCity: '',
      category: '',
      minWeight: 0,
      maxWeight: 100,
      unitPrice: 0,
      fixedPrice: 0,
      insuranceRate: 0.05,
      additionalFees: 0,
      currency: 'FC',
      effectiveFrom: '',
      effectiveTo: '',
      observation: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = pricingFormValuesToPayload(values);
      await create(payload);
      toast.success('Tarif créé avec succès');
      navigate('/pricing');
    } catch {
      toast.error('Erreur lors de la création du tarif');
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/pricing" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2"><DollarSign size={22} className="text-primary" /> Nouveau tarif</h4>
          <p className="text-muted mb-0 small">Définir un nouveau tarif de transport</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3">Informations générales</h6>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label small text-muted">Nom du tarif *</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name')} placeholder="Ex: Tarif standard Kinshasa-Lubumbashi" />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3">Itinéraire</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">Ville de départ *</label>
              <input type="text" className={`form-control ${errors.originCity ? 'is-invalid' : ''}`} {...register('originCity')} placeholder="Ex: Kinshasa" />
              {errors.originCity && <div className="invalid-feedback">{errors.originCity.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Ville d'arrivée *</label>
              <input type="text" className={`form-control ${errors.destinationCity ? 'is-invalid' : ''}`} {...register('destinationCity')} placeholder="Ex: Lubumbashi" />
              {errors.destinationCity && <div className="invalid-feedback">{errors.destinationCity.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Agence de départ (optionnel)</label>
              <input type="text" className={`form-control ${errors.originAgencyId ? 'is-invalid' : ''}`} {...register('originAgencyId')} placeholder="ID agence" />
              {errors.originAgencyId && <div className="invalid-feedback">{errors.originAgencyId.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Agence d'arrivée (optionnel)</label>
              <input type="text" className={`form-control ${errors.destinationAgencyId ? 'is-invalid' : ''}`} {...register('destinationAgencyId')} placeholder="ID agence" />
              {errors.destinationAgencyId && <div className="invalid-feedback">{errors.destinationAgencyId.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3">Tarification</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">Catégorie *</label>
              <select className={`form-select ${errors.category ? 'is-invalid' : ''}`} {...register('category')}>
                <option value="">Sélectionner une catégorie</option>
                {PRICING_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted">Poids minimum (kg) *</label>
              <input type="number" step="0.1" className={`form-control ${errors.minWeight ? 'is-invalid' : ''}`} {...register('minWeight')} />
              {errors.minWeight && <div className="invalid-feedback">{errors.minWeight.message}</div>}
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted">Poids maximum (kg) *</label>
              <input type="number" step="0.1" className={`form-control ${errors.maxWeight ? 'is-invalid' : ''}`} {...register('maxWeight')} />
              {errors.maxWeight && <div className="invalid-feedback">{errors.maxWeight.message}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label small text-muted">Prix unitaire (FC/kg) *</label>
              <input type="number" step="0.01" className={`form-control ${errors.unitPrice ? 'is-invalid' : ''}`} {...register('unitPrice')} />
              {errors.unitPrice && <div className="invalid-feedback">{errors.unitPrice.message}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label small text-muted">Prix fixe (FC)</label>
              <input type="number" step="0.01" className={`form-control ${errors.fixedPrice ? 'is-invalid' : ''}`} {...register('fixedPrice')} />
              {errors.fixedPrice && <div className="invalid-feedback">{errors.fixedPrice.message}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label small text-muted">Taux d'assurance (0-1) *</label>
              <input type="number" step="0.01" min="0" max="1" className={`form-control ${errors.insuranceRate ? 'is-invalid' : ''}`} {...register('insuranceRate')} />
              {errors.insuranceRate && <div className="invalid-feedback">{errors.insuranceRate.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Frais supplémentaires (FC)</label>
              <input type="number" step="0.01" className={`form-control ${errors.additionalFees ? 'is-invalid' : ''}`} {...register('additionalFees')} />
              {errors.additionalFees && <div className="invalid-feedback">{errors.additionalFees.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Devise *</label>
              <select className={`form-select ${errors.currency ? 'is-invalid' : ''}`} {...register('currency')}>
                <option value="FC">FC (Franc congolais)</option>
                <option value="USD">USD (Dollar américain)</option>
              </select>
              {errors.currency && <div className="invalid-feedback">{errors.currency.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3">Période de validité</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">Date d'entrée en vigueur *</label>
              <input type="date" className={`form-control ${errors.effectiveFrom ? 'is-invalid' : ''}`} {...register('effectiveFrom')} />
              {errors.effectiveFrom && <div className="invalid-feedback">{errors.effectiveFrom.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Date de fin (optionnel)</label>
              <input type="date" className={`form-control ${errors.effectiveTo ? 'is-invalid' : ''}`} {...register('effectiveTo')} />
              {errors.effectiveTo && <div className="invalid-feedback">{errors.effectiveTo.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3">Observation</h6>
          <textarea className={`form-control ${errors.observation ? 'is-invalid' : ''}`} rows="3" {...register('observation')} placeholder="Notes ou remarques sur ce tarif..." />
          {errors.observation && <div className="invalid-feedback">{errors.observation.message}</div>}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Link to="/pricing" className="btn btn-outline-secondary">Annuler</Link>
          <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner-border spinner-border-sm" /> : <DollarSign size={16} />}
            Créer le tarif
          </button>
        </div>
      </form>
    </div>
  );
}
