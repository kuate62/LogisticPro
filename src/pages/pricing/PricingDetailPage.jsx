import { useEffect, useState } from 'react';
import { ArrowLeft, Edit, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usePricing, usePricingForm } from '../../hooks/usePricing';
import PricingSummary from '../../components/pricing/PricingSummary';
import PricingHistory from '../../components/pricing/PricingHistory';
import ClientSkeleton from '../../components/clients/ClientSkeleton';

const TABS = [
  { key: 'info', label: 'Informations' },
  { key: 'history', label: 'Historique' },
];

export default function PricingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pricing, loading, history, fetch, fetchHistory, clearSelected } = usePricing();
  const { activate, deactivate, duplicate } = usePricingForm();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => { fetch(id); return () => clearSelected(); }, [id, fetch, clearSelected]);
  useEffect(() => { if (activeTab === 'history') fetchHistory(id); }, [activeTab, id, fetchHistory]);

  if (loading.detail || !pricing) return <ClientSkeleton />;

  const handleToggleStatus = async () => {
    try {
      if (pricing.status === 'active') {
        await deactivate(id);
        toast.success('Tarif désactivé');
      } else {
        await activate(id);
        toast.success('Tarif activé');
      }
      fetch(id);
    } catch {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handleDuplicate = async () => {
    try {
      await duplicate(id);
      toast.success('Tarif dupliqué avec succès');
      navigate('/pricing');
    } catch {
      toast.error('Erreur lors de la duplication');
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/pricing" className="btn btn-outline-secondary btn-sm rounded-pill"><ArrowLeft size={16} /></Link>
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-1">{pricing.name}</h4>
          <p className="text-muted mb-0 small">{pricing.code} — {pricing.originCity} → {pricing.destinationCity}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/pricing/${id}/edit`} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"><Edit size={14} /> Modifier</Link>
          {pricing.status === 'active' ? (
            <button type="button" className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1" onClick={handleToggleStatus}><ToggleLeft size={14} /> Désactiver</button>
          ) : (
            <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center gap-1" onClick={handleToggleStatus}><ToggleRight size={14} /> Activer</button>
          )}
          <button type="button" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={handleDuplicate}><Copy size={14} /> Dupliquer</button>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        {TABS.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button type="button" className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
          </li>
        ))}
      </ul>

      {activeTab === 'info' && <PricingSummary pricing={pricing} />}
      {activeTab === 'history' && <PricingHistory history={history} loading={loading.history} />}
    </div>
  );
}
