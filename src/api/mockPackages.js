import { PACKAGE_STATUS } from '../config/constants';

const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let packagesDB = [
  {
    id: 'pkg_001', companyId: 'comp_001', trackingCode: 'PKG-20260701-0001',
    label: 'Carton vêtements', category: 'vêtements', description: 'Vêtements divers pour revente',
    weight: 15, length: 50, width: 40, height: 30, declaredValue: 200000, fragile: false, insured: true, insuranceAmount: 10000, transportAmount: 25000, totalAmount: 35000,
    status: PACKAGE_STATUS.DELIVERED,
    senderId: 'cli_001', senderName: 'Jean Kabongo', senderPhone: '+237812345678',
    receiverId: 'cli_003', receiverName: 'Pierre Mukendi', receiverPhone: '+237834567890',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    observation: 'Fragile', createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-07-05T14:00:00Z', deliveredAt: '2026-07-05T14:00:00Z',
  },
  {
    id: 'pkg_002', companyId: 'comp_001', trackingCode: 'PKG-20260710-0002',
    label: 'Sac riz 25kg', category: 'alimentation', description: 'Riz premium importé',
    weight: 25, length: 60, width: 40, height: 40, declaredValue: 150000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 40000, totalAmount: 40000,
    status: PACKAGE_STATUS.IN_TRANSIT,
    senderId: 'cli_008', senderName: 'Chantal Ilunga', senderPhone: '+237889012345',
    receiverId: 'cli_001', receiverName: 'Jean Kabongo', receiverPhone: '+237812345678',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Bamenda',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    observation: '', createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-12T06:00:00Z',
  },
  {
    id: 'pkg_003', companyId: 'comp_001', trackingCode: 'PKG-20260715-0003',
    label: 'Télévision LED 55"', category: 'électronique', description: 'TV Samsung Smart TV',
    weight: 18, length: 130, width: 80, height: 10, declaredValue: 800000, fragile: true, insured: true, insuranceAmount: 40000, transportAmount: 55000, totalAmount: 95000,
    status: PACKAGE_STATUS.COLLECTED,
    senderId: 'cli_003', senderName: 'Pierre Mukendi', senderPhone: '+237834567890',
    receiverId: 'cli_010', receiverName: 'Esther Mbuyi', receiverPhone: '+237801234567',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    observation: 'Très fragile — manipuler avec précaution', createdAt: '2026-07-15T09:00:00Z', updatedAt: '2026-07-20T11:00:00Z', collectedAt: '2026-07-20T11:00:00Z',
  },
  {
    id: 'pkg_004', companyId: 'comp_001', trackingCode: 'PKG-20260716-0004',
    label: 'Documents commerciaux', category: 'documents', description: 'Contrats et factures',
    weight: 2, length: 35, width: 25, height: 5, declaredValue: 50000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 8000, totalAmount: 8000,
    status: PACKAGE_STATUS.PENDING,
    senderId: 'cli_002', senderName: 'Marie Mutombo', senderPhone: '+237823456789',
    receiverId: 'cli_007', receiverName: 'Emmanuel Kasongo', receiverPhone: '+237878901234',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    observation: 'Documents urgents', createdAt: '2026-07-16T11:00:00Z', updatedAt: '2026-07-16T11:00:00Z',
  },
  {
    id: 'pkg_005', companyId: 'comp_001', trackingCode: 'PKG-20260717-0005',
    label: 'Carton pièces mécaniques', category: 'pièces', description: 'Pièces détachées moteur',
    weight: 20, length: 40, width: 30, height: 30, declaredValue: 100000, fragile: true, insured: true, insuranceAmount: 5000, transportAmount: 30000, totalAmount: 35000,
    status: PACKAGE_STATUS.CANCELLED,
    senderId: 'cli_006', senderName: 'Grace Tshilombo', senderPhone: '+237867890123',
    receiverId: 'cli_004', receiverName: 'Sarah Ngandu', receiverPhone: '+237845678901',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Garoua',
    observation: 'Annulé par le client', createdAt: '2026-07-17T14:00:00Z', updatedAt: '2026-07-17T15:00:00Z',
  },
  {
    id: 'pkg_006', companyId: 'comp_001', trackingCode: 'PKG-20260718-0006',
    label: 'Sac médicaments', category: 'médicaments', description: 'Médicaments essentiels',
    weight: 8, length: 40, width: 30, height: 25, declaredValue: 300000, fragile: false, insured: true, insuranceAmount: 15000, transportAmount: 20000, totalAmount: 35000,
    status: PACKAGE_STATUS.READY,
    senderId: 'cli_009', senderName: 'Robert Njoya', senderPhone: '+237856789012',
    receiverId: 'cli_011', receiverName: 'Patrick Kalala', receiverPhone: '+237812001122',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_005', destinationAgencyName: 'Agence Bafoussam', destinationCity: 'Bafoussam',
    observation: 'Médicaments — température ambiante', createdAt: '2026-07-18T09:30:00Z', updatedAt: '2026-07-18T10:00:00Z',
  },
  {
    id: 'pkg_007', companyId: 'comp_001', trackingCode: 'PKG-20260719-0007',
    label: 'Meubles salon', category: 'mobilier', description: 'Canapé 3 places',
    weight: 45, length: 200, width: 90, height: 80, declaredValue: 500000, fragile: true, insured: true, insuranceAmount: 25000, transportAmount: 80000, totalAmount: 105000,
    status: PACKAGE_STATUS.REGISTERED,
    senderId: 'cli_012', senderName: 'Céline Wa Mukendi', senderPhone: '+237823003344',
    receiverId: 'cli_013', receiverName: 'Alain Kapela', receiverPhone: '+237856029900',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_006', destinationAgencyName: 'Agence Maroua', destinationCity: 'Maroua',
    observation: 'Volume important', createdAt: '2026-07-19T14:00:00Z', updatedAt: '2026-07-19T14:15:00Z',
  },
  {
    id: 'pkg_008', companyId: 'comp_001', trackingCode: 'PKG-20260720-0008',
    label: 'Carton marchandises', category: 'commerce', description: 'Textiles et tissus',
    weight: 30, length: 60, width: 50, height: 40, declaredValue: 500000, fragile: false, insured: true, insuranceAmount: 25000, transportAmount: 50000, totalAmount: 75000,
    status: PACKAGE_STATUS.ARRIVED,
    senderId: 'cli_014', senderName: 'Hippolyte Mutambayi', senderPhone: '+237812021122',
    receiverId: 'cli_015', receiverName: 'Rodrigue Ngoy', receiverPhone: '+237856009900',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Bamenda',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    observation: '', createdAt: '2026-07-20T08:00:00Z', updatedAt: '2026-07-23T16:00:00Z',
  },
  {
    id: 'pkg_009', companyId: 'comp_001', trackingCode: 'PKG-20260721-0009',
    label: 'Valise bagages', category: 'bagages', description: 'Bagages personnels',
    weight: 12, length: 70, width: 50, height: 25, declaredValue: 300000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 20000, totalAmount: 20000,
    status: PACKAGE_STATUS.AVAILABLE_PICKUP,
    senderId: 'cli_008', senderName: 'Chantal Ilunga', senderPhone: '+237889012345',
    receiverId: 'cli_001', receiverName: 'Jean Kabongo', receiverPhone: '+237812345678',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Yaoundé',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    observation: '', createdAt: '2026-07-21T10:30:00Z', updatedAt: '2026-07-24T09:00:00Z',
  },
  {
    id: 'pkg_010', companyId: 'comp_001', trackingCode: 'PKG-20260722-0010',
    label: 'Carton aliments', category: 'alimentation', description: 'Conserves et épices',
    weight: 18, length: 45, width: 35, height: 30, declaredValue: 120000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 28000, totalAmount: 28000,
    status: PACKAGE_STATUS.IN_TRANSIT,
    senderId: 'cli_002', senderName: 'Marie Mutombo', senderPhone: '+237823456789',
    receiverId: 'cli_016', receiverName: 'Samuel Mballa', receiverPhone: '+237890123456',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_007', destinationAgencyName: 'Agence Limbé', destinationCity: 'Limbé',
    observation: '', createdAt: '2026-07-22T13:00:00Z', updatedAt: '2026-07-22T15:00:00Z',
  },
  {
    id: 'pkg_011', companyId: 'comp_001', trackingCode: 'PKG-20260723-0011',
    label: 'Carton vêtements enfant', category: 'vêtements', description: 'Vêtements enfants collection',
    weight: 10, length: 40, width: 30, height: 25, declaredValue: 180000, fragile: false, insured: true, insuranceAmount: 9000, transportAmount: 18000, totalAmount: 27000,
    status: PACKAGE_STATUS.DRAFT,
    senderId: 'cli_006', senderName: 'Grace Tshilombo', senderPhone: '+237867890123',
    receiverId: 'cli_017', receiverName: 'David Tchidjou', receiverPhone: '+237834009988',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    observation: 'Brouillon — en attente de validation', createdAt: '2026-07-23T16:00:00Z', updatedAt: '2026-07-23T16:00:00Z',
  },
  {
    id: 'pkg_012', companyId: 'comp_001', trackingCode: 'PKG-20260724-0012',
    label: 'Laptop et accessoires', category: 'électronique', description: 'Dell Latitude + chargeur',
    weight: 3, length: 40, width: 30, height: 10, declaredValue: 650000, fragile: true, insured: true, insuranceAmount: 32500, transportAmount: 15000, totalAmount: 47500,
    status: PACKAGE_STATUS.PENDING,
    senderId: 'cli_013', senderName: 'Alain Kapela', senderPhone: '+237856029900',
    receiverId: 'cli_018', receiverName: 'Sandrine Ngo Biyick', receiverPhone: '+237677334455',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    observation: 'Fragile — ne pas retourner', createdAt: '2026-07-24T08:00:00Z', updatedAt: '2026-07-24T08:00:00Z',
  },
];

