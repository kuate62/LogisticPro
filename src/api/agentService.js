import apiClient from './axios';
import { mapShipment } from './shipmentsService';
import { mapParcel } from './packagesService';
import { mapPayment } from './paymentsService';
import { employeesService } from './employeesService';
import { agenciesService } from './agenciesService';
import { mockDepotService } from './mockDepot';
import { mockRetraitService } from './mockRetrait';

const SHIPMENT_LIMIT = 200;
const PARCEL_LIMIT = 200;
const PAYMENT_LIMIT = 100;

const isSameDay = (value, ref = new Date()) => {
  if (!value) return false;
  return new Date(value).toDateString() === new Date(ref).toDateString();
};

function mapCompany(c) {
  if (!c) return null;
  return {
    id: c.id,
    name: c.name,
    city: c.city || '',
    phone: c.phone || '',
    email: c.email || '',
    status: c.status || 'active',
  };
}

function mapAgent(employee, user) {
  if (employee) {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email || user?.email || '',
      phone: employee.phone || '',
      role: employee.role || user?.employeeRole || '',
      counterId: employee.employeeCode || '',
      avatar: employee.avatar || null,
      status: employee.status || 'active',
      createdAt: employee.createdAt,
    };
  }
  return {
    id: user?.id || null,
    firstName: user?.firstName || user?.firstname || 'Agent',
    lastName: user?.lastName || user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.employeeRole || '',
    counterId: '',
    avatar: null,
    status: 'active',
    createdAt: null,
  };
}

async function resolveContext(user) {
  const companyId = user?.companyId || null;
  const agencyId = user?.agencyId || null;

  let employee = null;
  if (user?.employeeId) {
    try {
      employee = await employeesService.getById(companyId, user.employeeId);
    } catch {
      employee = null;
    }
  }

  const company = companyId
    ? await apiClient.get(`/companies/${companyId}`)
        .then((r) => mapCompany(r.data.company))
        .catch(() => null)
    : null;

  const agency = agencyId
    ? await agenciesService.getById(companyId, agencyId).catch(() => null)
    : null;

  return { companyId, agencyId, employee, company, agency };
}

