import apiClient from './axios';

export const PLAN_LABELS = {
  free: 'Gratuit',
  starter: 'Démarrage',
  pro: 'Professionnel',
  enterprise: 'Entreprise',
};

export function mapPlan(p) {
  if (!p) return null;
  return {
    id: p.code || p.id,
    code: p.code || p.id,
    dbId: p.id,
    name: p.name,
    description: p.description || '',
    price: p.price || 0,
    currency: p.currency || 'FCFA',
    billingCycle: p.billingCycle || 'monthly',
    maxAgencies: p.maxAgencies ?? -1,
    maxUsers: p.maxUsers ?? -1,
    maxStorage: p.maxStorage ?? 0,
    maxShipments: p.maxShipments ?? -1,
    features: Array.isArray(p.features) ? p.features : [],
    status: p.status || 'active',
    isActive: (p.status || 'active') === 'active',
  };
}

export function mapSubscription(s) {
  if (!s) return null;
  const planDetail = mapPlan(s.planDetail || null);
  return {
    id: s.id,
    companyId: s.companyId,
    plan: s.plan || 'free',
    planLabel: planDetail?.name || PLAN_LABELS[s.plan] || s.plan,
    planDetail,
    startDate: s.startDate || '',
    endDate: s.endDate || null,
    nextBillingDate: s.endDate || s.startDate || null,
    status: s.status || 'active',
    autoRenew: s.autoRenew ?? true,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}

export function mapSubscriptionPayment(p) {
  if (!p) return null;
  return {
    id: p.id,
    subscriptionId: p.subscriptionId,
    companyId: p.companyId,
    reference: p.reference,
    receiptNumber: p.receiptNumber,
    amount: p.amount || 0,
    currency: p.currency || 'FCFA',
    paymentMethod: p.paymentMethod || '—',
    status: p.status || 'pending',
    periodStart: p.periodStart || null,
    periodEnd: p.periodEnd || null,
    paidAt: p.paidAt || p.createdAt,
    createdAt: p.createdAt,
    invoices: Array.isArray(p.invoices) ? p.invoices : [],
  };
}

export function mapInvoice(i) {
  if (!i) return null;
  return {
    id: i.id,
    subscriptionId: i.subscriptionId,
    invoiceNumber: i.invoiceNumber,
    amount: i.amount || 0,
    taxRate: i.taxRate ?? 0.18,
    taxAmount: i.taxAmount || 0,
    totalAmount: i.totalAmount || 0,
    status: i.status || 'pending',
    dueDate: i.dueDate || null,
    paidAt: i.paidAt || null,
    createdAt: i.createdAt,
  };
}

export function toSubscriptionPayload(data) {
  const payload = {};
  if (data.plan) payload.plan = data.plan;
  if (data.startDate) payload.startDate = data.startDate;
  if (data.endDate !== undefined) payload.endDate = data.endDate || null;
  if (data.status) payload.status = data.status;
  if (data.autoRenew !== undefined) payload.autoRenew = data.autoRenew;
  return payload;
}

const paginate = (data, page, perPage) => ({
  data,
  total: data.total || 0,
  page: data.page || page,
  perPage: data.limit || perPage,
  totalPages: Math.ceil((data.total || 0) / (data.limit || perPage)),
});

export const subscriptionsService = {
  async getPlans(filters = {}) {
    const params = { limit: 100 };
    if (filters.status) params.status = filters.status;
    if (filters.search) params.search = filters.search;
    const response = await apiClient.get('/plans', { params });
    return (response.data.plans || []).map(mapPlan);
  },

  async list(companyId, { page = 1, perPage = 100 } = {}) {
    const params = { page, limit: perPage };
    if (companyId) params.companyId = companyId;

    const response = await apiClient.get('/subscriptions', { params });

    return {
      data: (response.data.subscriptions || []).map(mapSubscription),
      total: response.data.total || 0,
      page: response.data.page || page,
      perPage: response.data.limit || perPage,
      totalPages: Math.ceil((response.data.total || 0) / (response.data.limit || perPage)),
    };
  },

  async getByCompany(companyId) {
    const result = await this.list(companyId, { perPage: 1 });
    return result.data[0] || null;
  },

  async getById(id) {
    const response = await apiClient.get(`/subscriptions/${id}`);
    return mapSubscription(response.data.subscription);
  },

  async getUsage(subscriptionId) {
    const response = await apiClient.get(`/subscriptions/${subscriptionId}/usage`);
    return {
      subscription: mapSubscription(response.data.subscription),
      quotas: response.data.quotas || null,
    };
  },

  async getPayments(subscriptionId, { page = 1, perPage = 10 } = {}) {
    const response = await apiClient.get(`/subscriptions/${subscriptionId}/payments`, {
      params: { page, limit: perPage },
    });
    const result = paginate(response.data, page, perPage);
    return { ...result, data: (response.data.payments || []).map(mapSubscriptionPayment) };
  },

  async getInvoices(subscriptionId, { page = 1, perPage = 10 } = {}) {
    const response = await apiClient.get(`/subscriptions/${subscriptionId}/invoices`, {
      params: { page, limit: perPage },
    });
    const result = paginate(response.data, page, perPage);
    return { ...result, data: (response.data.invoices || []).map(mapInvoice) };
  },

  async create(companyId, data) {
    const response = await apiClient.post('/subscriptions', { ...toSubscriptionPayload(data), companyId });
    return mapSubscription(response.data.subscription);
  },

  async update(id, data) {
    const response = await apiClient.patch(`/subscriptions/${id}`, toSubscriptionPayload(data));
    return mapSubscription(response.data.subscription);
  },

  async remove(id) {
    const response = await apiClient.delete(`/subscriptions/${id}`);
    return response.data;
  },
};

export default subscriptionsService;
