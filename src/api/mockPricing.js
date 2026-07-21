const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let pricingDB = [
  {
    id: 'prc_001', companyId: 'comp_001', code: 'TAR-001', name: 'Tarif standard Douala → Yaoundé',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    category: 'standard', minWeight: 1, maxWeight: 50,
    unitPrice: 1500, fixedPrice: 0, insuranceRate: 0.05, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Tarif de base pour toutes catégories',
    createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'prc_002', companyId: 'comp_001', code: 'TAR-002', name: 'Tarif lourd Douala → Yaoundé',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    category: 'standard', minWeight: 50, maxWeight: 200,
    unitPrice: 1200, fixedPrice: 0, insuranceRate: 0.05, additionalFees: 5000,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Tarif réduit pour gros volumes',
    createdAt: '2026-01-01T00:00:01Z', updatedAt: '2026-01-01T00:00:01Z',
  },
  {
    id: 'prc_003', companyId: 'comp_001', code: 'TAR-003', name: 'Électronique Douala → Yaoundé',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    category: 'électronique', minWeight: 1, maxWeight: 100,
    unitPrice: 2500, fixedPrice: 0, insuranceRate: 0.08, additionalFees: 10000,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Catégorie fragile — assurance majorée',
    createdAt: '2026-01-01T00:00:02Z', updatedAt: '2026-01-01T00:00:02Z',
  },
  {
    id: 'prc_004', companyId: 'comp_001', code: 'TAR-004', name: 'Documents nationaux',
    originAgencyId: '', originAgencyName: 'Toutes', originCity: 'Toutes',
    destinationAgencyId: '', destinationAgencyName: 'Toutes', destinationCity: 'Toutes',
    category: 'documents', minWeight: 0.1, maxWeight: 5,
    unitPrice: 3000, fixedPrice: 0, insuranceRate: 0.02, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Tarif fixe pour documents quelle que soit la destination',
    createdAt: '2026-01-01T00:00:03Z', updatedAt: '2026-01-01T00:00:03Z',
  },
  {
    id: 'prc_005', companyId: 'comp_001', code: 'TAR-005', name: 'Tarif Douala → Bamenda',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_004', destinationAgencyName: 'Agence Bamenda', destinationCity: 'Bamenda',
    category: 'standard', minWeight: 1, maxWeight: 100,
    unitPrice: 1800, fixedPrice: 0, insuranceRate: 0.05, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: '',
    createdAt: '2026-01-01T00:00:04Z', updatedAt: '2026-01-01T00:00:04Z',
  },
  {
    id: 'prc_006', companyId: 'comp_001', code: 'TAR-006', name: 'Mobilier longue distance',
    originAgencyId: '', originAgencyName: 'Toutes', originCity: 'Toutes',
    destinationAgencyId: '', destinationAgencyName: 'Toutes', destinationCity: 'Toutes',
    category: 'mobilier', minWeight: 5, maxWeight: 200,
    unitPrice: 2000, fixedPrice: 10000, insuranceRate: 0.06, additionalFees: 15000,
    currency: 'FC', effectiveFrom: '2026-03-01', effectiveTo: null,
    status: 'active', observation: 'Frais fixe + frais supplémentaire pour encombrement',
    createdAt: '2026-03-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prc_007', companyId: 'comp_001', code: 'TAR-007', name: 'Tarif promotionnel Été 2026',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    category: 'standard', minWeight: 1, maxWeight: 30,
    unitPrice: 1000, fixedPrice: 0, insuranceRate: 0.05, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-06-01', effectiveTo: '2026-08-31',
    status: 'active', observation: 'Promotion été — validée du 01/06 au 31/08/2026',
    createdAt: '2026-05-15T00:00:00Z', updatedAt: '2026-05-15T00:00:00Z',
  },
  {
    id: 'prc_008', companyId: 'comp_001', code: 'TAR-008', name: 'Ancien tarif Douala → Yaoundé',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    category: 'standard', minWeight: 1, maxWeight: 50,
    unitPrice: 2000, fixedPrice: 0, insuranceRate: 0.05, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2025-01-01', effectiveTo: '2025-12-31',
    status: 'inactive', observation: 'Tarif expiré — remplacé par TAR-001',
    createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-12-31T23:59:59Z',
  },
  {
    id: 'prc_009', companyId: 'comp_001', code: 'TAR-009', name: 'Alimentation nationale',
    originAgencyId: '', originAgencyName: 'Toutes', originCity: 'Toutes',
    destinationAgencyId: '', destinationAgencyName: 'Toutes', destinationCity: 'Toutes',
    category: 'alimentation', minWeight: 1, maxWeight: 100,
    unitPrice: 1300, fixedPrice: 0, insuranceRate: 0.03, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Tarif alimentaire réduit',
    createdAt: '2026-01-01T00:00:05Z', updatedAt: '2026-01-01T00:00:05Z',
  },
  {
    id: 'prc_010', companyId: 'comp_001', code: 'TAR-010', name: 'Bagages légers',
    originAgencyId: '', originAgencyName: 'Toutes', originCity: 'Toutes',
    destinationAgencyId: '', destinationAgencyName: 'Toutes', destinationCity: 'Toutes',
    category: 'bagages', minWeight: 1, maxWeight: 25,
    unitPrice: 2000, fixedPrice: 0, insuranceRate: 0.04, additionalFees: 0,
    currency: 'FC', effectiveFrom: '2026-01-01', effectiveTo: null,
    status: 'active', observation: 'Tarif bagages personnels',
    createdAt: '2026-01-01T00:00:06Z', updatedAt: '2026-01-01T00:00:06Z',
  },
];

