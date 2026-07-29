import { create } from 'zustand';
import { mockCompaniesService } from '../api/mockCompanies';

const useEntrepriseStore = create((set, get) => ({
  companies: [],
  selectedCompany: null,
  loading: false,
  companyLoading: false,
  error: null,
  query: '',
  filters: { city: '', region: '', country: '', verified: false, availableToday: false, category: '' },
  sort: 'name_asc',
  pagination: { page: 1, perPage: 9, total: 0, totalPages: 0 },

  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const { query, filters, sort, pagination } = get();
      const result = await mockCompaniesService.searchCompanies({ query, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ companies: result.companies, pagination: result.pagination, loading: false });
    } catch (err) {
      set({ error: err.message || 'Erreur de chargement', loading: false });
    }
  },

  selectCompany: async (id) => {
    if (!id) { set({ selectedCompany: null }); return; }
    set({ companyLoading: true, error: null });
    try {
      const company = await mockCompaniesService.getCompanyById(id);
      set({ selectedCompany: company, companyLoading: false });
    } catch (err) {
      set({ error: err.message || 'Erreur de chargement', companyLoading: false });
    }
  },

  setQuery: (query) => set({ query, pagination: { ...get().pagination, page: 1 } }),
  setFilter: (key, value) => set({ filters: { ...get().filters, [key]: value }, pagination: { ...get().pagination, page: 1 } }),
  resetFilters: () => set({
    query: '',
    filters: { city: '', region: '', country: '', verified: false, availableToday: false, category: '' },
    sort: 'name_asc',
    pagination: { ...get().pagination, page: 1 },
  }),
  setSort: (sort) => set({ sort, pagination: { ...get().pagination, page: 1 } }),
  setPage: (page) => set({ pagination: { ...get().pagination, page } }),
  setPerPage: (perPage) => set({ pagination: { ...get().pagination, perPage, page: 1 } }),
  reset: () => set({
    selectedCompany: null, companies: [], error: null,
    query: '', filters: { city: '', region: '', country: '', verified: false, availableToday: false, category: '' },
    sort: 'name_asc', pagination: { page: 1, perPage: 9, total: 0, totalPages: 0 },
  }),
}));

export default useEntrepriseStore;