let historyDB = [
  { id: 'pkh_001', packageId: 'pkg_001', companyId: 'comp_001', type: 'creation', description: 'Colis enregistré à l\'agence centrale de Douala', timestamp: '2026-07-01T08:00:00Z', userId: 'usr_001' },
  { id: 'pkh_002', packageId: 'pkg_001', companyId: 'comp_001', type: 'validation', description: 'Colis validé et poids confirmé (15 kg)', timestamp: '2026-07-01T08:30:00Z', userId: 'usr_001' },
  { id: 'pkh_003', packageId: 'pkg_001', companyId: 'comp_001', type: 'transport', description: 'Colis en route vers Yaoundé', timestamp: '2026-07-02T06:00:00Z', userId: 'usr_002' },
  { id: 'pkh_004', packageId: 'pkg_001', companyId: 'comp_001', type: 'arrival', description: 'Colis arrivé à l\'agence de Yaoundé', timestamp: '2026-07-03T14:00:00Z', userId: 'usr_002' },
  { id: 'pkh_005', packageId: 'pkg_001', companyId: 'comp_001', type: 'livraison', description: 'Colis remis au destinataire Pierre Mukendi', timestamp: '2026-07-05T14:00:00Z', userId: 'usr_001' },
  { id: 'pkh_006', packageId: 'pkg_002', companyId: 'comp_001', type: 'creation', description: 'Colis enregistré à l\'agence de Bamenda', timestamp: '2026-07-10T10:00:00Z', userId: 'usr_001' },
  { id: 'pkh_007', packageId: 'pkg_002', companyId: 'comp_001', type: 'validation', description: 'Colis validé et poids confirmé (25 kg)', timestamp: '2026-07-10T10:30:00Z', userId: 'usr_001' },
  { id: 'pkh_008', packageId: 'pkg_002', companyId: 'comp_001', type: 'transport', description: 'Colis en route vers Douala', timestamp: '2026-07-12T06:00:00Z', userId: 'usr_002' },
  { id: 'pkh_009', packageId: 'pkg_003', companyId: 'comp_001', type: 'creation', description: 'Colis enregistré — TV Samsung 55"', timestamp: '2026-07-15T09:00:00Z', userId: 'usr_001' },
  { id: 'pkh_010', packageId: 'pkg_003', companyId: 'comp_001', type: 'transport', description: 'Colis en route vers Kribi', timestamp: '2026-07-17T08:00:00Z', userId: 'usr_002' },
  { id: 'pkh_011', packageId: 'pkg_003', companyId: 'comp_001', type: 'arrival', description: 'Colis arrivé à Kribi — disponible pour retrait', timestamp: '2026-07-19T16:00:00Z', userId: 'usr_002' },
  { id: 'pkh_012', packageId: 'pkg_003', companyId: 'comp_001', type: 'livraison', description: 'Colis récupéré par Esther Mbuyi', timestamp: '2026-07-20T11:00:00Z', userId: 'usr_001' },
  { id: 'pkh_013', packageId: 'pkg_005', companyId: 'comp_001', type: 'creation', description: 'Colis enregistré', timestamp: '2026-07-17T14:00:00Z', userId: 'usr_001' },
  { id: 'pkh_014', packageId: 'pkg_005', companyId: 'comp_001', type: 'annulation', description: 'Colis annulé par le client', timestamp: '2026-07-17T15:00:00Z', userId: 'usr_001' },
];

