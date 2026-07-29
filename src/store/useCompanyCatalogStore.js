import { create } from 'zustand';
import { mockCompaniesService } from '../api/mockCompanies';

const useCompanyCatalogStore = create((set, get) => ({
  companies: [],
  selectedCompany: null,
  query: '',
  filters: { city: '', region: '', country: '', verified: false, availableToday: false, category: '' },
  sort: 'name_asc',
  pagination: { page: 1, perPage: 9, total: 0, totalPages: 0 },
  loading: false,
  detailLoading: false,
  error: null,

  setQuery: (query) => { set({ query, pagination: { ...get().pagination, page: 1 } }); },

  setFilter: (key, value) => {
    set((s) => ({
      filters: { ...s.filters, [key]: value },
      pagination: { ...s.pagination, page: 1 },
    }));
  },

  resetFilters: () => {
    set({
      filters: { city: '', region: '', country: '', verified: false, availableToday: false, category: '' },
      query: '',
      pagination: { ...get().pagination, page: 1 },
    });
  },

  setSort: (sort) => { set({ sort, pagination: { ...get().pagination, page: 1 } }); },

  setPage: (page) => { set((s) => ({ pagination: { ...s.pagination, page } })); },

  setPerPage: (perPage) => { set((s) => ({ pagination: { ...s.pagination, perPage, page: 1 } })); },

  fetchCompanies: async () => {
    const { query, filters, sort, pagination } = get();
    set({ loading: true, error: null });
    try {
      const result = await mockCompaniesService.searchCompanies({
        query, filters, sort, page: pagination.page, perPage: pagination.perPage,
      });
      set({ companies: result.items, pagination: { ...pagination, total: result.total, totalPages: result.totalPages }, loading: false });
    } catch (e) {
      set({ error: e.message || 'Erreur lors du chargement', loading: false });
    }
  },

  fetchCompany: async (id) => {
    set({ detailLoading: true, error: null });
    try {
      const company = await mockCompaniesService.getCompanyById(id);
      set({ selectedCompany: company, detailLoading: false });
      return company;
    } catch (e) {
      set({ error: e.message || 'Entreprise non trouvée', detailLoading: false });
      return null;
    }
  },
}));

export default useCompanyCatalogStore;
