import apiClient from './axios';

export function mapRoute(r) {
  if (!r) return null;
  const origin = r.originAgency?.name || '';
  const dest = r.destinationAgency?.name || '';
  return {
    id: r.id,
    companyId: r.companyId,
    name: origin && dest ? `${origin} → ${dest}` : (r.name || ''),
    description: r.description || '',
    originAgencyId: r.originAgencyId || '',
    originAgencyName: origin,
    originCity: r.originAgency?.city || '',
    destinationAgencyId: r.destinationAgencyId || '',
    destinationAgencyName: dest,
    destinationCity: r.destinationAgency?.city || '',
    status: r.status || 'planned',
    departureDate: r.departureDate || '',
    departureTime: '',
    arrivalDate: r.arrivalDate || '',
    arrivalTime: '',
    vehicle: r.vehicle || '',
    driver: r.driver || '',
    note: r.note || '',
    observation: r.note || '',
    distance: 0,
    maxWeight: 100,
    maxPackages: 50,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

function combineDateTime(date, time) {
  if (!date) return null;
  if (time) return `${date}T${time}`;
  return date;
}

export function toRoutePayload(data) {
  const payload = {};
  if (data.originAgencyId) payload.originAgencyId = Number(data.originAgencyId);
  if (data.destinationAgencyId) payload.destinationAgencyId = Number(data.destinationAgencyId);
  if (data.status) payload.status = data.status;
  payload.departureDate = combineDateTime(data.departureDate, data.departureTime) || null;
  payload.arrivalDate = combineDateTime(data.arrivalDate, data.arrivalTime) || null;
  if (data.vehicle) payload.vehicle = data.vehicle;
  if (data.driver) payload.driver = data.driver;
  payload.note = data.observation || data.note || '';
  return payload;
}

function toListResult(response, fallback) {
  const limit = response.data.limit || fallback;
  return {
    data: (response.data.routes || []).map(mapRoute),
    total: response.data.total || 0,
    page: response.data.page || 1,
    perPage: limit,
    totalPages: Math.ceil((response.data.total || 0) / limit),
  };
}

const LIST_LIMIT = 1000;

export const routesService = {
  async getAll(companyId, { search = '', filters = {}, page = 1, perPage = 10 } = {}) {
    const params = { page, limit: perPage };
    if (companyId) params.companyId = companyId;
    if (search) params.search = search;
    if (filters?.status) params.status = filters.status;
    if (filters?.originAgencyId) params.originAgencyId = filters.originAgencyId;
    if (filters?.destinationAgencyId) params.destinationAgencyId = filters.destinationAgencyId;

    const response = await apiClient.get('/routes', { params });

    return toListResult(response, perPage);
  },

  async getById(companyId, routeId) {
    void companyId;
    const response = await apiClient.get(`/routes/${routeId}`);
    return mapRoute(response.data.route);
  },

  async create(companyId, data) {
    const response = await apiClient.post('/routes', { ...toRoutePayload(data), companyId });
    return mapRoute(response.data.route);
  },

  async update(companyId, routeId, data) {
    void companyId;
    const response = await apiClient.patch(`/routes/${routeId}`, toRoutePayload(data));
    return mapRoute(response.data.route);
  },

  async cancel(companyId, routeId) {
    void companyId;
    const response = await apiClient.patch(`/routes/${routeId}`, { status: 'cancelled' });
    return mapRoute(response.data.route);
  },

  async getHistory() {
    return [];
  },

  async getStatistics(companyId) {
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    const byStatus = {};
    result.data.forEach((r) => { byStatus[r.status] = (byStatus[r.status] || 0) + 1; });
    return {
      total: result.data.length,
      byStatus,
      active: byStatus.planned || 0,
      completed: byStatus.completed || 0,
    };
  },

  async assignShipment(companyId, routeId) {
    return this.getById(companyId, routeId);
  },

  async removeShipment(companyId, routeId) {
    return this.getById(companyId, routeId);
  },
};

export default routesService;
