import { create } from 'zustand';
import { trackingService } from '../api/trackingService';

const STATUS_FROM_TYPE = {
  creation: 'registered',
  validation: 'validated',
  enregistrement: 'preparing',
  paiement: 'pending',
  affectation: 'assigned',
  chargement: 'loading',
  depart: 'in_transit',
  transport: 'in_transit',
  arrivee: 'arrived',
  disponible: 'available_pickup',
  retrait: 'collected',
  livraison: 'delivered',
  annulation: 'cancelled',
};

function deriveNextStep(status) {
  const map = {
    registered: { label: 'En préparation', description: 'Le colis sera préparé pour le transport' },
    preparing: { label: 'En transit', description: 'Le colis prendra la route vers la destination' },
    in_transit: { label: 'Arrivée', description: 'Arrivée du colis à l\'agence de destination' },
    arrived: { label: 'Disponible', description: 'Le colis sera disponible pour retrait' },
    available_pickup: { label: 'Récupéré', description: 'Le destinataire récupérera le colis' },
    delivered: { label: 'Terminé', description: 'Livraison finalisée' },
    collected: { label: 'Terminé', description: 'Livraison finalisée' },
    cancelled: { label: 'Annulé', description: 'Cette expédition a été annulée' },
  };
  return map[status] || { label: 'En attente', description: 'Mise à jour prochaine' };
}

const useClientTrackingStore = create((set) => ({
  result: null,
  loading: false,
  error: null,
  searched: false,
  lastQuery: '',

  track: async (trackingNumber) => {
    const query = trackingNumber.trim();
    if (!query) {
      set({ error: 'Veuillez saisir un numéro de suivi.' });
      return null;
    }
    set({ loading: true, error: null, searched: false, lastQuery: query });
    try {
      const flat = await trackingService.trackPublic(query);
      if (!flat) {
        set({ loading: false, result: null, searched: true });
        return null;
      }
      const result = {
        parcel: {
          id: flat.id,
          trackingNumber: flat.trackingNumber,
          status: flat.status,
          updatedAt: flat.updatedAt,
        },
        shipment: {
          origin: flat.originCity,
          destination: flat.destinationCity,
          estimatedDeliveryDate: flat.estimatedDelivery,
        },
        originAgency: { name: flat.originCity },
        currentAgency: { name: flat.currentAgency || flat.currentCity || flat.destinationCity },
        estimatedDeliveryDate: flat.estimatedDelivery,
        nextStep: deriveNextStep(flat.status),
        history: (flat.timeline || []).map((e) => ({
          id: e.id,
          status: STATUS_FROM_TYPE[e.type] || 'validated',
          description: e.label,
          date: e.timestamp,
          location: e.agency || e.city || '',
          agentName: '',
        })),
      };
      set({ loading: false, result, searched: true });
      return result;
    } catch (err) {
      set({ loading: false, error: err.message, searched: true });
      return null;
    }
  },

  reset: () => set({ result: null, error: null, searched: false, lastQuery: '', loading: false }),
}));

export default useClientTrackingStore;
