const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let routesDB = [
  {
    id: 'rte_001', companyId: 'comp_001', code: 'TRJ-001', name: 'Douala → Yaoundé',
    description: 'Trajet principal Douala Yaoundé',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    distance: 1950,
    departureDate: '2026-07-20', departureTime: '06:00',
    arrivalDate: '2026-07-22', arrivalTime: '18:00',
    maxWeight: 5000, usedWeight: 1850, maxPackages: 200, usedPackages: 72,
    status: 'in_transit',
    shipments: [
      { id: 'shp_001', shipmentNumber: 'EXP-20260701-0001', senderName: 'Jean Kabongo', receiverName: 'Pierre Mukendi', packageCount: 3, totalWeight: 58, totalAmount: 170000 },
      { id: 'shp_006', shipmentNumber: 'EXP-20260601-0006', senderName: 'Patrick Kalala', receiverName: 'Emmanuel Kasongo', packageCount: 3, totalWeight: 25, totalAmount: 190000 },
      { id: 'shp_012', shipmentNumber: 'EXP-20260703-0012', senderName: 'Rodrigue Ngoy', receiverName: 'Lucien Molua', packageCount: 1, totalWeight: 15, totalAmount: 45500 },
    ],
    observation: 'Trajet régulier — départ chaque lundi', documents: [], photos: [],
    createdAt: '2026-06-15T08:00:00Z', updatedAt: '2026-07-20T06:00:00Z',
  },
  {
    id: 'rte_002', companyId: 'comp_001', code: 'TRJ-002', name: 'Douala → Bamenda',
    description: 'Trajet secondaire Douala Bamenda',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_004', destinationAgencyName: 'Agence Bamenda', destinationCity: 'Bamenda',
    distance: 1200,
    departureDate: '2026-07-21', departureTime: '05:30',
    arrivalDate: '2026-07-22', arrivalTime: '20:00',
    maxWeight: 3000, usedWeight: 80, maxPackages: 150, usedPackages: 1,
    status: 'planned',
    shipments: [
      { id: 'shp_007', shipmentNumber: 'EXP-20260605-0007', senderName: 'Véronique Kayembe', receiverName: 'Hippolyte Mutambayi', packageCount: 1, totalWeight: 80, totalAmount: 450000 },
    ],
    observation: '', documents: [], photos: [],
    createdAt: '2026-07-01T09:00:00Z', updatedAt: '2026-07-01T09:00:00Z',
  },
  {
    id: 'rte_003', companyId: 'comp_001', code: 'TRJ-003', name: 'Yaoundé → Douala',
    description: 'Retour Yaoundé Douala',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Yaoundé',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    distance: 1950,
    departureDate: '2026-07-25', departureTime: '07:00',
    arrivalDate: '2026-07-27', arrivalTime: '20:00',
    maxWeight: 4000, usedWeight: 0, maxPackages: 180, usedPackages: 0,
    status: 'open',
    shipments: [],
    observation: 'Ouvert aux réservations', documents: [], photos: [],
    createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-10T10:00:00Z',
  },
  {
    id: 'rte_004', companyId: 'comp_001', code: 'TRJ-004', name: 'Maroua → Bamenda',
    description: 'Trajet régional Tshopo Kasaï',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Maroua',
    destinationAgencyId: 'ag_004', destinationAgencyName: 'Agence Bamenda', destinationCity: 'Bamenda',
    distance: 800,
    departureDate: '2026-07-18', departureTime: '08:00',
    arrivalDate: '2026-07-19', arrivalTime: '16:00',
    maxWeight: 2500, usedWeight: 2200, maxPackages: 100, usedPackages: 88,
    status: 'arrived',
    shipments: [
      { id: 'shp_009', shipmentNumber: 'EXP-20260620-0009', senderName: 'Alain Kapela', receiverName: 'Chantal Ilunga', packageCount: 2, totalWeight: 85, totalAmount: 140000 },
      { id: 'shp_014', shipmentNumber: 'EXP-20260706-0014', senderName: 'Chantal Ilunga', receiverName: 'Véronique Kayembe', packageCount: 2, totalWeight: 7, totalAmount: 960000 },
    ],
    observation: 'Arrivé — déchargement en cours', documents: [], photos: [],
    createdAt: '2026-06-28T11:00:00Z', updatedAt: '2026-07-19T16:00:00Z',
  },
  {
    id: 'rte_005', companyId: 'comp_001', code: 'TRJ-005', name: 'Limbé → Maroua',
    description: 'Trajet côtier Limbé Maroua',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Limbé',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Maroua',
    distance: 1500,
    departureDate: '2026-07-23', departureTime: '04:00',
    arrivalDate: '2026-07-25', arrivalTime: '12:00',
    maxWeight: 6000, usedWeight: 3500, maxPackages: 250, usedPackages: 145,
    status: 'loading',
    shipments: [
      { id: 'shp_018', shipmentNumber: 'EXP-20260711-0018', senderName: 'Alain Kapela', receiverName: 'Pierre Mukendi', packageCount: 2, totalWeight: 70, totalAmount: 200000 },
      { id: 'shp_020', shipmentNumber: 'EXP-20260713-0020', senderName: 'Hippolyte Mutambayi', receiverName: 'Alain Kapela', packageCount: 1, totalWeight: 95, totalAmount: 650000 },
    ],
    observation: 'Chargement en cours — 2h restantes', documents: [], photos: [],
    createdAt: '2026-07-15T14:00:00Z', updatedAt: '2026-07-23T06:00:00Z',
  },
  {
    id: 'rte_006', companyId: 'comp_001', code: 'TRJ-006', name: 'Douala → Kribi',
    description: 'Trajet longue distance vers Kribi',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    distance: 1800,
    departureDate: '2026-07-24', departureTime: '05:00',
    arrivalDate: '2026-07-26', arrivalTime: '22:00',
    maxWeight: 4500, usedWeight: 31, maxPackages: 180, usedPackages: 3,
    status: 'planned',
    shipments: [
      { id: 'shp_011', shipmentNumber: 'EXP-20260702-0011', senderName: 'Céline Wa Mukendi', receiverName: 'Sandrine Kavira', packageCount: 2, totalWeight: 13, totalAmount: 90000 },
      { id: 'shp_015', shipmentNumber: 'EXP-20260708-0015', senderName: 'Sarah Ngandu', receiverName: 'Céline Wa Mukendi', packageCount: 1, totalWeight: 18, totalAmount: 30000 },
    ],
    observation: '', documents: [], photos: [],
    createdAt: '2026-07-12T08:00:00Z', updatedAt: '2026-07-12T08:00:00Z',
  },
  {
    id: 'rte_007', companyId: 'comp_001', code: 'TRJ-007', name: 'Yaoundé → Kribi',
    description: 'Trajet regional Haut-Katanga Sud-Kivu',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Yaoundé',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    distance: 700,
    departureDate: '2026-07-10', departureTime: '06:00',
    arrivalDate: '2026-07-11', arrivalTime: '14:00',
    maxWeight: 2000, usedWeight: 2000, maxPackages: 80, usedPackages: 80,
    status: 'completed',
    shipments: [],
    observation: 'Trajet complet — tous les colis livrés', documents: [], photos: [],
    createdAt: '2026-07-05T07:00:00Z', updatedAt: '2026-07-11T14:00:00Z', completedAt: '2026-07-11T14:00:00Z',
  },
  {
    id: 'rte_008', companyId: 'comp_001', code: 'TRJ-008', name: 'Douala → Garoua',
    description: 'Trajet vers l\'est',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Garoua',
    distance: 1600,
    departureDate: '2026-07-15', departureTime: '05:00',
    arrivalDate: '2026-07-17', arrivalTime: '18:00',
    maxWeight: 3500, usedWeight: 0, maxPackages: 140, usedPackages: 0,
    status: 'cancelled',
    shipments: [],
    observation: 'Annulé — problème mécanique', documents: [], photos: [],
    createdAt: '2026-07-08T09:00:00Z', updatedAt: '2026-07-14T10:00:00Z', cancelledAt: '2026-07-14T10:00:00Z',
  },
  {
    id: 'rte_009', companyId: 'comp_001', code: 'TRJ-009', name: 'Bamenda → Douala',
    description: 'Retour Kasaï Douala',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Bamenda',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    distance: 1200,
    departureDate: '2026-07-26', departureTime: '06:00',
    arrivalDate: '2026-07-27', arrivalTime: '22:00',
    maxWeight: 3000, usedWeight: 420, maxPackages: 150, usedPackages: 24,
    status: 'ready',
    shipments: [
      { id: 'shp_002', shipmentNumber: 'EXP-20260710-0002', senderName: 'Chantal Ilunga', receiverName: 'Jean Kabongo', packageCount: 2, totalWeight: 42, totalAmount: 95000 },
    ],
    observation: 'Prêt au départ', documents: [], photos: [],
    createdAt: '2026-07-18T08:00:00Z', updatedAt: '2026-07-25T18:00:00Z',
  },
];

