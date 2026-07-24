import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoadingState from '../../components/admin/LoadingState';
import { useEnterprise } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';
import './CompanyEditPage.css';

const REGIONS = [
  'Littoral', 'Centre', 'Nord-Ouest', 'Sud-Ouest', 'Adamaoua',
  'Extrême-Nord', 'Nord', 'Est', 'Ouest', 'Sud',
];

const CITIES = [
  'Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Kribi',
  'Garoua', 'Maroua', 'Bertoua', 'Limbé', 'Buea',
];

function EditForm({ enterprise, id, navigate, updateEnterprise }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => ({
    name: enterprise.name || '',
    tradeName: enterprise.tradeName || '',
    email: enterprise.email || '',
    phone: enterprise.phone || '',
    website: enterprise.website || '',
    description: enterprise.description || '',
    country: enterprise.country || 'Cameroun',
    region: enterprise.region || '',
    city: enterprise.city || '',
    address: enterprise.address || '',
    postalCode: enterprise.postalCode || '',
  }));

  const setField = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateEnterprise(id, form);
      toast.success('Entreprise mise à jour');
      navigate(`/admin/companies/${id}`);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="sa-company-edit__form" onSubmit={handleSubmit}>
      <div className="sa-company-edit__card">
        <h3 className="sa-company-edit__card-title">Informations</h3>
        <div className="sa-company-edit__grid">
          <div className="sa-company-edit__field">
            <label>Nom de l'entreprise</label>
            <input type="text" value={form.name} onChange={(e) => setField('name', e.target.value)} required />
          </div>
          <div className="sa-company-edit__field">
            <label>Nom commercial</label>
            <input type="text" value={form.tradeName} onChange={(e) => setField('tradeName', e.target.value)} />
          </div>
          <div className="sa-company-edit__field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} required />
          </div>
          <div className="sa-company-edit__field">
            <label>Téléphone</label>
            <input type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          </div>
          <div className="sa-company-edit__field">
            <label>Site web</label>
            <input type="url" value={form.website} onChange={(e) => setField('website', e.target.value)} />
          </div>
          <div className="sa-company-edit__field sa-company-edit__field--full">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={3} />
          </div>
        </div>
      </div>

      <div className="sa-company-edit__card">
        <h3 className="sa-company-edit__card-title">Adresse</h3>
        <div className="sa-company-edit__grid">
          <div className="sa-company-edit__field">
            <label>Pays</label>
            <input type="text" value={form.country} disabled />
          </div>
          <div className="sa-company-edit__field">
            <label>Région</label>
            <select value={form.region} onChange={(e) => setField('region', e.target.value)}>
              <option value="">Sélectionner</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="sa-company-edit__field">
            <label>Ville</label>
            <select value={form.city} onChange={(e) => setField('city', e.target.value)}>
              <option value="">Sélectionner</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="sa-company-edit__field">
            <label>Adresse</label>
            <input type="text" value={form.address} onChange={(e) => setField('address', e.target.value)} />
          </div>
          <div className="sa-company-edit__field">
            <label>Code postal</label>
            <input type="text" value={form.postalCode} onChange={(e) => setField('postalCode', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="sa-company-edit__actions">
        <button
          type="button"
          className="sa-company-edit__btn sa-company-edit__btn--cancel"
          onClick={() => navigate(`/admin/companies/${id}`)}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="sa-company-edit__btn sa-company-edit__btn--save"
          disabled={saving}
        >
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}

export default function CompanyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enterprise, loading, error, fetch: fetchEnterprise, update: updateEnterprise } = useEnterprise();

  useEffect(() => {
    fetchEnterprise(id);
  }, [fetchEnterprise, id]);

  if (loading && !enterprise) return <LoadingState />;
  if (error) return <div className="sa-company-edit__error">{error}</div>;
  if (!enterprise) return null;

  return (
    <div className="sa-company-edit">
      <button
        className="sa-company-edit__back"
        onClick={() => navigate(`/admin/companies/${id}`)}
      >
        <ArrowLeft size={18} />
        <span>Retour aux détails</span>
      </button>

      <h1 className="sa-company-edit__title">
        Modifier l'entreprise <span>{enterprise.name}</span>
      </h1>

      <EditForm enterprise={enterprise} id={id} navigate={navigate} updateEnterprise={updateEnterprise} />
    </div>
  );
}
