import { create } from 'zustand';
import { paymentsService } from '../api/paymentsService';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const useClientPaymentStore = create((set, get) => ({
  payments: [],
  selectedPayment: null,
  details: null,
  search: '',
  filters: { status: '', method: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: initialPagination,
  loading: false,
  error: null,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', method: '' }, search: '', pagination: { ...initialPagination } }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),
  setSort: (sort) => set({ sort, pagination: { ...get().pagination, page: 1 } }),

  fetchPayments: async (clientId) => {
    set({ loading: true, error: null });
    try {
      const result = await paymentsService.getAllForClient(clientId, {
        sort: { field: 'createdAt', direction: 'desc' },
        perPage: 200,
      });
      set({ payments: result.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  fetchPayment: async (id) => {
    set({ loading: true, error: null });
    try {
      const payment = await paymentsService.getById(undefined, id);
      set({ selectedPayment: payment, loading: false });
      return payment;
    } catch (err) {
      set({ loading: false, error: err.message });
      return null;
    }
  },

  fetchDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const payment = await paymentsService.getById(undefined, id);
      const details = {
        payment,
        shipment: payment.shipment || null,
        agency: payment.agency || null,
      };
      set({ details, loading: false });
      return details;
    } catch (err) {
      set({ loading: false, error: err.message });
      return null;
    }
  },

  clearSelected: () => set({ selectedPayment: null, details: null, error: null }),
}));

export default useClientPaymentStore;
