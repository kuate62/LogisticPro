import apiClient from './axios';

function buildSchedule(hours) {
  let open = null;
  let close = null;
  if (Array.isArray(hours) && hours.length === 2) {
    open = hours[0] || null;
    close = hours[1] || null;
  } else if (hours && typeof hours === 'object' && !Array.isArray(hours)) {
    open = hours.open || null;
    close = hours.close || null;
  }
  const day = { open, close, closed: !open && !close };
  return {
    monday: { ...day },
    tuesday: { ...day },
    wednesday: { ...day },
    thursday: { ...day },
    friday: { ...day },
    saturday: { ...day },
    sunday: { open: null, close: null, closed: true },
  };
}

export function mapAgency(a) {
  if (!a) return null;
  return {
    id: a.id,
    companyId: a.companyId,
    name: a.name,
    code: a.code || `AGC-${String(a.id).padStart(3, '0')}`,
    phone: a.phone || '',
    email: a.email || '',
    address: a.address || '',
    city: a.city,
    region: a.region || '',
    country: a.country || 'Cameroun',
    description: a.description || '',
    logo: a.logo || null,
    latitude: a.latitude ?? null,
    longitude: a.longitude ?? null,
    isPrimary: !!a.isPrimary,
    status: a.status,
    manager: { name: a.manager || '', email: '', phone: '' },
    schedule: buildSchedule(a.hours),
    employeesCount: a.employees?.length || 0,
    shipmentsCount: 0,
    packagesCount: 0,
    revenue: 0,
    punctuality: 0,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}

export function toAgencyPayload(data) {
  const payload = {};
  if (data.name) payload.name = data.name;
  if (data.city) payload.city = data.city;
  if (data.address !== undefined) payload.address = data.address;
  if (data.phone) payload.phone = data.phone;
  if (data.email) payload.email = data.email;
  if (data.manager?.name) payload.manager = data.manager.name;
  if (data.region) payload.region = data.region;
  if (data.isPrimary !== undefined) payload.isPrimary = !!data.isPrimary;
  if (data.status) payload.status = data.status;
  if (data.schedule?.monday?.open) {
    payload.hours = { open: data.schedule.monday.open, close: data.schedule.monday.close };
  } else {
    payload.hours = null;
  }
  return payload;
}

const LIST_LIMIT = 1000;

function toListResult(response, fallback) {
  const limit = response.data.limit || fallback;
  return {
    data: (response.data.agencies || []).map(mapAgency),
    total: response.data.total || 0,
    page: response.data.page || 1,
    perPage: limit,
    totalPages: Math.ceil((response.data.total || 0) / limit),
  };
}

export const agenciesService = {
  async list(companyId, { search = '', filters = {}, page = 1, limit = 100 } = {}) {
    const params = { page, limit };
    if (companyId) params.companyId = companyId;
    if (search) params.search = search;
    if (filters?.status) params.status = filters.status;
    if (filters?.city) params.city = filters.city;

    const response = await apiClient.get('/agencies', { params });

    return toListResult(response, limit);
  },

  async getAll(companyId, { search = '', filters = {}, page = 1, perPage = 10 } = {}) {
    return this.list(companyId, { search, filters, page, limit: perPage });
  },

  async getById(companyId, id) {
    void companyId;
    const response = await apiClient.get(`/agencies/${id}`);
    return mapAgency(response.data.agency);
  },

  async create(companyId, data) {
    const response = await apiClient.post('/agencies', { ...toAgencyPayload(data), companyId });
    return mapAgency(response.data.agency);
  },

  async update(companyId, agencyId, data) {
    void companyId;
    const response = await apiClient.patch(`/agencies/${agencyId}`, toAgencyPayload(data));
    return mapAgency(response.data.agency);
  },

  async toggleStatus(companyId, agencyId) {
    void companyId;
    const detail = await apiClient.get(`/agencies/${agencyId}`);
    const current = detail.data.agency?.status;
    const next = current === 'active' ? 'inactive' : 'active';
    const response = await apiClient.patch(`/agencies/${agencyId}`, { status: next });
    return mapAgency(response.data.agency);
  },

  async getAllCities(companyId) {
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    return [...new Set(result.data.map((a) => a.city).filter(Boolean))].sort();
  },

  async getAllRegions(companyId) {
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    return [...new Set(result.data.map((a) => a.region).filter(Boolean))].sort();
  },

  async getCount(companyId) {
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    return {
      total: result.data.length,
      active: result.data.filter((a) => a.status === 'active').length,
      inactive: result.data.filter((a) => a.status === 'inactive').length,
      suspended: 0,
      maintenance: 0,
    };
  },

  async getStatistics(companyId, agencyId) {
    void companyId;
    let employees = 0;
    let name = '';
    try {
      const detail = await this.getById(companyId, agencyId);
      employees = detail.employeesCount || 0;
      name = detail.name || '';
    } catch {
      // keep defaults
    }
    return {
      id: agencyId,
      name,
      packages: { total: 0, delivered: 0, inTransit: 0, pending: 0 },
      revenue: { total: 0, thisMonth: 0, lastMonth: 0 },
      shipments: { total: 0, completed: 0, inProgress: 0, planned: 0 },
      punctuality: 0,
      employees,
      monthlyEvolution: [],
    };
  },

  async getEmployees(companyId, agencyId) {
    void companyId;
    const detail = await apiClient.get(`/agencies/${agencyId}`);
    return (detail.data.agency?.employees || []).map((e) => ({
      id: e.id,
      firstName: e.firstName || '',
      lastName: e.lastName || '',
      name: `${e.firstName || ''} ${e.lastName || ''}`.trim(),
      role: e.role || '',
      phone: e.phone || '',
      status: e.status,
    }));
  },

  async getShipments() {
    return [];
  },

  async getHistory() {
    return [];
  },

  async getDocuments() {
    return [];
  },
};

export default agenciesService;