let paymentsDB = [
  { id: 'pkpay_001', packageId: 'pkg_001', companyId: 'comp_001', method: 'cash', amount: 35000, status: 'paid', reference: 'PKP-20260701-001', receiptNumber: 'PKR-001', createdAt: '2026-07-01T08:15:00Z' },
  { id: 'pkpay_002', packageId: 'pkg_002', companyId: 'comp_001', method: 'mobile_money_orange', amount: 40000, status: 'paid', reference: 'PKP-20260710-002', receiptNumber: 'PKR-002', createdAt: '2026-07-10T10:10:00Z' },
  { id: 'pkpay_003', packageId: 'pkg_003', companyId: 'comp_001', method: 'mobile_money_mtn', amount: 95000, status: 'paid', reference: 'PKP-20260715-003', receiptNumber: 'PKR-003', createdAt: '2026-07-15T09:05:00Z' },
  { id: 'pkpay_004', packageId: 'pkg_006', companyId: 'comp_001', method: 'bank_transfer', amount: 35000, status: 'paid', reference: 'PKP-20260718-004', receiptNumber: 'PKR-004', createdAt: '2026-07-18T09:35:00Z' },
  { id: 'pkpay_005', packageId: 'pkg_008', companyId: 'comp_001', method: 'cash', amount: 75000, status: 'paid', reference: 'PKP-20260720-005', receiptNumber: 'PKR-005', createdAt: '2026-07-20T08:10:00Z' },
  { id: 'pkpay_006', packageId: 'pkg_010', companyId: 'comp_001', method: 'mobile_money_orange', amount: 28000, status: 'pending', reference: 'PKP-20260722-006', receiptNumber: '', createdAt: '2026-07-22T13:05:00Z' },
];

