const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let paymentsDB = [
  {
    id: 'pay_001', companyId: 'comp_001', reference: 'PAI-20260701-001',
    shipmentId: 'shp_001', shipmentNumber: 'EXP-20260701-0001',
    clientId: 'cli_001', clientName: 'Jean Kabongo', clientPhone: '+237812345678',
    transportAmount: 120000, insuranceAmount: 50000, additionalFees: 0, discount: 0,
    totalAmount: 170000, paidAmount: 170000, remainingAmount: 0,
    paymentMethod: 'cash', status: 'paid',
    agentId: 'usr_002', agentName: 'Agent Guichet',
    comment: 'Paiement complet en espèces', receiptNumber: 'REC-001',
    createdAt: '2026-07-01T09:15:00Z', updatedAt: '2026-07-01T09:15:00Z',
  },
  {
    id: 'pay_002', companyId: 'comp_001', reference: 'PAI-20260710-002',
    shipmentId: 'shp_002', shipmentNumber: 'EXP-20260710-0002',
    clientId: 'cli_008', clientName: 'Chantal Ilunga', clientPhone: '+237889012345',
    transportAmount: 70000, insuranceAmount: 25000, additionalFees: 0, discount: 0,
    totalAmount: 95000, paidAmount: 95000, remainingAmount: 0,
    paymentMethod: 'mobile_money_orange', status: 'paid',
    agentId: 'usr_002', agentName: 'Agent Guichet',
    comment: 'Orange Money — OTP vérifié', receiptNumber: 'REC-002',
    createdAt: '2026-07-10T10:30:00Z', updatedAt: '2026-07-10T10:30:00Z',
  },
  {
    id: 'pay_003', companyId: 'comp_001', reference: 'PAI-20260706-003',
    shipmentId: 'shp_014', shipmentNumber: 'EXP-20260706-0014',
    clientId: 'cli_008', clientName: 'Chantal Ilunga', clientPhone: '+237889012345',
    transportAmount: 360000, insuranceAmount: 600000, additionalFees: 0, discount: 0,
    totalAmount: 960000, paidAmount: 960000, remainingAmount: 0,
    paymentMethod: 'cash', status: 'paid',
    agentId: 'usr_001', agentName: 'Admin',
    comment: 'Paiement complet — valeur élevée', receiptNumber: 'REC-003',
    createdAt: '2026-07-06T07:00:00Z', updatedAt: '2026-07-06T07:00:00Z',
  },
  {
    id: 'pay_004', companyId: 'comp_001', reference: 'PAI-20260703-004',
    shipmentId: 'shp_012', shipmentNumber: 'EXP-20260703-0012',
    clientId: 'cli_015', clientName: 'Rodrigue Ngoy', clientPhone: '+237856009900',
    transportAmount: 28000, insuranceAmount: 17500, additionalFees: 0, discount: 0,
    totalAmount: 45500, paidAmount: 45500, remainingAmount: 0,
    paymentMethod: 'mobile_money_mtn', status: 'paid',
    agentId: 'usr_001', agentName: 'Admin',
    comment: 'MTN Mobile Money', receiptNumber: 'REC-004',
    createdAt: '2026-07-03T09:00:00Z', updatedAt: '2026-07-03T09:00:00Z',
  },
  {
    id: 'pay_005', companyId: 'comp_001', reference: 'PAI-20260702-005',
    shipmentId: 'shp_011', shipmentNumber: 'EXP-20260702-0011',
    clientId: 'cli_012', clientName: 'Céline Wa Mukendi', clientPhone: '+237823003344',
    transportAmount: 50000, insuranceAmount: 40000, additionalFees: 0, discount: 5000,
    totalAmount: 85000, paidAmount: 50000, remainingAmount: 35000,
    paymentMethod: 'mobile_money_orange', status: 'partial',
    agentId: 'usr_001', agentName: 'Admin',
    comment: 'Acompte 50 000 FC — reste à payer 35 000 FC',
    createdAt: '2026-07-02T07:30:00Z', updatedAt: '2026-07-02T07:30:00Z',
  },
  {
    id: 'pay_006', companyId: 'comp_001', reference: 'PAI-20260711-006',
    shipmentId: 'shp_018', shipmentNumber: 'EXP-20260711-0018',
    clientId: 'cli_025', clientName: 'Alain Kapela', clientPhone: '+237856029900',
    transportAmount: 145000, insuranceAmount: 55000, additionalFees: 0, discount: 0,
    totalAmount: 200000, paidAmount: 200000, remainingAmount: 0,
    paymentMethod: 'bank_transfer', status: 'paid',
    agentId: 'usr_001', agentName: 'Admin',
    comment: 'Virement bancaire — reçu confirmé', receiptNumber: 'REC-006',
    createdAt: '2026-07-11T07:30:00Z', updatedAt: '2026-07-11T07:30:00Z',
  },
  {
    id: 'pay_007', companyId: 'comp_001', reference: 'PAI-20260701-007',
    shipmentId: 'shp_006', shipmentNumber: 'EXP-20260601-0006',
    clientId: 'cli_011', clientName: 'Patrick Kalala', clientPhone: '+237812001122',
    transportAmount: 85000, insuranceAmount: 105000, additionalFees: 0, discount: 0,
    totalAmount: 190000, paidAmount: 190000, remainingAmount: 0,
    paymentMethod: 'cash', status: 'paid',
    agentId: 'usr_002', agentName: 'Agent Guichet',
    comment: '', receiptNumber: 'REC-007',
    createdAt: '2026-06-01T09:15:00Z', updatedAt: '2026-06-01T09:15:00Z',
  },
  {
    id: 'pay_008', companyId: 'comp_001', reference: 'PAI-20260717-008',
    shipmentId: 'shp_005', shipmentNumber: 'EXP-20260717-0005',
    clientId: 'cli_006', clientName: 'Grace Tshilombo', clientPhone: '+237867890123',
    transportAmount: 30000, insuranceAmount: 5000, additionalFees: 0, discount: 0,
    totalAmount: 35000, paidAmount: 0, remainingAmount: 35000,
    paymentMethod: 'cash', status: 'cancelled',
    agentId: 'usr_002', agentName: 'Agent Guichet',
    comment: 'Annulé — remboursé', receiptNumber: '',
    createdAt: '2026-07-17T14:30:00Z', updatedAt: '2026-07-17T15:30:00Z',
  },
  {
    id: 'pay_009', companyId: 'comp_001', reference: 'PAI-20260708-009',
    shipmentId: 'shp_015', shipmentNumber: 'EXP-20260708-0015',
    clientId: 'cli_004', clientName: 'Sarah Ngandu', clientPhone: '+237845678901',
    transportAmount: 30000, insuranceAmount: 0, additionalFees: 0, discount: 0,
    totalAmount: 30000, paidAmount: 0, remainingAmount: 30000,
    paymentMethod: '', status: 'pending',
    agentId: 'usr_002', agentName: 'Agent Guichet',
    comment: 'En attente de paiement', receiptNumber: '',
    createdAt: '2026-07-08T10:00:00Z', updatedAt: '2026-07-08T10:00:00Z',
  },
  {
    id: 'pay_010', companyId: 'comp_001', reference: 'PAI-20260713-010',
    shipmentId: 'shp_020', shipmentNumber: 'EXP-20260713-0020',
    clientId: 'cli_021', clientName: 'Hippolyte Mutambayi', clientPhone: '+237812021122',
    transportAmount: 250000, insuranceAmount: 400000, additionalFees: 0, discount: 10000,
    totalAmount: 640000, paidAmount: 300000, remainingAmount: 340000,
    paymentMethod: 'bank_transfer', status: 'partial',
    agentId: 'usr_001', agentName: 'Admin',
    comment: 'Acompte 300 000 FC — solde à régler à la livraison',
    createdAt: '2026-07-13T09:00:00Z', updatedAt: '2026-07-13T09:00:00Z',
  },
];

