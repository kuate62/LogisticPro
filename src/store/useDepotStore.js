import { create } from 'zustand';
import { agentService } from '../api/agentService';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const useDepotStore = create((set, get) => ({
  agent: null,
  agency: null,
  company: null,
  stats: null,
  shipments: [],
  parcels: [],
  payments: [],
  activities: [],
  notifications: [],
  search: '',
  filters: { status: '', destination: '' },
  pagination: { ...initialPagination },
  loading: { dashboard: false, shipments: false, parcels: false, activities: false },
  error: null,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', destination: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchDashboard: async (user) => {
    set((s) => ({ loading: { ...s.loading, dashboard: true }, error: null }));
    try {
      const data = await agentService.getDepotDashboard(user);
      set({
        agent: data.agent,
        agency: data.agency,
        company: data.company,
        stats: data.stats,
        shipments: data.shipments,
        parcels: data.parcels,
        payments: data.payments,
        activities: data.activities,
        notifications: data.notifications,
        loading: { ...get().loading, dashboard: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, dashboard: false }, error: err.message });
    }
  },

  fetchShipments: async (user) => {
    set((s) => ({ loading: { ...s.loading, shipments: true } }));
    try {
      const shipments = await agentService.getDepotShipments(user);
      set({ shipments, loading: { ...get().loading, shipments: false } });
    } catch { set((s) => ({ loading: { ...s.loading, shipments: false } })); }
  },

  fetchParcels: async (user) => {
    set((s) => ({ loading: { ...s.loading, parcels: true } }));
    try {
      const parcels = await agentService.getDepotParcels(user);
      set({ parcels, loading: { ...get().loading, parcels: false } });
    } catch { set((s) => ({ loading: { ...s.loading, parcels: false } })); }
  },

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),

  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true })),
  })),
}));

export default useDepotStore;
