import apiClient from './axios';

export const mapPartnerRequest = (r) => ({
  id: r.id,
  reference: r.reference,
  companyName: r.companyName,
  companySigle: r.companySigle || '',
  contactName: [r.managerFirstName, r.managerLastName].filter(Boolean).join(' ') || r.managerEmail || '',
  email: r.email,
  phone: r.phone || '',
  city: r.city || '',
  region: r.region || '',
  country: r.country || 'Cameroun',
  siret: r.rccm || r.contribuable || '',
  rccm: r.rccm || '',
  contribuable: r.contribuable || '',
  website: r.website || '',
  address: r.address || '',
  managerFirstName: r.managerFirstName || '',
  managerLastName: r.managerLastName || '',
  managerPhone: r.managerPhone || '',
  managerEmail: r.managerEmail || '',
  managerRole: r.managerRole || '',
  agencyCount: r.agencyCount || '',
  employeeCount: r.employeeCount || '',
  source: r.source || '',
  plan: r.plan || 'free',
  message: r.description || '',
  description: r.description || '',
  status: r.status || 'pending',
  createdAt: r.createdAt,
  reviewedAt: r.reviewedAt,
  reviewedBy: r.reviewedBy,
  rejectionReason: r.rejectionReason,
});

const toApiStatus = (status) => (status === 'EN_ATTENTE_VALIDATION' ? 'pending' : status);

export const partnerRequestsService = {
  async submit(data) {
    const payload = { ...data };
    if (payload.planName) {
      payload.plan = payload.planName;
      delete payload.planName;
    }
    const res = await apiClient.post('/partner-requests', payload);
    const ref = res.data.reference;
    return {
      id: ref,
      reference: ref,
      companyName: payload.companyName,
      contactEmail: payload.email,
      managerName: [payload.managerFirstName, payload.managerLastName].filter(Boolean).join(' '),
      managerEmail: payload.managerEmail,
      plan: payload.plan || 'Starter',
      status: 'EN_ATTENTE_VALIDATION',
      createdAt: new Date().toISOString(),
      data: payload,
    };
  },

  async list(filters = {}) {
    const params = {};
    if (filters.status && filters.status !== 'all') params.status = toApiStatus(filters.status);
    if (filters.search) params.search = filters.search;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;
    const res = await apiClient.get('/partner-requests', { params });
    return {
      requests: (res.data.requests || []).map(mapPartnerRequest),
      total: res.data.total || 0,
      page: res.data.page || 1,
      limit: res.data.limit || 20,
    };
  },

  async review(id, status, reason = '') {
    const res = await apiClient.patch(`/partner-requests/${id}/review`, {
      status,
      rejectionReason: reason || null,
    });
    return mapPartnerRequest(res.data.request);
  },
};

export default partnerRequestsService;
