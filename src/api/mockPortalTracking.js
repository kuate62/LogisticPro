const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const trackingDB = [
  {
    id: 'trk_001', trackingNumber: 'SUI-20260701-001',
    shipmentNumber: 'EXP-20260701-0001',
    senderName: 'Jean Kabongo', receiverName: 'Pierre Mukendi',
    originCity: 'Douala', destinationCity: 'Yaoundé',
    currentCity: 'Yaoundé', currentAgency: 'Agence Yaoundé',
    status: 'delivered', packageCount: 3, totalWeight: 58,
    createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-07-05T14:00:00Z',
    estimatedDelivery: null,
    observation: '',
    timeline: [
      { id: 'evt_001', type: 'creation', label: 'Expédition créée', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-01T08:00:00Z' },
      { id: 'evt_002', type: 'enregistrement', label: 'Colis enregistrés (3 colis)', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-01T08:15:00Z' },
      { id: 'evt_003', type: 'paiement', label: 'Paiement validé — 170 000 FCFA', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-01T09:00:00Z' },
      { id: 'evt_004', type: 'affectation', label: 'Affecté au trajet Douala → Yaoundé', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-01T09:30:00Z' },
      { id: 'evt_005', type: 'chargement', label: 'Chargé dans le véhicule', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-01T18:00:00Z' },
      { id: 'evt_006', type: 'depart', label: 'Départ de l\'agence', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-02T06:00:00Z' },
      { id: 'evt_007', type: 'transport', label: 'En cours de transport', city: '', agency: '', timestamp: '2026-07-03T12:00:00Z' },
      { id: 'evt_008', type: 'arrivee', label: 'Arrivée à l\'agence de destination', city: 'Yaoundé', agency: 'Agence Yaoundé', timestamp: '2026-07-05T10:00:00Z' },
      { id: 'evt_009', type: 'disponible', label: 'Disponible au retrait', city: 'Yaoundé', agency: 'Agence Yaoundé', timestamp: '2026-07-05T11:00:00Z' },
      { id: 'evt_010', type: 'retrait', label: 'Retiré par le destinataire', city: 'Yaoundé', agency: 'Agence Yaoundé', timestamp: '2026-07-05T14:00:00Z' },
    ],
  },
  {
    id: 'trk_002', trackingNumber: 'SUI-20260710-002',
    shipmentNumber: 'EXP-20260710-0002',
    senderName: 'Chantal Ilunga', receiverName: 'Jean Kabongo',
    originCity: 'Bamenda', destinationCity: 'Douala',
    currentCity: '', currentAgency: 'En transit',
    status: 'in_transit', packageCount: 2, totalWeight: 42,
    createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-12T06:00:00Z',
    estimatedDelivery: '2026-07-16',
    observation: '',
    timeline: [
      { id: 'evt_011', type: 'creation', label: 'Expédition créée', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T10:00:00Z' },
      { id: 'evt_012', type: 'enregistrement', label: 'Colis enregistrés (2 colis)', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T10:15:00Z' },
      { id: 'evt_013', type: 'paiement', label: 'Paiement validé — 95 000 FCFA', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T10:30:00Z' },
      { id: 'evt_014', type: 'affectation', label: 'Affecté au trajet Bamenda → Douala', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T11:00:00Z' },
      { id: 'evt_015', type: 'chargement', label: 'Chargé dans le véhicule', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T18:00:00Z' },
      { id: 'evt_016', type: 'depart', label: 'Départ de l\'agence', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-10T18:30:00Z' },
      { id: 'evt_017', type: 'transport', label: 'En cours de transport', city: '', agency: '', timestamp: '2026-07-12T06:00:00Z' },
    ],
  },
  {
    id: 'trk_003', trackingNumber: 'SUI-20260715-003',
    shipmentNumber: 'EXP-20260715-0003',
    senderName: 'Pierre Mukendi', receiverName: 'Esther Mbuyi',
    originCity: 'Douala', destinationCity: 'Kribi',
    currentCity: 'Douala', currentAgency: 'Agence Garoua',
    status: 'pending_payment', packageCount: 1, totalWeight: 3,
    createdAt: '2026-07-15T09:00:00Z', updatedAt: '2026-07-15T09:10:00Z',
    estimatedDelivery: null,
    observation: 'En attente de paiement',
    timeline: [
      { id: 'evt_018', type: 'creation', label: 'Expédition créée', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-15T09:00:00Z' },
      { id: 'evt_019', type: 'enregistrement', label: 'Colis enregistré (1 colis — documents)', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-15T09:10:00Z' },
    ],
  },
  {
    id: 'trk_004', trackingNumber: 'SUI-20260706-004',
    shipmentNumber: 'EXP-20260706-0014',
    senderName: 'Chantal Ilunga', receiverName: 'Véronique Kayembe',
    originCity: 'Bamenda', destinationCity: 'Douala',
    currentCity: 'Douala', currentAgency: 'Agence Centrale',
    status: 'delivered', packageCount: 2, totalWeight: 7,
    createdAt: '2026-07-06T06:00:00Z', updatedAt: '2026-07-12T10:00:00Z',
    estimatedDelivery: null,
    observation: '',
    timeline: [
      { id: 'evt_020', type: 'creation', label: 'Expédition créée', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-06T06:00:00Z' },
      { id: 'evt_021', type: 'paiement', label: 'Paiement validé — 960 000 FCFA', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-06T07:00:00Z' },
      { id: 'evt_022', type: 'affectation', label: 'Affecté au trajet Bamenda → Douala', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-06T08:00:00Z' },
      { id: 'evt_023', type: 'depart', label: 'Départ de l\'agence', city: 'Bamenda', agency: 'Agence Bamenda', timestamp: '2026-07-06T18:00:00Z' },
      { id: 'evt_024', type: 'arrivee', label: 'Arrivée à l\'agence de destination', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-12T08:00:00Z' },
      { id: 'evt_025', type: 'disponible', label: 'Disponible au retrait', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-12T09:00:00Z' },
      { id: 'evt_026', type: 'retrait', label: 'Retiré par le destinataire', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-12T10:00:00Z' },
    ],
  },
  {
    id: 'trk_005', trackingNumber: 'SUI-20260703-005',
    shipmentNumber: 'EXP-20260703-0012',
    senderName: 'Rodrigue Ngoy', receiverName: 'Lucien Molua',
    originCity: 'Douala', destinationCity: 'Yaoundé',
    currentCity: 'Yaoundé', currentAgency: 'Agence Yaoundé',
    status: 'delivered', packageCount: 1, totalWeight: 15,
    createdAt: '2026-07-03T08:30:00Z', updatedAt: '2026-07-08T12:00:00Z',
    estimatedDelivery: null,
    observation: '',
    timeline: [
      { id: 'evt_027', type: 'creation', label: 'Expédition créée', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-03T08:30:00Z' },
      { id: 'evt_028', type: 'paiement', label: 'Paiement validé — 45 500 FCFA', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-03T09:00:00Z' },
      { id: 'evt_029', type: 'affectation', label: 'Affecté au trajet Douala → Yaoundé', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-03T09:30:00Z' },
      { id: 'evt_030', type: 'depart', label: 'Départ de l\'agence', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-03T18:00:00Z' },
      { id: 'evt_031', type: 'arrivee', label: 'Arrivée à l\'agence de destination', city: 'Yaoundé', agency: 'Agence Yaoundé', timestamp: '2026-07-08T10:00:00Z' },
      { id: 'evt_032', type: 'retrait', label: 'Retiré par le destinataire', city: 'Yaoundé', agency: 'Agence Yaoundé', timestamp: '2026-07-08T12:00:00Z' },
    ],
  },
  {
    id: 'trk_006', trackingNumber: 'SUI-20260702-006',
    shipmentNumber: 'EXP-20260702-0011',
    senderName: 'Céline Wa Mukendi', receiverName: 'Sandrine Kavira',
    originCity: 'Douala', destinationCity: 'Kribi',
    currentCity: '', currentAgency: 'En transit',
    status: 'in_transit', packageCount: 2, totalWeight: 13,
    createdAt: '2026-07-02T07:00:00Z', updatedAt: '2026-07-04T06:00:00Z',
    estimatedDelivery: '2026-07-10',
    observation: 'Médicaments — priorité',
    timeline: [
      { id: 'evt_033', type: 'creation', label: 'Expédition créée', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-02T07:00:00Z' },
      { id: 'evt_034', type: 'paiement', label: 'Paiement validé — 90 000 FCFA', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-02T07:30:00Z' },
      { id: 'evt_035', type: 'affectation', label: 'Affecté au trajet Douala → Kribi', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-02T08:00:00Z' },
      { id: 'evt_036', type: 'depart', label: 'Départ de l\'agence', city: 'Douala', agency: 'Agence Garoua', timestamp: '2026-07-02T18:00:00Z' },
      { id: 'evt_037', type: 'transport', label: 'En cours de transport', city: '', agency: '', timestamp: '2026-07-04T06:00:00Z' },
    ],
  },
  {
    id: 'trk_007', trackingNumber: 'SUI-20260712-007',
    shipmentNumber: 'EXP-20260711-0018',
    senderName: 'Alain Kapela', receiverName: 'Pierre Mukendi',
    originCity: 'Maroua', destinationCity: 'Douala',
    currentCity: '', currentAgency: 'En transit',
    status: 'in_transit', packageCount: 2, totalWeight: 70,
    createdAt: '2026-07-11T07:00:00Z', updatedAt: '2026-07-14T12:00:00Z',
    estimatedDelivery: '2026-07-18',
    observation: 'Fragile — mobilier',
    timeline: [
      { id: 'evt_038', type: 'creation', label: 'Expédition créée', city: 'Maroua', agency: 'Agence Garoua', timestamp: '2026-07-11T07:00:00Z' },
      { id: 'evt_039', type: 'paiement', label: 'Paiement validé — 200 000 FCFA', city: 'Maroua', agency: 'Agence Garoua', timestamp: '2026-07-11T07:30:00Z' },
      { id: 'evt_040', type: 'affectation', label: 'Affecté au trajet Maroua → Douala', city: 'Maroua', agency: 'Agence Garoua', timestamp: '2026-07-11T08:00:00Z' },
      { id: 'evt_041', type: 'chargement', label: 'Chargé dans le véhicule', city: 'Maroua', agency: 'Agence Garoua', timestamp: '2026-07-12T05:00:00Z' },
      { id: 'evt_042', type: 'depart', label: 'Départ de l\'agence', city: 'Maroua', agency: 'Agence Garoua', timestamp: '2026-07-12T06:00:00Z' },
      { id: 'evt_043', type: 'transport', label: 'En cours de transport', city: '', agency: '', timestamp: '2026-07-14T12:00:00Z' },
    ],
  },
  {
    id: 'trk_008', trackingNumber: 'SUI-20260705-008',
    shipmentNumber: 'EXP-20260710-0017',
    senderName: 'Annie Tshala', receiverName: 'Ornella Mputu',
    originCity: 'Douala', destinationCity: 'Douala',
    currentCity: 'Douala', currentAgency: 'Agence Centrale',
    status: 'cancelled', packageCount: 1, totalWeight: 15,
    createdAt: '2026-07-10T16:00:00Z', updatedAt: '2026-07-11T10:00:00Z',
    estimatedDelivery: null,
    observation: 'Annulé — destinataire introuvable',
    timeline: [
      { id: 'evt_044', type: 'creation', label: 'Expédition créée', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-10T16:00:00Z' },
      { id: 'evt_045', type: 'annulation', label: 'Expédition annulée — destinataire introuvable', city: 'Douala', agency: 'Agence Centrale', timestamp: '2026-07-11T10:00:00Z' },
    ],
  },
];

export const PORTAL_TRACKING_STATUS = {
  pending_payment: { label: 'En attente', color: 'warning', step: 1 },
  payment_validated: { label: 'Paiement validé', color: 'info', step: 2 },
  preparation: { label: 'En préparation', color: 'info', step: 3 },
  loading: { label: 'En chargement', color: 'warning', step: 4 },
  in_transit: { label: 'En transport', color: 'primary', step: 5 },
  arrived: { label: 'Arrivé à destination', color: 'success', step: 6 },
  available_pickup: { label: 'Disponible au retrait', color: 'success', step: 7 },
  collected: { label: 'Retiré', color: 'success', step: 8 },
  delivered: { label: 'Livré', color: 'success', step: 9 },
  cancelled: { label: 'Annulé', color: 'danger', step: -1 },
  lost: { label: 'Perdu', color: 'danger', step: -1 },
  damaged: { label: 'Endommagé', color: 'danger', step: -1 },
  returned: { label: 'Retour expéditeur', color: 'secondary', step: -1 },
};

export const PORTAL_TRACKING_STEPS = [
  { key: 'creation', label: 'Créée', icon: 'FileText' },
  { key: 'paiement', label: 'Payée', icon: 'CreditCard' },
  { key: 'preparation', label: 'Préparée', icon: 'Package' },
  { key: 'chargement', label: 'Chargée', icon: 'Truck' },
  { key: 'transport', label: 'En transit', icon: 'Navigation' },
  { key: 'arrivee', label: 'Arrivée', icon: 'MapPin' },
  { key: 'disponible', label: 'Disponible', icon: 'PackageCheck' },
  { key: 'retrait', label: 'Retirée', icon: 'CheckCircle' },
];

export const mockPortalTrackingService = {
  async searchByNumber(trackingNumber) {
    await simulateDelay(500);
    if (!trackingNumber || !trackingNumber.trim()) {
      throw new Error('Veuillez saisir un numéro de suivi');
    }
    const query = trackingNumber.trim().toUpperCase();
    const result = trackingDB.find(
      (t) => t.trackingNumber.toUpperCase() === query || t.shipmentNumber.toUpperCase() === query,
    );
    if (!result) {
      throw new Error(`Aucun colis trouvé pour le numéro "${trackingNumber.trim()}"`);
    }
    return { ...result };
  },

  async getByNumber(trackingNumber) {
    await simulateDelay(300);
    if (!trackingNumber) throw new Error('Numéro de suivi invalide');
    const query = trackingNumber.trim().toUpperCase();
    const result = trackingDB.find(
      (t) => t.trackingNumber.toUpperCase() === query || t.shipmentNumber.toUpperCase() === query,
    );
    if (!result) throw new Error('Colis non trouvé');
    return { ...result };
  },

  async getTimeline(trackingNumber) {
    await simulateDelay(250);
    if (!trackingNumber) throw new Error('Numéro de suivi invalide');
    const query = trackingNumber.trim().toUpperCase();
    const result = trackingDB.find(
      (t) => t.trackingNumber.toUpperCase() === query || t.shipmentNumber.toUpperCase() === query,
    );
    if (!result) throw new Error('Colis non trouvé');
    return [...result.timeline].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getHistory() {
    await simulateDelay(300);
    const searches = JSON.parse(localStorage.getItem('lp_tracking_history') || '[]');
    return searches;
  },

  async addToHistory(trackingNumber, status) {
    await simulateDelay(100);
    let history = JSON.parse(localStorage.getItem('lp_tracking_history') || '[]');
    history = history.filter((h) => h.trackingNumber !== trackingNumber);
    history.unshift({ trackingNumber, status, searchedAt: new Date().toISOString() });
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem('lp_tracking_history', JSON.stringify(history));
    return history;
  },

  async clearHistory() {
    await simulateDelay(100);
    localStorage.removeItem('lp_tracking_history');
    return [];
  },
};
