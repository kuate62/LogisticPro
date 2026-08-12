import { create } from 'zustand';
import { agenciesService } from '../api/agenciesService';

const useAgencyStore = create((set, get) => ({
  agencies: [],
  selectedAgency: null,
  agencyStats: null,
  agencyEmployees: [],
  agencyShipments: [],
  agencyHistory: [],
  agencyDocuments: [],
  counts: { total: 0, active: 0, inactive: 0, suspended: 0, maintenance: 0 },
  cities: [],
  regions: [],
  loading: {
    list: false,
    detail: false,
    stats: false,
    employees: false,
    shipments: false,
    history: false,
    documents: false,
    create: false,
    update: false,
    toggle: false,
    counts: false,
    cities: false,
    regions: false,
  },
  error: null,
  search: '',
  filters: { status: '', city: '', region: '', isPrimary: null, manager: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setLoading: (key, val) => set((s) => ({ loading: { ...s.loading, [key]: val } })),
  setError: (err) => set({ error: err }),

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),

  setFilters: (filters) => set((s) => ({
    filters: { ...s.filters, ...filters },
    pagination: { ...s.pagination, page: 1 },
  })),

  resetFilters: () => set({
    filters: { status: '', city: '', region: '', isPrimary: null, manager: '' },
    search: '',
    pagination: { ...get().pagination, page: 1 },
  }),

  setSort: (sort) => set({ sort }),

  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchAgencies: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await agenciesService.getAll(companyId, {
        search,
        filters,
        sort,
        page: pagination.page,
        perPage: pagination.perPage,
      });
      set({
        agencies: result.data,
        pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages },
        loading: { ...get().loading, list: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, list: false }, error: err.message });
    }
  },

  fetchAgencyDetail: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const agency = await agenciesService.getById(companyId, agencyId);
      set({ selectedAgency: agency, loading: { ...get().loading, detail: false } });
    } catch (err) {
      set({ loading: { ...get().loading, detail: false }, error: err.message });
    }
  },

  fetchAgencyStats: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const stats = await agenciesService.getStatistics(companyId, agencyId);
      set({ agencyStats: stats, loading: { ...get().loading, stats: false } });
    } catch (err) {
      set({ loading: { ...get().loading, stats: false }, error: err.message });
    }
  },

  fetchAgencyEmployees: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, employees: true } }));
    try {
      const employees = await agenciesService.getEmployees(companyId, agencyId);
      set({ agencyEmployees: employees, loading: { ...get().loading, employees: false } });
    } catch (err) {
      set({ loading: { ...get().loading, employees: false }, error: err.message });
    }
  },

  fetchAgencyShipments: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, shipments: true } }));
    try {
      const shipments = await agenciesService.getShipments(companyId, agencyId);
      set({ agencyShipments: shipments, loading: { ...get().loading, shipments: false } });
    } catch (err) {
      set({ loading: { ...get().loading, shipments: false }, error: err.message });
    }
  },

  fetchAgencyHistory: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await agenciesService.getHistory(companyId, agencyId);
      set({ agencyHistory: history, loading: { ...get().loading, history: false } });
    } catch (err) {
      set({ loading: { ...get().loading, history: false }, error: err.message });
    }
  },

  fetchAgencyDocuments: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, documents: true } }));
    try {
      const documents = await agenciesService.getDocuments(companyId, agencyId);
      set({ agencyDocuments: documents, loading: { ...get().loading, documents: false } });
    } catch (err) {
      set({ loading: { ...get().loading, documents: false }, error: err.message });
    }
  },

  fetchCounts: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, counts: true } }));
    try {
      const counts = await agenciesService.getCount(companyId);
      set({ counts, loading: { ...get().loading, counts: false } });
    } catch (err) {
      set({ loading: { ...get().loading, counts: false }, error: err.message });
    }
  },

  fetchCities: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, cities: true } }));
    try {
      const cities = await agenciesService.getAllCities(companyId);
      set({ cities, loading: { ...get().loading, cities: false } });
    } catch (err) {
      set({ loading: { ...get().loading, cities: false }, error: err.message });
    }
  },

  fetchRegions: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, regions: true } }));
    try {
      const regions = await agenciesService.getAllRegions(companyId);
      set({ regions, loading: { ...get().loading, regions: false } });
    } catch (err) {
      set({ loading: { ...get().loading, regions: false }, error: err.message });
    }
  },

  createAgency: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const agency = await agenciesService.create(companyId, data);
      set((s) => ({
        agencies: [agency, ...s.agencies],
        loading: { ...s.loading, create: false },
      }));
      return agency;
    } catch (err) {
      set({ loading: { ...get().loading, create: false }, error: err.message });
      throw err;
    }
  },

  updateAgency: async (companyId, agencyId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const agency = await agenciesService.update(companyId, agencyId, data);
      set((s) => ({
        agencies: s.agencies.map((a) => (a.id === agencyId ? agency : a)),
        selectedAgency: s.selectedAgency?.id === agencyId ? agency : s.selectedAgency,
        loading: { ...s.loading, update: false },
      }));
      return agency;
    } catch (err) {
      set({ loading: { ...get().loading, update: false }, error: err.message });
      throw err;
    }
  },

  toggleAgencyStatus: async (companyId, agencyId) => {
    set((s) => ({ loading: { ...s.loading, toggle: true }, error: null }));
    try {
      const agency = await agenciesService.toggleStatus(companyId, agencyId);
      set((s) => ({
        agencies: s.agencies.map((a) => (a.id === agencyId ? agency : a)),
        selectedAgency: s.selectedAgency?.id === agencyId ? agency : s.selectedAgency,
        loading: { ...s.loading, toggle: false },
      }));
      return agency;
    } catch (err) {
      set({ loading: { ...get().loading, toggle: false }, error: err.message });
      throw err;
    }
  },

  clearSelected: () => set({ selectedAgency: null, agencyStats: null, agencyEmployees: [], agencyShipments: [], agencyHistory: [], agencyDocuments: [] }),
}));

export default useAgencyStore;
