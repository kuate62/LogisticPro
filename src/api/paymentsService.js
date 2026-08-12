import apiClient from './axios';

const clientFullName = (client) => [client?.firstName, client?.lastName].filter(Boolean).join(' ');

export const mapPayment = (payment) => {
  const shipment = payment.shipment || {};
  const totalAmount = shipment.totalAmount || 0;
  const paidAmount = payment.amount || 0;
  const shipmentPaid = shipment.paidAmount ?? paidAmount;
  const remainingAmount = Math.max(0, totalAmount - shipmentPaid);

  let status = payment.status || 'pending';
  if (status === 'pending' && paidAmount > 0 && paidAmount < totalAmount) status = 'partial';

  const lastEntry = Array.isArray(payment.history) ? payment.history[payment.history.length - 1] : null;
  const comment = lastEntry?.description || payment.comment || '';

  return {
    ...payment,
    reference: payment.reference,
    shipmentNumber: shipment.reference || '',
    clientName: clientFullName(payment.client) || shipment.sender?.name || '',
    clientPhone: payment.client?.phone || shipment.sender?.phone || '',
    transportAmount: totalAmount,
    insuranceAmount: 0,
    additionalFees: 0,
    discount: 0,
    totalAmount,
    amount: payment.amount ?? totalAmount,
    paidAmount,
    remainingAmount,
    paymentMethod: payment.method,
    status,
    agentName: payment.agentName || null,
    agencyName: payment.agency?.name || '',
    comment,
    description: comment,
    date: payment.createdAt,
    receiptNumber: payment.transactionId || null,
  };
};

const searchFilter = (items, search) => {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((p) =>
    (p.reference || '').toLowerCase().includes(q) ||
    (p.shipmentNumber || '').toLowerCase().includes(q) ||
    (p.clientName || '').toLowerCase().includes(q) ||
    (p.clientPhone || '').includes(q) ||
    (p.status || '').toLowerCase().includes(q) ||
    (p.paymentMethod || '').toLowerCase().includes(q)
  );
};

const applyFilters = (items, filters = {}) => items.filter((p) => {
  if (filters.status && p.status !== filters.status) return false;
  if (filters.paymentMethod && p.paymentMethod !== filters.paymentMethod) return false;
  if (filters.dateFrom && new Date(p.createdAt) < new Date(filters.dateFrom)) return false;
  if (filters.dateTo && new Date(p.createdAt) > new Date(`${filters.dateTo}T23:59:59`)) return false;
  return true;
});

const applySort = (items, sort = {}) => {
  const { field = 'createdAt', direction = 'desc' } = sort;
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
};

const paginate = (items, page, perPage) => {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  return { data: items.slice(start, start + perPage), page, perPage, total, totalPages };
};

export const paymentsService = {
  async getAll(companyId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    const params = { companyId, page: 1, limit: 100 };
    const response = await apiClient.get('/payments', { params });
    let items = (response.data.payments || []).map(mapPayment);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    return paginate(items, page, perPage);
  },

  async getAllForClient(clientId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    const params = { clientId, page: 1, limit: 100 };
    const response = await apiClient.get('/payments', { params });
    let items = (response.data.payments || []).map(mapPayment);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    return paginate(items, page, perPage);
  },

  async getById(companyId, id) {
    const response = await apiClient.get(`/payments/${id}`);
    return mapPayment(response.data.payment);
  },

  async create(companyId, data) {
    const reference = (data.shipmentNumber || '').trim().toUpperCase();

    const shipmentsResponse = await apiClient.get('/shipments', { params: { companyId, page: 1, limit: 100 } });
    const shipment = (shipmentsResponse.data.shipments || []).find(
      (s) => (s.reference || '').toUpperCase() === reference
    );
    if (!shipment) throw new Error(`Expédition ${reference || ''} introuvable`);

    const amount = Number(data.paidAmount) || 0;
    const totalAmount = Number(data.totalAmount) || Number(shipment.totalAmount) || 0;
    const status = amount >= totalAmount && totalAmount > 0 ? 'paid' : 'pending';

    const response = await apiClient.post('/payments', {
      shipmentId: shipment.id,
      amount,
      method: data.paymentMethod || 'cash',
      status,
      comment: data.comment || '',
    });

    return mapPayment(response.data.payment);
  },

  async update(companyId, id, data) {
    if (data.status) {
      const response = await apiClient.patch(`/payments/${id}/status`, { status: data.status });
      return mapPayment(response.data.payment);
    }
    const response = await apiClient.get(`/payments/${id}`);
    return mapPayment(response.data.payment);
  },

  async cancel(companyId, id) {
    const response = await apiClient.patch(`/payments/${id}/status`, { status: 'refunded' });
    return mapPayment(response.data.payment);
  },

  async getHistory(companyId, id) {
    const response = await apiClient.get(`/payments/${id}`);
    const history = Array.isArray(response.data.payment?.history) ? response.data.payment.history : [];
    const typeMap = {
      paid: 'validation',
      pending: 'creation',
      refunded: 'remboursement',
      failed: 'annulation',
    };
    return history.map((entry, idx) => ({
      id: idx,
      type: typeMap[entry.status] || 'modification',
      description: entry.description || `Statut ${entry.status}`,
      amount: response.data.payment?.amount || 0,
      timestamp: entry.date,
    }));
  },

  async getStatistics(companyId) {
    const response = await apiClient.get('/payments', { params: { companyId, page: 1, limit: 100 } });
    const items = (response.data.payments || []).map(mapPayment);
    return {
      total: items.length,
      paid: items.filter((p) => p.status === 'paid').length,
      partial: items.filter((p) => p.status === 'partial').length,
      pending: items.filter((p) => p.status === 'pending').length,
      cancelled: items.filter((p) => p.status === 'cancelled').length,
      refunded: items.filter((p) => p.status === 'refunded').length,
      failed: items.filter((p) => p.status === 'failed').length,
      totalAmount: items.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      totalPaid: items.reduce((sum, p) => sum + (p.paidAmount || 0), 0),
      totalRemaining: items.reduce((sum, p) => sum + (p.remainingAmount || 0), 0),
    };
  },
};

export default paymentsService;
