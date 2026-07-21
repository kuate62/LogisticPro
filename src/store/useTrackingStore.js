import { create } from 'zustand';
import { mockTrackingService } from '../api/mockTracking';
import toast from 'react-hot-toast';

const useTrackingStore = create((set, get) => ({
  trackings: [],
  currentTracking: null,
  loading: false,
  error: null,
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },
  search: '',
  filters: { status: '', dateFrom: '', dateTo: '', origin: '', destination: '' },
  sort: { field: 'createdAt', direction: 'desc' },

  fetchTrackings: async (companyId, options = {}) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const result = await mockTrackingService.getAll(companyId, {
        search: options.search ?? state.search,
        filters: options.filters ?? state.filters,
        sort: options.sort ?? state.sort,
        page: options.page ?? state.pagination.page,
        perPage: options.perPage ?? state.pagination.perPage,
      });
      set({ trackings: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: false });
      return result;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  fetchTrackingByNumber: async (companyId, trackingNumber) => {
    set({ loading: true, error: null });
    try {
      const tracking = await mockTrackingService.getByNumber(companyId, trackingNumber);
      set({ currentTracking: tracking, loading: false });
      return tracking;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  fetchTrackingById: async (companyId, id) => {
    set({ loading: true, error: null });
    try {
      const tracking = await mockTrackingService.getById(companyId, id);
      set({ currentTracking: tracking, loading: false });
      return tracking;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  updateStatus: async (companyId, id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await mockTrackingService.updateStatus(companyId, id, data);
      const trackings = get().trackings.map((t) => (t.id === id ? updated : t));
      set({ trackings, currentTracking: updated, loading: false });
      toast.success('Statut mis à jour');
      return updated;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  setSearch: (search) => set({ search }),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),
  clearCurrent: () => set({ currentTracking: null }),
}));

export default useTrackingStore;