let historyDB = [
  { id: 'ph_001', pricingId: 'prc_001', companyId: 'comp_001', type: 'creation', description: 'Tarif créé', timestamp: '2026-01-01T00:00:00Z', userId: 'usr_001' },
  { id: 'ph_002', pricingId: 'prc_008', companyId: 'comp_001', type: 'creation', description: 'Tarif créé', timestamp: '2025-01-01T00:00:00Z', userId: 'usr_001' },
  { id: 'ph_003', pricingId: 'prc_008', companyId: 'comp_001', type: 'desactivation', description: 'Tarif désactivé — expiré', timestamp: '2025-12-31T23:59:59Z', userId: 'usr_001' },
  { id: 'ph_004', pricingId: 'prc_007', companyId: 'comp_001', type: 'creation', description: 'Tarif promotionnel créé', timestamp: '2026-05-15T00:00:00Z', userId: 'usr_001' },
];

let nextPricingId = 11;
let nextHistoryId = 5;

function getByCompany(companyId) { return pricingDB.filter((p) => p.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((p) =>
    p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) ||
    p.originCity.toLowerCase().includes(q) || p.destinationCity.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) || p.status.toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.originCity && p.originCity !== filters.originCity) return false;
    if (filters.destinationCity && p.destinationCity !== filters.destinationCity) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.dateFrom && p.effectiveFrom < filters.dateFrom) return false;
    if (filters.dateTo && p.effectiveFrom > filters.dateTo) return false;
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

export const PRICING_STATUSES = { ACTIVE: 'active', INACTIVE: 'inactive' };

export const PRICING_STATUS_LABELS = { active: 'Actif', inactive: 'Inactif' };

export const PRICING_STATUS_COLORS = { active: 'success', inactive: 'secondary' };

export const PRICING_CATEGORIES = [
  { value: 'standard', label: 'Standard' },
  { value: 'électronique', label: 'Électronique' },
  { value: 'documents', label: 'Documents' },
  { value: 'alimentation', label: 'Alimentation' },
  { value: 'mobilier', label: 'Mobilier' },
  { value: 'vêtements', label: 'Vêtements' },
  { value: 'bagages', label: 'Bagages' },
  { value: 'pièces', label: 'Pièces détachées' },
  { value: 'médicaments', label: 'Médicaments' },
  { value: 'autre', label: 'Autre' },
];

