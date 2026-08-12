import { create } from 'zustand';
import { packagesService } from '../api/packagesService';
import { shipmentsService } from '../api/shipmentsService';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const useClientParcelStore = create((set, get) => ({
  parcels: [],
  selectedParcel: null,
  viewMode: 'grid',
  search: '',
  filters: { status: '', category: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: initialPagination,
  loading: false,
  error: null,

  setViewMode: (viewMode) => set({ viewMode }),
  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', category: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),
  setSort: (sort) => set({ sort, pagination: { ...get().pagination, page: 1 } }),

  fetchParcels: async (clientId) => {
    set({ loading: true, error: null });
    try {
      const result = await packagesService.getAllForClient(clientId, {
        sort: { field: 'createdAt', direction: 'desc' },
        perPage: 200,
      });
      set({ parcels: result.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  fetchParcelsByShipment: async (shipmentId) => {
    set({ loading: true, error: null });
    try {
      const shipment = await shipmentsService.getById(shipmentId);
      const parcels = shipment.parcels || [];
      set({ parcels, loading: false });
      return parcels;
    } catch (err) {
      set({ loading: false, error: err.message });
      return [];
    }
  },

  fetchParcel: async (id) => {
    set({ loading: true, error: null });
    try {
      const parcel = await packagesService.getById(undefined, id);
      set({ selectedParcel: parcel, loading: false });
      return parcel;
    } catch (err) {
      set({ loading: false, error: err.message });
      return null;
    }
  },

  clearSelected: () => set({ selectedParcel: null, error: null }),
}));

export default useClientParcelStore;