let historyDB = [
  { id: 'rh_001', routeId: 'rte_001', companyId: 'comp_001', type: 'creation', description: 'Trajet créé', timestamp: '2026-06-15T08:00:00Z', userId: 'usr_001' },
  { id: 'rh_002', routeId: 'rte_001', companyId: 'comp_001', type: 'ouverture', description: 'Trajet ouvert aux réservations', timestamp: '2026-06-20T08:00:00Z', userId: 'usr_001' },
  { id: 'rh_003', routeId: 'rte_001', companyId: 'comp_001', type: 'affectation', description: 'EXP-20260701-0001 affectée', timestamp: '2026-07-01T09:00:00Z', userId: 'usr_001' },
  { id: 'rh_004', routeId: 'rte_001', companyId: 'comp_001', type: 'affectation', description: 'EXP-20260601-0006 affectée', timestamp: '2026-07-05T10:00:00Z', userId: 'usr_002' },
  { id: 'rh_005', routeId: 'rte_001', companyId: 'comp_001', type: 'chargement', description: 'Début du chargement', timestamp: '2026-07-19T20:00:00Z', userId: 'usr_001' },
  { id: 'rh_006', routeId: 'rte_001', companyId: 'comp_001', type: 'depart', description: 'Départ confirmé', timestamp: '2026-07-20T06:00:00Z', userId: 'usr_001' },
  { id: 'rh_007', routeId: 'rte_004', companyId: 'comp_001', type: 'creation', description: 'Trajet créé', timestamp: '2026-06-28T11:00:00Z', userId: 'usr_001' },
  { id: 'rh_008', routeId: 'rte_004', companyId: 'comp_001', type: 'arrivée', description: 'Arrivée à destination', timestamp: '2026-07-19T16:00:00Z', userId: 'usr_001' },
  { id: 'rh_009', routeId: 'rte_007', companyId: 'comp_001', type: 'creation', description: 'Trajet créé', timestamp: '2026-07-05T07:00:00Z', userId: 'usr_001' },
  { id: 'rh_010', routeId: 'rte_007', companyId: 'comp_001', type: 'terminé', description: 'Trajet terminé — tous colis livrés', timestamp: '2026-07-11T14:00:00Z', userId: 'usr_001' },
  { id: 'rh_011', routeId: 'rte_008', companyId: 'comp_001', type: 'annulation', description: 'Annulé — problème mécanique', timestamp: '2026-07-14T10:00:00Z', userId: 'usr_001' },
];

