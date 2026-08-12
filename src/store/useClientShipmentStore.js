import { create } from 'zustand';
import { shipmentsService } from '../api/shipmentsService';

const initialPagination = { page: 1, perPage: 8, total: 0, totalPages: 0 };

const useClientShipmentStore = create((set, get) => ({
  shipments: [],
  selectedShipment: null,
  search: '',
  filters: { status: '', destination: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: initialPagination,
  loading: false,
  error: null,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', destination: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),
  setSort: (sort) => set({ sort, pagination: { ...get().pagination, page: 1 } }),

  fetchShipments: async (clientId) => {
    set({ loading: true, error: null });
    try {
      const result = await shipmentsService.list({ clientId });
      set({
        shipments: result.shipments,
        pagination: {
          ...get().pagination,
          total: result.total,
          totalPages: Math.ceil(result.total / get().pagination.perPage),
        },
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
    }
  },

  fetchShipment: async (id) => {
    set({ loading: true, error: null });
    try {
      const shipment = await shipmentsService.getById(id);
      set({ selectedShipment: shipment, loading: false });
      return shipment;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      return null;
    }
  },

  clearSelected: () => set({ selectedShipment: null, error: null }),
}));

export default useClientShipmentStore;
