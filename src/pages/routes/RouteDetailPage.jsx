import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Edit2, XCircle, Truck, MapPin, Calendar, Clock,
  Package, Weight, FileText, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRoute, useRouteCapacity, useRouteForm } from '../../hooks/useTransportRoute';
import { mockShipmentsService } from '../../api/mockShipments';
import { useAuth } from '../../hooks/useAuth';
import RouteStatus from '../../components/routes/RouteStatus';
import RouteCapacity from '../../components/routes/RouteCapacity';
import RouteTimeline from '../../components/routes/RouteTimeline';
import RouteShipmentList from '../../components/routes/RouteShipmentList';

const TABS = [
  { key: 'info', label: 'Informations', icon: FileText },
  { key: 'capacity', label: 'Capacité', icon: Weight },
  { key: 'shipments', label: 'Expéditions', icon: Truck },
  { key: 'history', label: 'Historique', icon: Clock },
];

export function RouteDetailPage() {
  const { id } = useParams();
  const { companyId } = useAuth();
  const { route, history, loading, fetch: fetchRoute, fetchHistory, clearSelected } = useRoute();
  const { capacity, assign, remove } = useRouteCapacity();
  const { cancel } = useRouteForm();
  const [activeTab, setActiveTab] = useState('info');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [availableShipments, setAvailableShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchRoute(id);
    return () => clearSelected();
  }, [id, fetchRoute, clearSelected]);

  useEffect(() => {
    if (activeTab === 'history' && route) fetchHistory(id);
  }, [activeTab, id, route, fetchHistory]);

  const handleCancel = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler ce trajet ?')) return;
    try {
      await cancel(id);
      toast.success('Trajet annulé');
      fetchRoute(id);
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'annulation");
    }
  };

  const handleRemoveShipment = async (shipmentId) => {
    try {
      await remove(id, shipmentId);
      toast.success('Expédition retirée');
      fetchRoute(id);
    } catch (err) {
      toast.error(err.message || 'Erreur lors du retrait');
    }
  };

  const openAssignModal = useCallback(async () => {
    setShowAssignModal(true);
    setLoadingShipments(true);
    try {
      const res = await mockShipmentsService.getAll(companyId, {
        perPage: 100,
        filters: { status: 'pending' },
      });
      const assigned = (route?.shipments || []).map((s) => s.id);
      setAvailableShipments((res.data || []).filter((s) => !assigned.includes(s.id)));
    } catch {
      toast.error('Erreur lors du chargement des expéditions');
    } finally {
      setLoadingShipments(false);
    }
  }, [companyId, route]);

  const handleAssignShipment = async (shipment) => {
    setAssigning(true);
    try {
      await assign(id, shipment);
      toast.success(`${shipment.shipmentNumber} assignée avec succès`);
      setShowAssignModal(false);
      fetchRoute(id);
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'assignation");
    } finally {
      setAssigning(false);
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

  const canCancel = !['cancelled', 'completed'].includes(route.status);

  return (
    <div className="py-4 px-lg-3">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/routes" className="btn btn-outline-secondary btn-sm rounded-pill">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2">
            <h4 className="fw-bold text-dark mb-0">{route.name}</h4>
            <RouteStatus status={route.status} />
          </div>
          <small className="text-muted">{route.code}</small>
        </div>
        <div className="d-flex gap-2">
          {canCancel && (
            <button
              type="button"
              className="btn btn-outline-danger d-flex align-items-center gap-2"
              onClick={handleCancel}
            >
              <XCircle size={16} /> Annuler
            </button>
          )}
          <Link to={`/routes/${id}/edit`} className="btn btn-primary d-flex align-items-center gap-2">
            <Edit2 size={16} /> Modifier
          </Link>
        </div>
      </div>

      <div className="d-flex gap-1 mb-4 bg-white rounded-3 shadow-sm p-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`btn btn-sm d-flex align-items-center gap-2 ${activeTab === tab.key ? 'btn-primary' : 'btn-light text-dark'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h6 className="fw-semibold mb-3">Informations générales</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <DetailRow label="Nom" value={route.name} icon={<Truck size={14} />} />
              <DetailRow label="Code" value={route.code} icon={<FileText size={14} />} mono />
              <DetailRow label="Description" value={route.description || '—'} />
            </div>
            <div className="col-md-6">
              <DetailRow label="Distance" value={route.distance ? `${route.distance} km` : '—'} />
              <DetailRow label="Statut" value={<RouteStatus status={route.status} />} />
              <DetailRow label="Observation" value={route.observation || '—'} />
            </div>
          </div>

          <hr className="my-3" />
          <h6 className="fw-semibold mb-3">Parcours</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <DetailRow label="Agence de départ" value={route.originAgencyName || route.originAgencyId} icon={<MapPin size={14} className="text-primary" />} />
              <DetailRow label="Ville de départ" value={route.originCity} />
              <DetailRow label="Date de départ" value={route.departureDate ? new Date(route.departureDate).toLocaleDateString('fr-FR') : '—'} icon={<Calendar size={14} />} />
              <DetailRow label="Heure de départ" value={route.departureTime || '—'} icon={<Clock size={14} />} />
            </div>
            <div className="col-md-6">
              <DetailRow label="Agence d'arrivée" value={route.destinationAgencyName || route.destinationAgencyId} icon={<MapPin size={14} className="text-success" />} />
              <DetailRow label="Ville d'arrivée" value={route.destinationCity} />
              <DetailRow label="Date d'arrivée" value={route.arrivalDate ? new Date(route.arrivalDate).toLocaleDateString('fr-FR') : '—'} icon={<Calendar size={14} />} />
              <DetailRow label="Heure d'arrivée" value={route.arrivalTime || '—'} icon={<Clock size={14} />} />
            </div>
          </div>

          <hr className="my-3" />
          <h6 className="fw-semibold mb-3"><Package size={16} /> Capacité</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <DetailRow label="Poids" value={`${route.usedWeight || 0} / ${route.maxWeight || 0} kg`} />
              <DetailRow label="Colis" value={`${route.usedPackages || 0} / ${route.maxPackages || 0}`} />
            </div>
            <div className="col-md-6">
              <DetailRow label="Créé le" value={route.createdAt ? new Date(route.createdAt).toLocaleDateString('fr-FR') : '—'} />
              <DetailRow label="Dernière MAJ" value={route.updatedAt ? new Date(route.updatedAt).toLocaleDateString('fr-FR') : '—'} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'capacity' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h6 className="fw-semibold mb-3">Capacité du trajet</h6>
          {capacity ? (
            <div className="row g-4">
              <div className="col-md-6">
                <RouteCapacity
                  maxWeight={capacity.maxWeight}
                  usedWeight={capacity.usedWeight}
                  maxPackages={capacity.maxPackages}
                  usedPackages={capacity.usedPackages}
                />
              </div>
              <div className="col-md-6">
                <h6 className="fw-medium small text-muted mb-3">Détails</h6>
                <DetailRow label="Poids maximum" value={`${capacity.maxWeight} kg`} />
                <DetailRow label="Poids utilisé" value={`${capacity.usedWeight} kg`} />
                <DetailRow label="Poids restant" value={`${capacity.remainingWeight} kg`} />
                <DetailRow label="Poids utilisé (%)" value={`${capacity.weightPercentage}%`} />
                <hr />
                <DetailRow label="Colis maximum" value={capacity.maxPackages} />
                <DetailRow label="Colis utilisés" value={capacity.usedPackages} />
                <DetailRow label="Colis restants" value={capacity.remainingPackages} />
                <DetailRow label="Colis utilisés (%)" value={`${capacity.packagesPercentage}%`} />
                <hr />
                <DetailRow
                  label="Statut"
                  value={capacity.isFull ? (
                    <span className="badge bg-danger">Pleine</span>
                  ) : (
                    <span className="badge bg-success">Disponible</span>
                  )}
                />
              </div>
            </div>
          ) : (
            <p className="text-muted small">Chargement...</p>
          )}
        </div>
      )}

      {activeTab === 'shipments' && (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">Expéditions assignées</h6>
            {canCancel && (
              <button
                type="button"
                className="btn btn-sm btn-primary d-flex align-items-center gap-2"
                onClick={openAssignModal}
              >
                <Truck size={14} /> Assigner
              </button>
            )}
          </div>
          <RouteShipmentList
            shipments={route.shipments || []}
            onRemove={canCancel ? handleRemoveShipment : undefined}
            disabled={!canCancel}
          />
        </div>
      )}

      {activeTab === 'history' && (
        <RouteTimeline history={history} loading={loading} />
      )}

      {showAssignModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title fw-semibold">Assigner une expédition</h6>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)} />
              </div>
              <div className="modal-body">
                {loadingShipments ? (
                  <div className="text-center py-4">
                    <Loader2 size={24} className="spinner-border text-primary" />
                    <p className="text-muted small mt-2 mb-0">Chargement...</p>
                  </div>
                ) : availableShipments.length === 0 ? (
                  <p className="text-muted text-center py-4 mb-0">
                    Aucune expédition disponible pour assignation
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>N° Expédition</th>
                          <th>Expéditeur</th>
                          <th>Destinataire</th>
                          <th className="text-center">Colis</th>
                          <th>Poids</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableShipments.map((s) => (
                          <tr key={s.id}>
                            <td><code className="small fw-semibold">{s.shipmentNumber}</code></td>
                            <td className="small">{s.senderName}</td>
                            <td className="small">{s.receiverName}</td>
                            <td className="small text-center">{s.packageCount}</td>
                            <td className="small">{s.totalWeight} kg</td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"
                                disabled={assigning}
                                onClick={() => handleAssignShipment(s)}
                              >
                                {assigning ? <Loader2 size={14} className="spinner-border-sm" /> : 'Assigner'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, icon, mono = false }) {
  return (
    <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
      <span className="text-muted small d-flex align-items-center gap-1">
        {icon} {label}
      </span>
      <span className={`small fw-medium text-end ${mono ? 'font-monospace' : ''}`}>
        {value}
      </span>
    </div>
  );
}

export default RouteDetailPage;