let historyDB = [
  { id: 'pyh_001', paymentId: 'pay_001', companyId: 'comp_001', type: 'creation', description: 'Paiement créé', amount: 170000, timestamp: '2026-07-01T09:15:00Z', userId: 'usr_002' },
  { id: 'pyh_002', paymentId: 'pay_001', companyId: 'comp_001', type: 'validation', description: 'Paiement validé', amount: 170000, timestamp: '2026-07-01T09:15:00Z', userId: 'usr_001' },
  { id: 'pyh_003', paymentId: 'pay_005', companyId: 'comp_001', type: 'creation', description: 'Acompte enregistré', amount: 50000, timestamp: '2026-07-02T07:30:00Z', userId: 'usr_001' },
  { id: 'pyh_004', paymentId: 'pay_008', companyId: 'comp_001', type: 'creation', description: 'Paiement créé', amount: 35000, timestamp: '2026-07-17T14:30:00Z', userId: 'usr_002' },
  { id: 'pyh_005', paymentId: 'pay_008', companyId: 'comp_001', type: 'annulation', description: 'Paiement annulé', amount: 35000, timestamp: '2026-07-17T15:30:00Z', userId: 'usr_001' },
  { id: 'pyh_006', paymentId: 'pay_008', companyId: 'comp_001', type: 'remboursement', description: 'Montant remboursé', amount: 35000, timestamp: '2026-07-17T15:45:00Z', userId: 'usr_001' },
  { id: 'pyh_007', paymentId: 'pay_010', companyId: 'comp_001', type: 'creation', description: 'Acompte enregistré', amount: 300000, timestamp: '2026-07-13T09:00:00Z', userId: 'usr_001' },
];