export const mockPricingService = {
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

  async getById(companyId, pricingId) {
    await simulateDelay(250);
    const pricing = getByCompany(companyId).find((p) => p.id === pricingId);
    if (!pricing) throw new Error('Tarif non trouvé');
    return pricing;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const code = `TAR-${String(nextPricingId).padStart(3, '0')}`;
    const pricing = {
      id: `prc_${String(nextPricingId++).padStart(3, '0')}`,
      companyId, code, ...data,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    pricingDB = [...pricingDB, pricing];
    historyDB = [...historyDB, { id: `ph_${String(nextHistoryId++).padStart(3, '0')}`, pricingId: pricing.id, companyId, type: 'creation', description: 'Tarif créé', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return pricing;
  },

  async update(companyId, pricingId, data) {
    await simulateDelay(400);
    const idx = pricingDB.findIndex((p) => p.id === pricingId && p.companyId === companyId);
    if (idx === -1) throw new Error('Tarif non trouvé');
    pricingDB[idx] = { ...pricingDB[idx], ...data, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `ph_${String(nextHistoryId++).padStart(3, '0')}`, pricingId, companyId, type: 'modification', description: 'Tarif modifié', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return pricingDB[idx];
  },

  async activate(companyId, pricingId) {
    await simulateDelay(300);
    const idx = pricingDB.findIndex((p) => p.id === pricingId && p.companyId === companyId);
    if (idx === -1) throw new Error('Tarif non trouvé');
    pricingDB[idx] = { ...pricingDB[idx], status: 'active', updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `ph_${String(nextHistoryId++).padStart(3, '0')}`, pricingId, companyId, type: 'activation', description: 'Tarif activé', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return pricingDB[idx];
  },

  async deactivate(companyId, pricingId) {
    await simulateDelay(300);
    const idx = pricingDB.findIndex((p) => p.id === pricingId && p.companyId === companyId);
    if (idx === -1) throw new Error('Tarif non trouvé');
    pricingDB[idx] = { ...pricingDB[idx], status: 'inactive', updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `ph_${String(nextHistoryId++).padStart(3, '0')}`, pricingId, companyId, type: 'desactivation', description: 'Tarif désactivé', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return pricingDB[idx];
  },

  async calculate(companyId, { originCity, destinationCity, category, weight, declaredValue }) {
    await simulateDelay(200);
    const items = getByCompany(companyId).filter((p) => p.status === 'active');
    const match = items.find((p) => {
      const cityMatch = (p.originCity === 'Toutes' || p.originCity === originCity) && (p.destinationCity === 'Toutes' || p.destinationCity === destinationCity);
      const catMatch = p.category === category;
      const weightMatch = weight >= p.minWeight && weight <= p.maxWeight;
      return cityMatch && catMatch && weightMatch;
    }) || items.find((p) => {
      const cityMatch = (p.originCity === 'Toutes' || p.originCity === originCity) && (p.destinationCity === 'Toutes' || p.destinationCity === destinationCity);
      const weightMatch = weight >= p.minWeight && weight <= p.maxWeight;
      return cityMatch && weightMatch;
    });
    if (!match) return { found: false, transportAmount: 0, insuranceAmount: 0, additionalFees: 0, totalAmount: 0 };
    const transportAmount = Math.ceil((weight * match.unitPrice) + match.fixedPrice);
    const insuranceAmount = declaredValue ? Math.ceil(declaredValue * match.insuranceRate) : 0;
    const additionalFees = match.additionalFees || 0;
    return { found: true, pricingId: match.id, pricingCode: match.code, pricingName: match.name, transportAmount, insuranceAmount, additionalFees, totalAmount: transportAmount + insuranceAmount + additionalFees, currency: match.currency };
  },

  async duplicate(companyId, pricingId) {
    await simulateDelay(400);
    const source = getByCompany(companyId).find((p) => p.id === pricingId);
    if (!source) throw new Error('Tarif non trouvé');
    const code = `TAR-${String(nextPricingId).padStart(3, '0')}`;
    const copy = {
      id: `prc_${String(nextPricingId++).padStart(3, '0')}`,
      companyId, code, name: `${source.name} (copie)`,
      originAgencyId: source.originAgencyId, originAgencyName: source.originAgencyName, originCity: source.originCity,
      destinationAgencyId: source.destinationAgencyId, destinationAgencyName: source.destinationAgencyName, destinationCity: source.destinationCity,
      category: source.category, minWeight: source.minWeight, maxWeight: source.maxWeight,
      unitPrice: source.unitPrice, fixedPrice: source.fixedPrice, insuranceRate: source.insuranceRate, additionalFees: source.additionalFees,
      currency: source.currency, effectiveFrom: new Date().toISOString().slice(0, 10), effectiveTo: null,
      status: 'active', observation: `Copié de ${source.code}`,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    pricingDB = [...pricingDB, copy];
    historyDB = [...historyDB, { id: `ph_${String(nextHistoryId++).padStart(3, '0')}`, pricingId: copy.id, companyId, type: 'creation', description: `Tarif copié depuis ${source.code}`, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return copy;
  },

  async getHistory(companyId, pricingId) {
    await simulateDelay(200);
    return historyDB.filter((h) => h.pricingId === pricingId && h.companyId === companyId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      active: items.filter((p) => p.status === 'active').length,
      inactive: items.filter((p) => p.status === 'inactive').length,
      categories: [...new Set(items.map((p) => p.category))].length,
      avgPrice: items.length ? Math.round(items.reduce((sum, p) => sum + p.unitPrice, 0) / items.length) : 0,
    };
  },
};
