import { create } from 'zustand';
import { clientsService } from '../api/clientsService';
import { shipmentsService } from '../api/shipmentsService';
import { packagesService } from '../api/packagesService';
import { paymentsService } from '../api/paymentsService';
import { mockClientDashboardService } from '../api/mockClientDashboard';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const normalizeAgency = (a) => {
  if (!a) return a;
  let hours = a.hours;
  if (hours && typeof hours === 'object' && !Array.isArray(hours)) {
    hours = [hours.open, hours.close].filter(Boolean);
  }
  return { ...a, hours };
};

const useClientStore = create((set, get) => ({
  client: null,
  company: null,
  preferredAgency: null,
  stats: null,
  shipments: [],
  parcels: [],
  payments: [],
  notifications: [],
  activities: [],
  frequentDestinations: [],
  frequentAgencies: [],
  timeline: [],
  search: '',
  filters: { status: '', destination: '' },
  pagination: initialPagination,
  sort: { field: 'createdAt', direction: 'desc' },
  loading: { dashboard: false, shipments: false, parcels: false, payments: false },
  error: null,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', destination: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),
  setSort: (sort) => set({ sort }),

  fetchDashboard: async (clientId) => {
    set((s) => ({ loading: { ...s.loading, dashboard: true }, error: null }));
    try {
      const [client, mock] = await Promise.all([
        clientsService.getMe(),
        mockClientDashboardService.getDashboardData(clientId),
      ]);

      const [shipResult, parcelResult, payResult] = await Promise.all([
        shipmentsService.list({ clientId, perPage: 100 }),
        packagesService.getAllForClient(clientId, { perPage: 200 }),
        paymentsService.getAllForClient(clientId, { perPage: 200 }),
      ]);

      const shipments = shipResult.shipments || [];
      const parcels = parcelResult.data || [];
      const payments = payResult.data || [];

      const profile = client ? { ...client, memberSince: client.createdAt } : null;

      const stats = {
        totalShipments: shipments.length,
        totalParcels: parcels.length,
        inTransitParcels: parcels.filter((p) => p.status === 'in_transit').length,
        availableParcels: parcels.filter((p) => p.status === 'available_pickup').length,
        deliveredParcels: parcels.filter((p) => p.status === 'collected').length,
        totalSpent: payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0),
        pendingPayments: payments.filter((p) => p.status === 'pending').length,
        unreadNotifications: (mock.notifications || []).filter((n) => !n.read).length,
      };

      set({
        client: profile,
        company: client?.company || null,
        preferredAgency: normalizeAgency(client?.preferredAgency),
        stats,
        shipments,
        parcels,
        payments,
        notifications: mock.notifications || [],
        activities: mock.activities || [],
        frequentDestinations: mock.frequentDestinations || [],
        frequentAgencies: mock.frequentAgencies || [],
        timeline: mock.timeline || [],
        loading: { ...get().loading, dashboard: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, dashboard: false }, error: err.message });
    }
  },

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),
  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true })),
  })),
}));

export default useClientStore;