let nextPaymentId = 11;
let nextHistId = 8;

function getByCompany(companyId) { return paymentsDB.filter((p) => p.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((p) =>
    p.reference.toLowerCase().includes(q) || p.shipmentNumber.toLowerCase().includes(q) ||
    p.clientName.toLowerCase().includes(q) || p.clientPhone.includes(q) ||
    p.status.toLowerCase().includes(q) || (p.paymentMethod || '').toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.paymentMethod && p.paymentMethod !== filters.paymentMethod) return false;
    if (filters.dateFrom && p.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && p.createdAt > filters.dateTo + 'T23:59:59Z') return false;
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

export const PAYMENT_STATUS = {
  PENDING: 'pending', PARTIAL: 'partial', PAID: 'paid', CANCELLED: 'cancelled', REFUNDED: 'refunded',
};

export const PAYMENT_STATUS_LABELS = {
  pending: 'En attente', partial: 'Partiellement payé', paid: 'Payé', cancelled: 'Annulé', refunded: 'Remboursé',
};

export const PAYMENT_STATUS_COLORS = {
  pending: 'warning', partial: 'info', paid: 'success', cancelled: 'danger', refunded: 'secondary',
};

export const PAYMENT_METHODS = {
  CASH: 'cash', MOBILE_MONEY_ORANGE: 'mobile_money_orange', MOBILE_MONEY_MTN: 'mobile_money_mtn',
  CARD: 'card', BANK_TRANSFER: 'bank_transfer', CHECK: 'check',
};

export const PAYMENT_METHOD_LABELS = {
  cash: 'Espèces', mobile_money_orange: 'Orange Money', mobile_money_mtn: 'MTN Mobile Money',
  card: 'Carte bancaire', bank_transfer: 'Virement bancaire', check: 'Chèque',
};

export const mockPaymentsService = {
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

  async getById(companyId, paymentId) {
    await simulateDelay(250);
    const payment = getByCompany(companyId).find((p) => p.id === paymentId);
    if (!payment) throw new Error('Paiement non trouvé');
    return payment;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const code = `PAI-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(nextPaymentId).padStart(3, '0')}`;
    const remaining = Math.max(0, data.totalAmount - data.paidAmount);
    const status = remaining <= 0 ? 'paid' : data.paidAmount > 0 ? 'partial' : 'pending';
    const payment = {
      id: `pay_${String(nextPaymentId++).padStart(3, '0')}`,
      companyId, reference: code, ...data,
      remainingAmount: remaining, status,
      receiptNumber: status === 'paid' ? `REC-${String(nextPaymentId - 1).padStart(3, '0')}` : '',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    paymentsDB = [...paymentsDB, payment];
    historyDB = [...historyDB, { id: `pyh_${String(nextHistId++).padStart(3, '0')}`, paymentId: payment.id, companyId, type: 'creation', description: 'Paiement créé', amount: data.paidAmount, timestamp: new Date().toISOString(), userId: data.agentId || 'usr_001' }];
    return payment;
  },

  async update(companyId, paymentId, data) {
    await simulateDelay(400);
    const idx = paymentsDB.findIndex((p) => p.id === paymentId && p.companyId === companyId);
    if (idx === -1) throw new Error('Paiement non trouvé');
    paymentsDB[idx] = { ...paymentsDB[idx], ...data, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `pyh_${String(nextHistId++).padStart(3, '0')}`, paymentId, companyId, type: 'modification', description: 'Paiement modifié', amount: data.paidAmount || 0, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return paymentsDB[idx];
  },

  async cancel(companyId, paymentId) {
    await simulateDelay(300);
    const idx = paymentsDB.findIndex((p) => p.id === paymentId && p.companyId === companyId);
    if (idx === -1) throw new Error('Paiement non trouvé');
    paymentsDB[idx] = { ...paymentsDB[idx], status: 'cancelled', paidAmount: 0, remainingAmount: paymentsDB[idx].totalAmount, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `pyh_${String(nextHistId++).padStart(3, '0')}`, paymentId, companyId, type: 'annulation', description: 'Paiement annulé', amount: 0, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return paymentsDB[idx];
  },

  async getHistory(companyId, paymentId) {
    await simulateDelay(200);
    return historyDB.filter((h) => h.paymentId === paymentId && h.companyId === companyId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      paid: items.filter((p) => p.status === 'paid').length,
      partial: items.filter((p) => p.status === 'partial').length,
      pending: items.filter((p) => p.status === 'pending').length,
      cancelled: items.filter((p) => p.status === 'cancelled').length,
      totalAmount: items.reduce((sum, p) => sum + p.totalAmount, 0),
      totalPaid: items.reduce((sum, p) => sum + p.paidAmount, 0),
      totalRemaining: items.reduce((sum, p) => sum + p.remainingAmount, 0),
    };
  },
};
