import apiClient from './axios';

const clientFullName = (client) => [client?.firstName, client?.lastName].filter(Boolean).join(' ');

const mapEvent = (event) => ({
  id: event.id,
  status: event.status,
  description: event.description || `Statut ${event.status}`,
  location: event.location || '',
  timestamp: event.date,
  agentName: event.agentName || '',
});

export const mapTracking = (parcel) => {
  const shipment = parcel.shipment || {};
  const events = (parcel.tracking || []).map(mapEvent);
  const latest = events[0] || {};

  return {
    id: parcel.id,
    trackingNumber: parcel.trackingNumber,
    shipmentId: parcel.shipmentId,
    shipmentNumber: shipment.reference || '',
    clientName: clientFullName(shipment.client) || shipment.sender?.name || '',
    recipientName: shipment.recipient?.name || '',
    recipientPhone: shipment.recipient?.phone || '',
    originCity: shipment.originAgency?.city || shipment.origin || '',
    destinationCity: shipment.destinationAgency?.city || shipment.destination || '',
    currentAgency: latest.location || shipment.destinationAgency?.name || '',
    currentCity: latest.location || shipment.destinationAgency?.city || '',
    currentStatus: parcel.status,
    currentLocation: latest.location || parcel.destination || '',
    weight: parcel.weight,
    numberOfPackages: 1,
    observation: shipment.note || '',
    events,
    createdAt: parcel.createdAt,
    updatedAt: parcel.updatedAt,
  };
};

const PORTAL_EVENT_TYPE_MAP = {
  registered: 'creation',
  validated: 'creation',
  preparing: 'enregistrement',
  assigned: 'affectation',
  in_transit: 'transport',
  arrived: 'arrivee',
  available_pickup: 'disponible',
  delivered: 'retrait',
  collected: 'retrait',
  cancelled: 'annulation',
};

export const mapPortalTracking = (parcel) => {
  const events = (parcel.tracking || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = events[0] || {};

  return {
    id: parcel.id,
    trackingNumber: parcel.trackingNumber,
    shipmentNumber: '',
    senderName: '',
    receiverName: '',
    originCity: parcel.origin || '',
    destinationCity: parcel.destination || '',
    currentCity: latest.location || '',
    currentAgency: latest.location || '',
    status: parcel.status,
    packageCount: 1,
    totalWeight: parcel.weight || 0,
    createdAt: parcel.createdAt,
    updatedAt: parcel.updatedAt,
    estimatedDelivery: null,
    observation: parcel.description || '',
    timeline: events.map((e) => ({
      id: e.id,
      type: PORTAL_EVENT_TYPE_MAP[e.status] || 'transport',
      label: e.description || `Statut ${e.status}`,
      city: '',
      agency: e.location || '',
      timestamp: e.date,
    })),
  };
};

const searchFilter = (items, search) => {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((t) =>
    (t.trackingNumber || '').toLowerCase().includes(q) ||
    (t.shipmentNumber || '').toLowerCase().includes(q) ||
    (t.clientName || '').toLowerCase().includes(q) ||
    (t.recipientName || '').toLowerCase().includes(q) ||
    (t.recipientPhone || '').includes(q)
  );
};

const applyFilters = (items, filters = {}) => items.filter((t) => {
  if (filters.status && t.currentStatus !== filters.status) return false;
  if (filters.dateFrom && new Date(t.createdAt) < new Date(filters.dateFrom)) return false;
  if (filters.dateTo && new Date(t.createdAt) > new Date(`${filters.dateTo}T23:59:59`)) return false;
  if (filters.origin && t.originCity !== filters.origin) return false;
  if (filters.destination && t.destinationCity !== filters.destination) return false;
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

export const trackingService = {
  async getAll(companyId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    const params = { companyId, page: 1, limit: 200 };
    const response = await apiClient.get('/parcels', { params });
    let items = (response.data.parcels || []).map(mapTracking);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    return paginate(items, page, perPage);
  },

  async getById(companyId, id) {
    const response = await apiClient.get(`/parcels/${id}`);
    return mapTracking(response.data.parcel);
  },

  async getByNumber(companyId, trackingNumber) {
    const number = (trackingNumber || '').trim().toUpperCase();
    const response = await apiClient.get('/parcels', {
      params: { companyId, search: number, page: 1, limit: 20 },
    });
    const match = (response.data.parcels || []).find(
      (p) => (p.trackingNumber || '').toUpperCase() === number
    );
    if (match) return mapTracking(match);

    const publicResponse = await apiClient.get('/parcels/tracking', { params: { trackingNumber: number } });
    return mapTracking(publicResponse.data.parcel);
  },

  async updateStatus(companyId, id, data) {
    const payload = { status: data.status };
    if (data.location) payload.location = data.location;
    if (data.description) payload.description = data.description;
    if (data.agentName) payload.agentName = data.agentName;
    const response = await apiClient.patch(`/parcels/${id}/status`, payload);
    return mapTracking(response.data.parcel);
  },

  async trackPublic(trackingNumber) {
    const number = (trackingNumber || '').trim().toUpperCase();
    if (!number) throw new Error('Veuillez saisir un numéro de suivi');
    const response = await apiClient.get('/parcels/tracking', { params: { trackingNumber: number } });
    return mapPortalTracking(response.data.parcel);
  },
};

export default trackingService;