let nextRouteId = 10;
let nextHistoryId = 12;

function getByCompany(companyId) { return routesDB.filter((r) => r.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((r) =>
    r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) ||
    r.originCity.toLowerCase().includes(q) || r.destinationCity.toLowerCase().includes(q) ||
    r.originAgencyName.toLowerCase().includes(q) || r.destinationAgencyName.toLowerCase().includes(q) ||
    r.status.toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((r) => {
    if (filters.status && r.status !== filters.status) return false;
    if (filters.originAgencyId && r.originAgencyId !== filters.originAgencyId) return false;
    if (filters.destinationAgencyId && r.destinationAgencyId !== filters.destinationAgencyId) return false;
    if (filters.originCity && r.originCity !== filters.originCity) return false;
    if (filters.destinationCity && r.destinationCity !== filters.destinationCity) return false;
    if (filters.dateFrom && r.departureDate < filters.dateFrom) return false;
    if (filters.dateTo && r.departureDate > filters.dateTo) return false;
    return true;
  });
}

function applySort(items, sort) {
  const { field, direction } = sort || { field: 'createdAt', direction: 'desc' };
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

export const ROUTE_STATUSES = {
  PLANNED: 'planned', OPEN: 'open', LOADING: 'loading', READY: 'ready',
  IN_TRANSIT: 'in_transit', ARRIVED: 'arrived', COMPLETED: 'completed',
  CANCELLED: 'cancelled', SUSPENDED: 'suspended',
};

export const ROUTE_STATUS_LABELS = {
  planned: 'Planifié', open: 'Ouvert', loading: 'En chargement', ready: 'Prêt au départ',
  in_transit: 'En transport', arrived: 'Arrivé', completed: 'Terminé',
  cancelled: 'Annulé', suspended: 'Suspendu',
};

export const ROUTE_STATUS_COLORS = {
  planned: 'secondary', open: 'info', loading: 'warning', ready: 'primary',
  in_transit: 'info', arrived: 'success', completed: 'success',
  cancelled: 'danger', suspended: 'danger',
};

export const mockRoutesService = {
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

  async getById(companyId, routeId) {
    await simulateDelay(250);
    const route = getByCompany(companyId).find((r) => r.id === routeId);
    if (!route) throw new Error('Trajet non trouvé');
    return route;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const code = `TRJ-${String(nextRouteId).padStart(3, '0')}`;
    const route = {
      id: `rte_${String(nextRouteId++).padStart(3, '0')}`,
      companyId, code, ...data,
      usedWeight: 0, usedPackages: 0, shipments: [],
      documents: [], photos: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    routesDB = [...routesDB, route];
    historyDB = [...historyDB, { id: `rh_${String(nextHistoryId++).padStart(3, '0')}`, routeId: route.id, companyId, type: 'creation', description: 'Trajet créé', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return route;
  },

  async update(companyId, routeId, data) {
    await simulateDelay(400);
    const idx = routesDB.findIndex((r) => r.id === routeId && r.companyId === companyId);
    if (idx === -1) throw new Error('Trajet non trouvé');
    routesDB[idx] = { ...routesDB[idx], ...data, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `rh_${String(nextHistoryId++).padStart(3, '0')}`, routeId, companyId, type: 'modification', description: 'Trajet modifié', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return routesDB[idx];
  },

  async cancel(companyId, routeId) {
    await simulateDelay(300);
    const idx = routesDB.findIndex((r) => r.id === routeId && r.companyId === companyId);
    if (idx === -1) throw new Error('Trajet non trouvé');
    routesDB[idx] = { ...routesDB[idx], status: 'cancelled', cancelledAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `rh_${String(nextHistoryId++).padStart(3, '0')}`, routeId, companyId, type: 'annulation', description: 'Trajet annulé', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return routesDB[idx];
  },

  async assignShipment(companyId, routeId, shipment) {
    await simulateDelay(300);
    const idx = routesDB.findIndex((r) => r.id === routeId && r.companyId === companyId);
    if (idx === -1) throw new Error('Trajet non trouvé');
    const route = routesDB[idx];
    const newWeight = route.usedWeight + (shipment.totalWeight || 0);
    const newPackages = route.usedPackages + (shipment.packageCount || 0);
    if (newWeight > route.maxWeight) throw new Error('Capacité maximale de poids dépassée');
    if (newPackages > route.maxPackages) throw new Error('Nombre maximal de colis dépassé');
    const updatedShipment = { id: shipment.id, shipmentNumber: shipment.shipmentNumber, senderName: shipment.senderName, receiverName: shipment.receiverName, packageCount: shipment.packageCount, totalWeight: shipment.totalWeight, totalAmount: shipment.totalAmount };
    routesDB[idx] = { ...route, usedWeight: newWeight, usedPackages: newPackages, shipments: [...route.shipments, updatedShipment], updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `rh_${String(nextHistoryId++).padStart(3, '0')}`, routeId, companyId, type: 'affectation', description: `${shipment.shipmentNumber} affectée`, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return routesDB[idx];
  },

  async removeShipment(companyId, routeId, shipmentId) {
    await simulateDelay(300);
    const idx = routesDB.findIndex((r) => r.id === routeId && r.companyId === companyId);
    if (idx === -1) throw new Error('Trajet non trouvé');
    const route = routesDB[idx];
    const removed = route.shipments.find((s) => s.id === shipmentId);
    if (!removed) throw new Error('Expédition non trouvée dans ce trajet');
    routesDB[idx] = { ...route, usedWeight: Math.max(0, route.usedWeight - (removed.totalWeight || 0)), usedPackages: Math.max(0, route.usedPackages - (removed.packageCount || 0)), shipments: route.shipments.filter((s) => s.id !== shipmentId), updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `rh_${String(nextHistoryId++).padStart(3, '0')}`, routeId, companyId, type: 'retrait', description: `${removed.shipmentNumber} retirée`, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return routesDB[idx];
  },

  async getHistory(companyId, routeId) {
    await simulateDelay(200);
    return historyDB.filter((h) => h.routeId === routeId && h.companyId === companyId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      planned: items.filter((r) => r.status === 'planned').length,
      open: items.filter((r) => r.status === 'open').length,
      loading: items.filter((r) => r.status === 'loading').length,
      ready: items.filter((r) => r.status === 'ready').length,
      inTransit: items.filter((r) => r.status === 'in_transit').length,
      arrived: items.filter((r) => r.status === 'arrived').length,
      completed: items.filter((r) => r.status === 'completed').length,
      cancelled: items.filter((r) => r.status === 'cancelled').length,
      totalShipments: items.reduce((sum, r) => sum + (r.shipments || []).length, 0),
      totalWeightUsed: items.reduce((sum, r) => sum + r.usedWeight, 0),
      totalWeightCapacity: items.reduce((sum, r) => sum + r.maxWeight, 0),
    };
  },
};