let invoicesDB = [
  { id: 'pkinv_001', packageId: 'pkg_001', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260701-001', amount: 35000, taxRate: 0.18, taxAmount: 6300, totalAmount: 41300, status: 'paid', paidAt: '2026-07-01T08:15:00Z', createdAt: '2026-07-01T08:00:00Z' },
  { id: 'pkinv_002', packageId: 'pkg_002', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260710-002', amount: 40000, taxRate: 0.18, taxAmount: 7200, totalAmount: 47200, status: 'paid', paidAt: '2026-07-10T10:10:00Z', createdAt: '2026-07-10T10:00:00Z' },
  { id: 'pkinv_003', packageId: 'pkg_003', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260715-003', amount: 95000, taxRate: 0.18, taxAmount: 17100, totalAmount: 112100, status: 'paid', paidAt: '2026-07-15T09:05:00Z', createdAt: '2026-07-15T09:00:00Z' },
  { id: 'pkinv_004', packageId: 'pkg_006', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260718-004', amount: 35000, taxRate: 0.18, taxAmount: 6300, totalAmount: 41300, status: 'paid', paidAt: '2026-07-18T09:35:00Z', createdAt: '2026-07-18T09:30:00Z' },
  { id: 'pkinv_005', packageId: 'pkg_008', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260720-005', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-07-20T08:10:00Z', createdAt: '2026-07-20T08:00:00Z' },
  { id: 'pkinv_006', packageId: 'pkg_010', companyId: 'comp_001', invoiceNumber: 'FAC-PKG-20260722-006', amount: 28000, taxRate: 0.18, taxAmount: 5040, totalAmount: 33040, status: 'unpaid', paidAt: null, createdAt: '2026-07-22T13:00:00Z' },
];

let nextPackageId = 13;

function getByCompany(companyId) { return packagesDB.filter((p) => p.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((p) =>
    p.trackingCode.toLowerCase().includes(q) || p.label.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) || p.senderName.toLowerCase().includes(q) ||
    p.receiverName.toLowerCase().includes(q) || p.senderPhone.includes(q) ||
    p.receiverPhone.includes(q) || p.originCity.toLowerCase().includes(q) ||
    p.destinationCity.toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.fragile === 'true' && !p.fragile) return false;
    if (filters.fragile === 'false' && p.fragile) return false;
    if (filters.insured === 'true' && !p.insured) return false;
    if (filters.insured === 'false' && p.insured) return false;
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

export const PACKAGE_METHOD_LABELS = {
  cash: 'Espèces', mobile_money_orange: 'Orange Money', mobile_money_mtn: 'MTN Mobile Money',
  bank_transfer: 'Virement bancaire', card: 'Carte bancaire',
};

export const mockPackagesService = {
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

  async getById(companyId, packageId) {
    await simulateDelay(250);
    const pkg = getByCompany(companyId).find((p) => p.id === packageId);
    if (!pkg) throw new Error('Colis non trouvé');
    return pkg;
  },

  async getHistory(companyId, packageId) {
    await simulateDelay(200);
    return historyDB
      .filter((h) => h.packageId === packageId && h.companyId === companyId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getPayments(companyId, packageId) {
    await simulateDelay(200);
    return paymentsDB
      .filter((p) => p.packageId === packageId && p.companyId === companyId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getInvoices(companyId, packageId) {
    await simulateDelay(200);
    return invoicesDB
      .filter((i) => i.packageId === packageId && i.companyId === companyId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      draft: items.filter((p) => p.status === 'draft').length,
      pending: items.filter((p) => p.status === 'pending').length,
      registered: items.filter((p) => p.status === 'registered').length,
      ready: items.filter((p) => p.status === 'ready').length,
      in_transit: items.filter((p) => p.status === 'in_transit').length,
      arrived: items.filter((p) => p.status === 'arrived').length,
      available_pickup: items.filter((p) => p.status === 'available_pickup').length,
      collected: items.filter((p) => p.status === 'collected').length,
      cancelled: items.filter((p) => p.status === 'cancelled').length,
      totalWeight: items.reduce((sum, p) => sum + (p.weight || 0), 0),
      totalValue: items.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      avgWeight: items.length ? Math.round(items.reduce((sum, p) => sum + (p.weight || 0), 0) / items.length) : 0,
    };
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const code = `PKG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(nextPackageId).padStart(4, '0')}`;
    const pkg = {
      id: `pkg_${String(nextPackageId++).padStart(3, '0')}`,
      companyId, trackingCode: code, ...data,
      status: data.status || 'draft',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    packagesDB = [...packagesDB, pkg];
    historyDB = [...historyDB, {
      id: `pkh_${String(historyDB.length + 1).padStart(3, '0')}`,
      packageId: pkg.id, companyId, type: 'creation', description: 'Colis enregistré',
      timestamp: new Date().toISOString(), userId: 'usr_001',
    }];
    return pkg;
  },

  async updateStatus(companyId, packageId, newStatus) {
    await simulateDelay(400);
    const idx = packagesDB.findIndex((p) => p.id === packageId && p.companyId === companyId);
    if (idx === -1) throw new Error('Colis non trouvé');
    const statusLabels = {
      pending: 'En attente', registered: 'Enregistré', ready: 'Prêt',
      in_transit: 'En transit', arrived: 'Arrivé', available_pickup: 'Disponible pour retrait',
      collected: 'Récupéré par le destinataire', cancelled: 'Annulé', lost: 'Perdu', damaged: 'Endommagé',
    };
    packagesDB[idx] = { ...packagesDB[idx], status: newStatus, updatedAt: new Date().toISOString() };
    if (newStatus === 'collected') packagesDB[idx].collectedAt = new Date().toISOString();
    if (newStatus === 'delivered') packagesDB[idx].deliveredAt = new Date().toISOString();
    historyDB = [...historyDB, {
      id: `pkh_${String(historyDB.length + 1).padStart(3, '0')}`,
      packageId, companyId,
      type: newStatus === 'cancelled' ? 'annulation' : newStatus === 'collected' ? 'livraison' : 'modification',
      description: `Statut mis à jour: ${statusLabels[newStatus] || newStatus}`,
      timestamp: new Date().toISOString(), userId: 'usr_001',
    }];
    return packagesDB[idx];
  },

  async cancel(companyId, packageId) {
    await simulateDelay(300);
    const idx = packagesDB.findIndex((p) => p.id === packageId && p.companyId === companyId);
    if (idx === -1) throw new Error('Colis non trouvé');
    packagesDB[idx] = { ...packagesDB[idx], status: 'cancelled', updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, {
      id: `pkh_${String(historyDB.length + 1).padStart(3, '0')}`,
      packageId, companyId, type: 'annulation', description: 'Colis annulé',
      timestamp: new Date().toISOString(), userId: 'usr_001',
    }];
    return packagesDB[idx];
  },
};
