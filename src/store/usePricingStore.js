import { create } from 'zustand';
import { mockPricingService } from '../api/mockPricing';

const usePricingStore = create((set, get) => ({
  pricings: [],
  selectedPricing: null,
  history: [],
  statistics: null,
  calculation: null,
  loading: { list: false, detail: false, create: false, update: false, history: false, stats: false, calc: false },
  error: null,
  search: '',
  filters: { status: '', originCity: '', destinationCity: '', category: '', dateFrom: '', dateTo: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', originCity: '', destinationCity: '', category: '', dateFrom: '', dateTo: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchPricings: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await mockPricingService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ pricings: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchPricingDetail: async (companyId, pricingId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const pricing = await mockPricingService.getById(companyId, pricingId);
      set({ selectedPricing: pricing, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchHistory: async (companyId, pricingId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await mockPricingService.getHistory(companyId, pricingId);
      set({ history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const statistics = await mockPricingService.getStatistics(companyId);
      set({ statistics, loading: { ...get().loading, stats: false } });
    } catch { set({ loading: { ...get().loading, stats: false } }); }
  },

  createPricing: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const pricing = await mockPricingService.create(companyId, data);
      set((s) => ({ pricings: [pricing, ...s.pricings], loading: { ...s.loading, create: false } }));
      return pricing;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updatePricing: async (companyId, pricingId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const pricing = await mockPricingService.update(companyId, pricingId, data);
      set((s) => ({
        pricings: s.pricings.map((p) => p.id === pricingId ? pricing : p),
        selectedPricing: s.selectedPricing?.id === pricingId ? pricing : s.selectedPricing,
        loading: { ...s.loading, update: false },
      }));
      return pricing;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  activatePricing: async (companyId, pricingId) => {
    const pricing = await mockPricingService.activate(companyId, pricingId);
    set((s) => ({
      pricings: s.pricings.map((p) => p.id === pricingId ? pricing : p),
      selectedPricing: s.selectedPricing?.id === pricingId ? pricing : s.selectedPricing,
    }));
    return pricing;
  },

  deactivatePricing: async (companyId, pricingId) => {
    const pricing = await mockPricingService.deactivate(companyId, pricingId);
    set((s) => ({
      pricings: s.pricings.map((p) => p.id === pricingId ? pricing : p),
      selectedPricing: s.selectedPricing?.id === pricingId ? pricing : s.selectedPricing,
    }));
    return pricing;
  },

  duplicatePricing: async (companyId, pricingId) => {
    const pricing = await mockPricingService.duplicate(companyId, pricingId);
    set((s) => ({ pricings: [pricing, ...s.pricings] }));
    return pricing;
  },

  calculatePricing: async (companyId, params) => {
    set((s) => ({ loading: { ...s.loading, calc: true } }));
    try {
      const calc = await mockPricingService.calculate(companyId, params);
      set({ calculation: calc, loading: { ...get().loading, calc: false } });
      return calc;
    } catch (err) { set({ loading: { ...get().loading, calc: false } }); throw err; }
  },

  clearSelected: () => set({ selectedPricing: null, history: [], calculation: null }),
}));

export default usePricingStore;
