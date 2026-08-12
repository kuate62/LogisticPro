import { mockDashboardService } from './mockDashboard';
import { paymentsService } from './paymentsService';
import { packagesService } from './packagesService';

const mapRecentPayment = (p) => ({
  id: p.id,
  reference: p.reference || '',
  client: p.clientName || '—',
  amount: p.amount ?? p.totalAmount ?? 0,
  method: p.paymentMethod || 'cash',
  status: p.status === 'paid' ? 'completed' : p.status,
  date: p.date || p.createdAt,
});

const mapParcelTracking = (p) => {
  const events = p.tracking || [];
  const lastEvent = events[0] || null;
  return {
    id: p.id,
    tracking: p.trackingCode,
    destination: p.destinationCity || '—',
    recipient: p.receiverName || '—',
    status: p.status,
    lastEvent,
    lastDate: lastEvent?.date || p.updatedAt || p.createdAt,
  };
};

export const dashboardService = {
  async getAll(companyId) {
    const mock = await mockDashboardService.getAll(companyId);

    if (!companyId || companyId === 'default') return mock;

    let recentPayments = [];
    let packageTracking = [];
    try {
      const res = await paymentsService.getAll(companyId, { page: 1, perPage: 5 });
      recentPayments = res.data.map(mapRecentPayment);
    } catch { /* repli mock */ }
    try {
      const res = await packagesService.getAll(companyId, { page: 1, perPage: 8 });
      packageTracking = res.data.map(mapParcelTracking);
    } catch { /* repli mock */ }

    return {
      ...mock,
      recentPayments: recentPayments.length ? recentPayments : mock.recentPayments,
      packageAlerts: packageTracking,
    };
  },
};

export default dashboardService;
