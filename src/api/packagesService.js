import apiClient from './axios';

export const PACKAGE_METHOD_LABELS = {
  cash: 'Espèces',
  mobile_money: 'Mobile Money',
  bank_transfer: 'Virement bancaire',
  card: 'Carte bancaire',
};

const clientFullName = (client) => [client?.firstName, client?.lastName].filter(Boolean).join(' ');

export const mapParcel = (parcel) => {
  const shipment = parcel.shipment || {};
  const totalWeight = shipment.totalWeight ?? (parcel.weight || 0);
  const ratio = totalWeight > 0 ? (parcel.weight || 0) / totalWeight : 0;
  const amount = Math.round((shipment.totalAmount || 0) * ratio);
  const clientName = clientFullName(shipment.client);

  return {
    ...parcel,
    trackingCode: parcel.trackingNumber,
    label: parcel.description || parcel.category || 'Colis',
    length: parcel.dimensions?.length || 0,
    width: parcel.dimensions?.width || 0,
    height: parcel.dimensions?.height || 0,
    fragile: false,
    insured: false,
    insuranceAmount: 0,
    transportAmount: amount,
    totalAmount: amount,
    senderName: clientName || shipment.sender?.name || '',
    senderPhone: clientName ? shipment.client?.phone : (shipment.sender?.phone || ''),
    receiverName: shipment.recipient?.name || '',
    receiverPhone: shipment.recipient?.phone || '',
    originAgencyName: shipment.originAgency?.name || '',
    destinationAgencyName: shipment.destinationAgency?.name || '',
    originCity: shipment.originAgency?.city || shipment.origin || '',
    destinationCity: shipment.destinationAgency?.city || shipment.destination || '',
    observation: shipment.note || '',
    shipmentNumber: shipment.reference || '',
    expediteur: { name: shipment.sender?.name || '', phone: shipment.sender?.phone || '' },
    destinataire: { name: shipment.recipient?.name || '', phone: shipment.recipient?.phone || '' },
  };
};

const searchFilter = (items, search) => {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((p) =>
    (p.trackingCode || '').toLowerCase().includes(q) ||
    (p.shipmentNumber || '').toLowerCase().includes(q) ||
    (p.senderName || '').toLowerCase().includes(q) ||
    (p.receiverName || '').toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q)
  );
};

const applyFilters = (items, filters = {}) => items.filter((p) => {
  if (filters.status && p.status !== filters.status) return false;
  if (filters.category && p.category !== filters.category) return false;
  if (filters.fragile !== '' && filters.fragile !== undefined && p.fragile !== (filters.fragile === 'true')) return false;
  if (filters.insured !== '' && filters.insured !== undefined && p.insured !== (filters.insured === 'true')) return false;
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

export const packagesService = {
  async getAll(companyId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    const params = { companyId, page: 1, limit: 200 };
    const response = await apiClient.get('/parcels', { params });
    let items = (response.data.parcels || []).map(mapParcel);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    return paginate(items, page, perPage);
  },

  async getAllForClient(clientId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    const params = { clientId, page: 1, limit: 200 };
    const response = await apiClient.get('/parcels', { params });
    let items = (response.data.parcels || []).map(mapParcel);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    return paginate(items, page, perPage);
  },

  async getById(companyId, id) {
    const response = await apiClient.get(`/parcels/${id}`);
    return mapParcel(response.data.parcel);
  },

  async getHistory(companyId, id) {
    const response = await apiClient.get(`/parcels/${id}/history`);
    const typeMap = {
      registered: 'creation',
      preparing: 'validation',
      in_transit: 'transport',
      arrived: 'arrival',
      available_pickup: 'arrival',
      collected: 'livraison',
      cancelled: 'annulation',
      damaged: 'modification',
    };
    return (response.data.events || []).map((e) => ({
      id: e.id,
      type: typeMap[e.status] || 'modification',
      description: e.description || `Statut ${e.status}`,
      timestamp: e.date,
      location: e.location || '',
    }));
  },

  async getClientHistory(id) {
    const response = await apiClient.get(`/parcels/${id}/history`);
    return (response.data.events || []).map((e) => ({
      id: e.id,
      status: e.status,
      description: e.description || `Statut ${e.status}`,
      location: e.location || '',
      date: e.date,
      agentName: e.agentName || '',
    }));
  },

  async getPayments(companyId, id) {
    const response = await apiClient.get(`/parcels/${id}/payments`);
    return response.data.payments || [];
  },

  async getInvoices() {
    return [];
  },

  async getStatistics(companyId) {
    const response = await apiClient.get('/parcels', { params: { companyId, page: 1, limit: 200 } });
    const items = (response.data.parcels || []).map(mapParcel);
    const totalWeight = items.reduce((sum, p) => sum + (p.weight || 0), 0);
    const totalValue = items.reduce((sum, p) => sum + (p.declaredValue || 0), 0);
    const countBy = (status) => items.filter((p) => p.status === status).length;
    return {
      total: items.length,
      draft: 0,
      pending: countBy('pending'),
      registered: countBy('registered'),
      ready: countBy('ready'),
      preparing: countBy('preparing'),
      in_transit: countBy('in_transit'),
      arrived: countBy('arrived'),
      available_pickup: countBy('available_pickup'),
      collected: countBy('collected'),
      cancelled: countBy('cancelled'),
      damaged: countBy('damaged'),
      totalWeight,
      avgWeight: items.length ? Math.round(totalWeight / items.length) : 0,
      totalValue,
    };
  },

  async create() {
    throw new Error('Création de colis autonome non disponible — créez une expédition');
  },

  async updateStatus(companyId, id, newStatus) {
    const response = await apiClient.patch(`/parcels/${id}/status`, { status: newStatus });
    return mapParcel(response.data.parcel);
  },

  async cancel(companyId, id) {
    const response = await apiClient.patch(`/parcels/${id}/status`, { status: 'cancelled' });
    return mapParcel(response.data.parcel);
  },
};

export default packagesService;