async function fetchDepotData(user) {
  const ctx = await resolveContext(user);
  const { companyId, agencyId } = ctx;

  const [shipmentsResp, parcelsResp, paymentsResp] = await Promise.all([
    apiClient.get('/shipments', { params: { companyId, agencyId, page: 1, limit: SHIPMENT_LIMIT } }),
    apiClient.get('/parcels', { params: { companyId, agencyId, page: 1, limit: PARCEL_LIMIT } }),
    apiClient.get('/payments', { params: { companyId, agencyId, page: 1, limit: PAYMENT_LIMIT } }),
  ]);

  const shipments = (shipmentsResp.data.shipments || []).map(mapShipment);
  const parcels = (parcelsResp.data.parcels || []).map(mapParcel);
  const payments = (paymentsResp.data.payments || []).map(mapPayment);

  const todayShipments = shipments.filter((s) => isSameDay(s.createdAt));
  const todayParcels = parcels.filter((p) => isSameDay(p.createdAt));
  const todayPayments = payments.filter((p) => isSameDay(p.createdAt));

  const amountCollected = todayPayments.reduce(
    (sum, p) => sum + (p.status === 'paid' || p.status === 'completed' ? p.amount || 0 : 0),
    0
  );
  const clientsReceived = new Set(todayShipments.map((s) => s.clientId)).size;

  const stats = {
    shipmentsToday: todayShipments.length,
    parcelsToday: todayParcels.length,
    amountCollected,
    clientsReceived,
    pendingShipments: shipments.filter((s) => s.status === 'validated' || s.status === 'preparing').length,
  };

  const activities = [
    ...todayShipments.slice(0, 8).map((s) => ({
      id: `ship_${s.id}`,
      type: 'shipment',
      title: `Expédition ${s.reference} créée`,
      description: `${s.senderName} → ${s.destinationCity}`,
      clientName: s.senderName,
      reference: s.reference,
      status: 'completed',
      time: s.createdAt,
    })),
    ...todayPayments.slice(0, 6).map((p) => ({
      id: `pay_${p.id}`,
      type: 'payment',
      title: `Paiement de ${(p.amount || 0).toLocaleString('fr-FR')} FC reçu`,
      description: `Pour ${p.shipmentNumber || p.reference}`,
      clientName: p.clientName,
      reference: p.reference,
      status: p.status === 'paid' || p.status === 'completed' ? 'completed' : 'pending',
      time: p.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 12);

  return {
    agent: mapAgent(ctx.employee, user),
    agency: ctx.agency,
    company: ctx.company,
    stats,
    shipments: shipments.slice(0, 15),
    parcels: parcels.slice(0, 12),
    payments: todayPayments,
    activities,
    notifications: [],
    alerts: [],
  };
}

function buildWithdrawalActivities(parcels) {
  return parcels
    .filter((p) => p.collectedAt)
    .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt))
    .slice(0, 10)
    .map((p) => ({
      id: `withdrawal_${p.id}`,
      type: 'parcel',
      title: `Colis ${p.trackingNumber} remis`,
      description: `${p.receiverName || 'Destinataire'} — ${p.category}`,
      clientName: p.receiverName || '',
      reference: p.trackingNumber,
      status: 'completed',
      time: p.collectedAt,
    }));
}

function buildRetraitAlerts(available, anomalies) {
  const alerts = [];
  if (available.length >= 3) {
    alerts.push({
      id: 'late_parcels',
      type: 'late',
      severity: 'warning',
      title: 'Colis en attente',
      message: `${available.length} colis en attente de retrait`,
      parcelCount: available.length,
      time: new Date(),
    });
  }
  if (anomalies.length > 0) {
    alerts.push({
      id: 'damaged_parcels',
      type: 'damaged',
      severity: 'danger',
      title: 'Colis en anomalie',
      message: `${anomalies.length} colis endommagés ou annulés`,
      parcelCount: anomalies.length,
      time: new Date(),
    });
  }
  return alerts;
}

async function fetchRetraitData(user) {
  const ctx = await resolveContext(user);
  const { companyId, agencyId } = ctx;

  const parcelsResp = await apiClient.get('/parcels', {
    params: { companyId, destinationAgencyId: agencyId, page: 1, limit: PARCEL_LIMIT },
  });

  const parcels = (parcelsResp.data.parcels || []).map(mapParcel);

  const available = parcels.filter((p) => p.status === 'available_pickup' || p.status === 'arrived');
  const collected = parcels.filter((p) => p.status === 'collected' && p.collectedAt);
  const collectedToday = collected.filter((p) => isSameDay(p.collectedAt));
  const anomalies = parcels.filter((p) => p.status === 'damaged' || p.status === 'cancelled');

  const stats = {
    availableParcels: available.length,
    collectedToday: collectedToday.length,
    clientsServed: new Set(collectedToday.map((p) => p.shipmentId)).size,
    pendingPickup: parcels.filter((p) => p.status === 'arrived' || p.status === 'available_pickup').length,
    anomalyParcels: anomalies.length,
  };

  const recentWithdrawals = collected
    .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt))
    .slice(0, 10)
    .map((p) => ({
      ...p,
      recipientName: p.receiverName || 'Inconnu',
      collectedBy: p.receiverName || 'Inconnu',
    }));

  return {
    agent: mapAgent(ctx.employee, user),
    agency: ctx.agency,
    company: ctx.company,
    stats,
    availableParcels: available.slice(0, 20),
    recentWithdrawals,
    activities: buildWithdrawalActivities(parcels),
    notifications: [],
    alerts: buildRetraitAlerts(available, anomalies),
  };
}

export const agentService = {
  async getDepotDashboard(user) {
    try {
      if (!user?.id) throw new Error('Utilisateur non connecté');
      return await fetchDepotData(user);
    } catch {
      return mockDepotService.getDashboardData(user?.id || 'agt_001');
    }
  },

  async getRetraitDashboard(user) {
    try {
      if (!user?.id) throw new Error('Utilisateur non connecté');
      return await fetchRetraitData(user);
    } catch {
      return mockRetraitService.getDashboardData(user?.id || 'agt_002');
    }
  },

  async getDepotShipments(user) {
    const data = await this.getDepotDashboard(user);
    return data.shipments || [];
  },

  async getDepotParcels(user) {
    const data = await this.getDepotDashboard(user);
    return data.parcels || [];
  },

  async getRetraitAvailableParcels(user) {
    const data = await this.getRetraitDashboard(user);
    return data.availableParcels || [];
  },
};

export default agentService;
