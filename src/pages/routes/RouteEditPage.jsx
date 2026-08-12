import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRoute, useRouteForm } from '../../hooks/useTransportRoute';
import { routeFormSchema, routeToFormValues, routeFormValuesToPayload } from '../../helpers/routeValidation';
import { agenciesService } from '../../api/agenciesService';
import { useAuth } from '../../hooks/useAuth';

export function RouteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companyId } = useAuth();
  const { route, loading, fetch, clearSelected } = useRoute();
  const { update } = useRouteForm();
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetch(id);
    return () => clearSelected();
  }, [id, fetch, clearSelected]);

  useEffect(() => {
    agenciesService.getAll(companyId, { perPage: 100 }).then((res) => setAgencies(res.data || []));
  }, [companyId]);

  const {
    register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(routeFormSchema),
  });

  useEffect(() => {
    if (route) reset(routeToFormValues(route));
  }, [route, reset]);

  const originAgencyId = watch('originAgencyId');
  const destinationAgencyId = watch('destinationAgencyId');

  const handleOriginAgency = (e) => {
    const agencyId = e.target.value;
    setValue('originAgencyId', agencyId, { shouldValidate: true });
    const agency = agencies.find((a) => a.id === agencyId);
    if (agency) setValue('originCity', agency.city, { shouldValidate: true });
  };

  const handleDestinationAgency = (e) => {
    const agencyId = e.target.value;
    setValue('destinationAgencyId', agencyId, { shouldValidate: true });
    const agency = agencies.find((a) => a.id === agencyId);
    if (agency) setValue('destinationCity', agency.city, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const payload = routeFormValuesToPayload(data);
      await update(id, payload);
      toast.success('Trajet modifié avec succès');
      navigate('/routes');
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la modification');
    }
  };

  if (loading) {
    return (
      <div className="py-4 px-lg-3">
        <div className="bg-white rounded-3 shadow-sm p-5 text-center">
          <Loader2 size={32} className="spinner-border text-primary" />
          <p className="text-muted mt-2 mb-0">Chargement du trajet...</p>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="py-4 px-lg-3">
        <div className="bg-white rounded-3 shadow-sm p-5 text-center">
          <p className="text-muted mb-0">Trajet non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-lg-3">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/routes" className="btn btn-outline-secondary btn-sm rounded-pill">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h4 className="fw-bold text-dark mb-0">Modifier — {route.name}</h4>
          <small className="text-muted">{route.code}</small>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 className="fw-semibold mb-3">Informations générales</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-medium">Nom du trajet <span className="text-danger">*</span></label>
              <input
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                {...register('name')}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-medium">Description</label>
              <input
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                {...register('description')}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 className="fw-semibold mb-3">Départ</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-medium">Agence de départ <span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.originAgencyId ? 'is-invalid' : ''}`}
                value={originAgencyId || ''}
                onChange={handleOriginAgency}
              >
                <option value="">Sélectionner une agence</option>
                {agencies.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              {errors.originAgencyId && <div className="invalid-feedback">{errors.originAgencyId.message}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-medium">Ville de départ <span className="text-danger">*</span></label>
              <input
                className={`form-control ${errors.originCity ? 'is-invalid' : ''}`}
                {...register('originCity')}
              />
              {errors.originCity && <div className="invalid-feedback">{errors.originCity.message}</div>}
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Date <span className="text-danger">*</span></label>
              <input
                type="date"
                className={`form-control ${errors.departureDate ? 'is-invalid' : ''}`}
                {...register('departureDate')}
              />
              {errors.departureDate && <div className="invalid-feedback">{errors.departureDate.message}</div>}
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Heure <span className="text-danger">*</span></label>
              <input
                type="time"
                className={`form-control ${errors.departureTime ? 'is-invalid' : ''}`}
                {...register('departureTime')}
              />
              {errors.departureTime && <div className="invalid-feedback">{errors.departureTime.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 className="fw-semibold mb-3">Arrivée</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-medium">Agence d'arrivée <span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.destinationAgencyId ? 'is-invalid' : ''}`}
                value={destinationAgencyId || ''}
                onChange={handleDestinationAgency}
              >
                <option value="">Sélectionner une agence</option>
                {agencies.filter((a) => a.id !== originAgencyId).map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              {errors.destinationAgencyId && <div className="invalid-feedback">{errors.destinationAgencyId.message}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-medium">Ville d'arrivée <span className="text-danger">*</span></label>
              <input
                className={`form-control ${errors.destinationCity ? 'is-invalid' : ''}`}
                {...register('destinationCity')}
              />
              {errors.destinationCity && <div className="invalid-feedback">{errors.destinationCity.message}</div>}
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Date <span className="text-danger">*</span></label>
              <input
                type="date"
                className={`form-control ${errors.arrivalDate ? 'is-invalid' : ''}`}
                {...register('arrivalDate')}
              />
              {errors.arrivalDate && <div className="invalid-feedback">{errors.arrivalDate.message}</div>}
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Heure <span className="text-danger">*</span></label>
              <input
                type="time"
                className={`form-control ${errors.arrivalTime ? 'is-invalid' : ''}`}
                {...register('arrivalTime')}
              />
              {errors.arrivalTime && <div className="invalid-feedback">{errors.arrivalTime.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 className="fw-semibold mb-3">Capacité</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-medium">Poids maximal (kg) <span className="text-danger">*</span></label>
              <input
                type="number"
                className={`form-control ${errors.maxWeight ? 'is-invalid' : ''}`}
                {...register('maxWeight')}
              />
              {errors.maxWeight && <div className="invalid-feedback">{errors.maxWeight.message}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-medium">Nombre maximal de colis <span className="text-danger">*</span></label>
              <input
                type="number"
                className={`form-control ${errors.maxPackages ? 'is-invalid' : ''}`}
                {...register('maxPackages')}
              />
              {errors.maxPackages && <div className="invalid-feedback">{errors.maxPackages.message}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 className="fw-semibold mb-3">Observation</h6>
          <textarea
            className={`form-control ${errors.observation ? 'is-invalid' : ''}`}
            rows={3}
            {...register('observation')}
          />
          {errors.observation && <div className="invalid-feedback">{errors.observation.message}</div>}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Link to="/routes" className="btn btn-outline-secondary">Annuler</Link>
          <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 size={16} className="spinner-border-sm" /> : <Save size={16} />}
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RouteEditPage;
