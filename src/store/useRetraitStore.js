import { create } from 'zustand';
import { agentService } from '../api/agentService';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const useRetraitStore = create((set, get) => ({
  agent: null,
  agency: null,
  company: null,
  stats: null,
  availableParcels: [],
  recentWithdrawals: [],
  activities: [],
  notifications: [],
  alerts: [],
  search: '',
  filters: { status: '', agency: '' },
  pagination: { ...initialPagination },
  loading: { dashboard: false, parcels: false, withdrawals: false, activities: false },
  error: null,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', agency: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchDashboard: async (user) => {
    set((s) => ({ loading: { ...s.loading, dashboard: true }, error: null }));
    try {
      const data = await agentService.getRetraitDashboard(user);
      set({
        agent: data.agent,
        agency: data.agency,
        company: data.company,
        stats: data.stats,
        availableParcels: data.availableParcels,
        recentWithdrawals: data.recentWithdrawals,
        activities: data.activities,
        notifications: data.notifications,
        alerts: data.alerts,
        loading: { ...get().loading, dashboard: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, dashboard: false }, error: err.message });
    }
  },

  fetchAvailableParcels: async (user) => {
    set((s) => ({ loading: { ...s.loading, parcels: true } }));
    try {
      const parcels = await agentService.getRetraitAvailableParcels(user);
      set({ availableParcels: parcels, loading: { ...get().loading, parcels: false } });
    } catch { set((s) => ({ loading: { ...s.loading, parcels: false } })); }
  },

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),

  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true })),
  })),
}));

export default useRetraitStore;
