const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let trackingDB = [
  {
    id: 'trk_001', companyId: 'comp_001', trackingNumber: 'SUI-20260701-001',
    shipmentId: 'shp_001', shipmentNumber: 'EXP-20260701-0001',
    clientId: 'cli_001', clientName: 'Jean Kabongo', clientPhone: '+237812345678',
    senderName: 'Jean Kabongo', receiverName: 'Pierre Mukendi',
    originCity: 'Douala', destinationCity: 'Yaoundé',
    currentAgency: 'Agence Yaoundé', currentCity: 'Yaoundé',
    status: 'delivered', packageCount: 3, totalWeight: 58,
    timeline: [
      { id: 'evt_001', type: 'creation', label: 'Expédition créée', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-01T08:00:00Z' },
      { id: 'evt_002', type: 'enregistrement', label: 'Colis enregistrés', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '3 colis enregistrés', timestamp: '2026-07-01T08:15:00Z' },
      { id: 'evt_003', type: 'paiement', label: 'Paiement validé', agency: 'Agence Centrale', city: 'Douala', user: 'Agent Guichet', comment: '170 000 FC — Espèces', timestamp: '2026-07-01T09:00:00Z' },
      { id: 'evt_004', type: 'affectation', label: 'Affecté au trajet Douala → Yaoundé', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: 'Trajet TRJ-001', timestamp: '2026-07-01T09:30:00Z' },
      { id: 'evt_005', type: 'chargement', label: 'Chargé dans le véhicule', agency: 'Agence Centrale', city: 'Douala', user: 'Agent Guichet', comment: '', timestamp: '2026-07-01T18:00:00Z' },
      { id: 'evt_006', type: 'depart', label: 'Départ de l\'agence', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: 'Départ confirmé', timestamp: '2026-07-02T06:00:00Z' },
      { id: 'evt_007', type: 'transport', label: 'En cours de transport', agency: '', city: '', user: 'Système', comment: 'Transit en cours', timestamp: '2026-07-03T12:00:00Z' },
      { id: 'evt_008', type: 'arrivee', label: 'Arrivée à l\'agence de destination', agency: 'Agence Yaoundé', city: 'Yaoundé', user: 'Système', comment: '', timestamp: '2026-07-05T10:00:00Z' },
      { id: 'evt_009', type: 'disponible', label: 'Disponible au retrait', agency: 'Agence Yaoundé', city: 'Yaoundé', user: 'Admin', comment: '', timestamp: '2026-07-05T11:00:00Z' },
      { id: 'evt_010', type: 'retrait', label: 'Retiré par le destinataire', agency: 'Agence Yaoundé', city: 'Yaoundé', user: 'Agent Guichet', comment: 'Pierre Mukendi — CNI vérifiée', timestamp: '2026-07-05T14:00:00Z' },
    ],
    observation: '', createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-07-05T14:00:00Z',
  },
  {
    id: 'trk_002', companyId: 'comp_001', trackingNumber: 'SUI-20260710-002',
    shipmentId: 'shp_002', shipmentNumber: 'EXP-20260710-0002',
    clientId: 'cli_008', clientName: 'Chantal Ilunga', clientPhone: '+237889012345',
    senderName: 'Chantal Ilunga', receiverName: 'Jean Kabongo',
    originCity: 'Bamenda', destinationCity: 'Douala',
    currentAgency: 'En transit', currentCity: '',
    status: 'in_transit', packageCount: 2, totalWeight: 42,
    timeline: [
      { id: 'evt_011', type: 'creation', label: 'Expédition créée', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Agent Guichet', comment: '', timestamp: '2026-07-10T10:00:00Z' },
      { id: 'evt_012', type: 'enregistrement', label: 'Colis enregistrés', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Agent Guichet', comment: '2 colis', timestamp: '2026-07-10T10:15:00Z' },
      { id: 'evt_013', type: 'paiement', label: 'Paiement validé', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Agent Guichet', comment: '95 000 FC — Mobile Money', timestamp: '2026-07-10T10:30:00Z' },
      { id: 'evt_014', type: 'affectation', label: 'Affecté au trajet Bamenda → Douala', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: 'Trajet TRJ-002', timestamp: '2026-07-10T11:00:00Z' },
      { id: 'evt_015', type: 'chargement', label: 'Chargé dans le véhicule', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Agent Guichet', comment: '', timestamp: '2026-07-10T18:00:00Z' },
      { id: 'evt_016', type: 'depart', label: 'Départ de l\'agence', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: 'Départ 18h30', timestamp: '2026-07-10T18:30:00Z' },
      { id: 'evt_017', type: 'transport', label: 'En cours de transport', agency: '', city: '', user: 'Système', comment: 'Transit', timestamp: '2026-07-12T06:00:00Z' },
    ],
    observation: '', createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-12T06:00:00Z',
  },
  {
    id: 'trk_003', companyId: 'comp_001', trackingNumber: 'SUI-20260715-003',
    shipmentId: 'shp_003', shipmentNumber: 'EXP-20260715-0003',
    clientId: 'cli_003', clientName: 'Pierre Mukendi', clientPhone: '+237834567890',
    senderName: 'Pierre Mukendi', receiverName: 'Esther Mbuyi',
    originCity: 'Douala', destinationCity: 'Kribi',
    currentAgency: 'Agence Garoua', currentCity: 'Douala',
    status: 'pending_payment', packageCount: 1, totalWeight: 3,
    timeline: [
      { id: 'evt_018', type: 'creation', label: 'Expédition créée', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: 'Documents urgents', timestamp: '2026-07-15T09:00:00Z' },
      { id: 'evt_019', type: 'enregistrement', label: 'Colis enregistré', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: '1 colis — documents', timestamp: '2026-07-15T09:10:00Z' },
    ],
    observation: 'En attente de paiement', createdAt: '2026-07-15T09:00:00Z', updatedAt: '2026-07-15T09:10:00Z',
  },
  {
    id: 'trk_004', companyId: 'comp_001', trackingNumber: 'SUI-20260706-004',
    shipmentId: 'shp_014', shipmentNumber: 'EXP-20260706-0014',
    clientId: 'cli_008', clientName: 'Chantal Ilunga', clientPhone: '+237889012345',
    senderName: 'Chantal Ilunga', receiverName: 'Véronique Kayembe',
    originCity: 'Bamenda', destinationCity: 'Douala',
    currentAgency: 'Agence Centrale', currentCity: 'Douala',
    status: 'delivered', packageCount: 2, totalWeight: 7,
    timeline: [
      { id: 'evt_020', type: 'creation', label: 'Expédition créée', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: 'Valeur élevée', timestamp: '2026-07-06T06:00:00Z' },
      { id: 'evt_021', type: 'paiement', label: 'Paiement validé', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: '960 000 FC — Espèces', timestamp: '2026-07-06T07:00:00Z' },
      { id: 'evt_022', type: 'affectation', label: 'Affecté au trajet', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: '', timestamp: '2026-07-06T08:00:00Z' },
      { id: 'evt_023', type: 'depart', label: 'Départ', agency: 'Agence Bamenda', city: 'Bamenda', user: 'Admin', comment: '', timestamp: '2026-07-06T18:00:00Z' },
      { id: 'evt_024', type: 'arrivee', label: 'Arrivée à Douala', agency: 'Agence Centrale', city: 'Douala', user: 'Système', comment: '', timestamp: '2026-07-12T08:00:00Z' },
      { id: 'evt_025', type: 'disponible', label: 'Disponible au retrait', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-12T09:00:00Z' },
      { id: 'evt_026', type: 'retrait', label: 'Retiré', agency: 'Agence Centrale', city: 'Douala', user: 'Agent Guichet', comment: 'Véronique K. — CNI vérifiée', timestamp: '2026-07-12T10:00:00Z' },
    ],
    observation: '', createdAt: '2026-07-06T06:00:00Z', updatedAt: '2026-07-12T10:00:00Z',
  },
  {
    id: 'trk_005', companyId: 'comp_001', trackingNumber: 'SUI-20260703-005',
    shipmentId: 'shp_012', shipmentNumber: 'EXP-20260703-0012',
    clientId: 'cli_015', clientName: 'Rodrigue Ngoy', clientPhone: '+237856009900',
    senderName: 'Rodrigue Ngoy', receiverName: 'Lucien Molua',
    originCity: 'Douala', destinationCity: 'Yaoundé',
    currentAgency: 'Agence Yaoundé', currentCity: 'Yaoundé',
    status: 'delivered', packageCount: 1, totalWeight: 15,
    timeline: [
      { id: 'evt_027', type: 'creation', label: 'Expédition créée', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-03T08:30:00Z' },
      { id: 'evt_028', type: 'paiement', label: 'Paiement validé', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '45 500 FC', timestamp: '2026-07-03T09:00:00Z' },
      { id: 'evt_029', type: 'affectation', label: 'Affecté au trajet TRJ-001', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-03T09:30:00Z' },
      { id: 'evt_030', type: 'depart', label: 'Départ', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-03T18:00:00Z' },
      { id: 'evt_031', type: 'arrivee', label: 'Arrivée Yaoundé', agency: 'Agence Yaoundé', city: 'Yaoundé', user: 'Système', comment: '', timestamp: '2026-07-08T10:00:00Z' },
      { id: 'evt_032', type: 'retrait', label: 'Retiré', agency: 'Agence Yaoundé', city: 'Yaoundé', user: 'Agent Guichet', comment: 'Lucien M. — CNI', timestamp: '2026-07-08T12:00:00Z' },
    ],
    observation: '', createdAt: '2026-07-03T08:30:00Z', updatedAt: '2026-07-08T12:00:00Z',
  },
  {
    id: 'trk_006', companyId: 'comp_001', trackingNumber: 'SUI-20260702-006',
    shipmentId: 'shp_011', shipmentNumber: 'EXP-20260702-0011',
    clientId: 'cli_012', clientName: 'Céline Wa Mukendi', clientPhone: '+237823003344',
    senderName: 'Céline Wa Mukendi', receiverName: 'Sandrine Kavira',
    originCity: 'Douala', destinationCity: 'Kribi',
    currentAgency: 'En transit', currentCity: '',
    status: 'in_transit', packageCount: 2, totalWeight: 13,
    timeline: [
      { id: 'evt_033', type: 'creation', label: 'Expédition créée', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: 'Médicaments urgents', timestamp: '2026-07-02T07:00:00Z' },
      { id: 'evt_034', type: 'paiement', label: 'Paiement validé', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: '90 000 FC', timestamp: '2026-07-02T07:30:00Z' },
      { id: 'evt_035', type: 'affectation', label: 'Affecté au trajet TRJ-006', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-02T08:00:00Z' },
      { id: 'evt_036', type: 'depart', label: 'Départ', agency: 'Agence Garoua', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-02T18:00:00Z' },
      { id: 'evt_037', type: 'transport', label: 'En cours de transport', agency: '', city: '', user: 'Système', comment: '', timestamp: '2026-07-04T06:00:00Z' },
    ],
    observation: 'Médicaments — priorité', createdAt: '2026-07-02T07:00:00Z', updatedAt: '2026-07-04T06:00:00Z',
  },
  {
    id: 'trk_007', companyId: 'comp_001', trackingNumber: 'SUI-20260712-007',
    shipmentId: 'shp_018', shipmentNumber: 'EXP-20260711-0018',
    clientId: 'cli_025', clientName: 'Alain Kapela', clientPhone: '+237856029900',
    senderName: 'Alain Kapela', receiverName: 'Pierre Mukendi',
    originCity: 'Maroua', destinationCity: 'Douala',
    currentAgency: 'En transit', currentCity: '',
    status: 'in_transit', packageCount: 2, totalWeight: 70,
    timeline: [
      { id: 'evt_038', type: 'creation', label: 'Expédition créée', agency: 'Agence Garoua', city: 'Maroua', user: 'Agent Guichet', comment: 'Déménagement complet', timestamp: '2026-07-11T07:00:00Z' },
      { id: 'evt_039', type: 'paiement', label: 'Paiement validé', agency: 'Agence Garoua', city: 'Maroua', user: 'Agent Guichet', comment: '200 000 FC', timestamp: '2026-07-11T07:30:00Z' },
      { id: 'evt_040', type: 'affectation', label: 'Affecté au trajet TRJ-005', agency: 'Agence Garoua', city: 'Maroua', user: 'Admin', comment: '', timestamp: '2026-07-11T08:00:00Z' },
      { id: 'evt_041', type: 'chargement', label: 'Chargé', agency: 'Agence Garoua', city: 'Maroua', user: 'Agent Guichet', comment: '', timestamp: '2026-07-12T05:00:00Z' },
      { id: 'evt_042', type: 'depart', label: 'Départ', agency: 'Agence Garoua', city: 'Maroua', user: 'Admin', comment: '', timestamp: '2026-07-12T06:00:00Z' },
      { id: 'evt_043', type: 'transport', label: 'En cours de transport', agency: '', city: '', user: 'Système', comment: '', timestamp: '2026-07-14T12:00:00Z' },
    ],
    observation: 'Fragile — mobilier', createdAt: '2026-07-11T07:00:00Z', updatedAt: '2026-07-14T12:00:00Z',
  },
  {
    id: 'trk_008', companyId: 'comp_001', trackingNumber: 'SUI-20260705-008',
    shipmentId: 'shp_017', shipmentNumber: 'EXP-20260710-0017',
    clientId: 'cli_014', clientName: 'Annie Tshala', clientPhone: '+237845007788',
    senderName: 'Annie Tshala', receiverName: 'Ornella Mputu',
    originCity: 'Douala', destinationCity: 'Douala',
    currentAgency: 'Annulé', currentCity: 'Douala',
    status: 'cancelled', packageCount: 1, totalWeight: 15,
    timeline: [
      { id: 'evt_044', type: 'creation', label: 'Expédition créée', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: '', timestamp: '2026-07-10T16:00:00Z' },
      { id: 'evt_045', type: 'annulation', label: 'Expédition annulée', agency: 'Agence Centrale', city: 'Douala', user: 'Admin', comment: 'Destinataire introuvable', timestamp: '2026-07-11T10:00:00Z' },
    ],
    observation: 'Annulé', createdAt: '2026-07-10T16:00:00Z', updatedAt: '2026-07-11T10:00:00Z',
  },
];

let nextEventId = 46;

function getByCompany(companyId) { return trackingDB.filter((t) => t.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((t) =>
    t.trackingNumber.toLowerCase().includes(q) || t.shipmentNumber.toLowerCase().includes(q) ||
    t.clientName.toLowerCase().includes(q) || t.clientPhone.includes(q) ||
    t.senderName.toLowerCase().includes(q) || t.receiverName.toLowerCase().includes(q) ||
    t.originCity.toLowerCase().includes(q) || t.destinationCity.toLowerCase().includes(q) ||
    t.status.toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((t) => {
    if (filters.status && t.status !== filters.status) return false;
    if (filters.originCity && t.originCity !== filters.originCity) return false;
    if (filters.destinationCity && t.destinationCity !== filters.destinationCity) return false;
    if (filters.dateFrom && t.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && t.createdAt > filters.dateTo + 'T23:59:59Z') return false;
    return true;
  });
}

function applySort(items, sort) {
  const { field, direction } = sort || { field: 'updatedAt', direction: 'desc' };
  return [...items].sort((a, b) => {
    let va = a[field] ?? '';
    let vb = b[field] ?? '';
    if (typeof va === 'number' && typeof vb === 'number') return direction === 'asc' ? va - vb : vb - va;
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return direction === 'asc' ? -1 : 1;
    if (va > vb) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export const TRACKING_STATUS = {
  DRAFT: 'draft', PENDING_PAYMENT: 'pending_payment', PAYMENT_VALIDATED: 'payment_validated',
  PENDING_ASSIGNMENT: 'pending_assignment', ASSIGNED: 'assigned', LOADING: 'loading',
  IN_TRANSIT: 'in_transit', ARRIVED: 'arrived', AVAILABLE_PICKUP: 'available_pickup',
  COLLECTED: 'collected', CANCELLED: 'cancelled', LOST: 'lost',
  DAMAGED: 'damaged', RETURNED: 'returned', ARCHIVED: 'archived',
};

export const TRACKING_STATUS_LABELS = {
  draft: 'Brouillon', pending_payment: 'En attente de paiement', payment_validated: 'Paiement validé',
  pending_assignment: 'En attente d\'affectation', assigned: 'Affecté', loading: 'En chargement',
  in_transit: 'En transport', arrived: 'Arrivé', available_pickup: 'Disponible au retrait',
  collected: 'Retiré', cancelled: 'Annulé', lost: 'Perdu',
  damaged: 'Endommagé', returned: 'Retour expéditeur', archived: 'Archivé',
};

export const TRACKING_STATUS_COLORS = {
  draft: 'secondary', pending_payment: 'warning', payment_validated: 'info',
  pending_assignment: 'warning', assigned: 'primary', loading: 'warning',
  in_transit: 'info', arrived: 'success', available_pickup: 'success',
  collected: 'success', cancelled: 'danger', lost: 'danger',
  damaged: 'danger', returned: 'dark', archived: 'secondary',
};

export const mockTrackingService = {
  async getAll(companyId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    await simulateDelay(350);
    let items = getByCompany(companyId);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    return { data: items.slice(start, start + perPage), page, perPage, total, totalPages };
  },

  async getById(companyId, trackingId) {
    await simulateDelay(250);
    const tracking = getByCompany(companyId).find((t) => t.id === trackingId);
    if (!tracking) throw new Error('Suivi non trouvé');
    return tracking;
  },

  async getByShipmentId(companyId, shipmentId) {
    await simulateDelay(200);
    return getByCompany(companyId).find((t) => t.shipmentId === shipmentId) || null;
  },

  async getTimeline(companyId, trackingId) {
    await simulateDelay(200);
    const tracking = getByCompany(companyId).find((t) => t.id === trackingId);
    if (!tracking) throw new Error('Suivi non trouvé');
    return tracking.timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },

  async addEvent(companyId, trackingId, event) {
    await simulateDelay(300);
    const idx = trackingDB.findIndex((t) => t.id === trackingId && t.companyId === companyId);
    if (idx === -1) throw new Error('Suivi non trouvé');
    const newEvent = {
      id: `evt_${String(nextEventId++).padStart(3, '0')}`,
      ...event,
      timestamp: new Date().toISOString(),
    };
    trackingDB[idx] = {
      ...trackingDB[idx],
      timeline: [...trackingDB[idx].timeline, newEvent],
      status: event.type === 'annulation' ? 'cancelled' : event.type === 'retrait' ? 'collected' : trackingDB[idx].status,
      updatedAt: new Date().toISOString(),
    };
    return newEvent;
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      inTransit: items.filter((t) => t.status === 'in_transit').length,
      delivered: items.filter((t) => t.status === 'delivered').length,
      availablePickup: items.filter((t) => t.status === 'available_pickup').length,
      cancelled: items.filter((t) => t.status === 'cancelled').length,
      pendingPayment: items.filter((t) => t.status === 'pending_payment').length,
    };
  },
};
