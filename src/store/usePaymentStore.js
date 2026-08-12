import { create } from 'zustand';
import { paymentsService } from '../api/paymentsService';
import toast from 'react-hot-toast';

const usePaymentStore = create((set, get) => ({
  payments: [],
  currentPayment: null,
  paymentHistory: [],
  statistics: null,
  loading: false,
  error: null,
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },
  search: '',
  filters: { status: '', paymentMethod: '', dateFrom: '', dateTo: '' },
  sort: { field: 'createdAt', direction: 'desc' },

  fetchPayments: async (companyId, options = {}) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const result = await paymentsService.getAll(companyId, {
        search: options.search ?? state.search,
        filters: options.filters ?? state.filters,
        sort: options.sort ?? state.sort,
        page: options.page ?? state.pagination.page,
        perPage: options.perPage ?? state.pagination.perPage,
      });
      set({ payments: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: false });
      return result;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  fetchPaymentById: async (companyId, id) => {
    set({ loading: true, error: null });
    try {
      const payment = await paymentsService.getById(companyId, id);
      set({ currentPayment: payment, loading: false });
      return payment;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  createPayment: async (companyId, data) => {
    set({ loading: true, error: null });
    try {
      const created = await paymentsService.create(companyId, data);
      set({ payments: [...get().payments, created], loading: false });
      toast.success('Paiement enregistré');
      return created;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  updatePayment: async (companyId, id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await paymentsService.update(companyId, id, data);
      const payments = get().payments.map((p) => (p.id === id ? updated : p));
      set({ payments, currentPayment: updated, loading: false });
      toast.success('Paiement mis à jour');
      return updated;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  cancelPayment: async (companyId, id) => {
    set({ loading: true, error: null });
    try {
      const cancelled = await paymentsService.cancel(companyId, id);
      const payments = get().payments.map((p) => (p.id === id ? cancelled : p));
      set({ payments, currentPayment: cancelled, loading: false });
      toast.success('Paiement annulé');
      return cancelled;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message);
      return null;
    }
  },

  fetchHistory: async (companyId, paymentId) => {
    try {
      const history = await paymentsService.getHistory(companyId, paymentId);
      set({ paymentHistory: history });
      return history;
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  },

  fetchStatistics: async (companyId) => {
    try {
      const statistics = await paymentsService.getStatistics(companyId);
      set({ statistics });
      return statistics;
    } catch (err) {
      toast.error(err.message);
      return null;
    }
  },

  setSearch: (search) => set({ search }),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),
  clearCurrent: () => set({ currentPayment: null, paymentHistory: [] }),
}));

export default usePaymentStore;
