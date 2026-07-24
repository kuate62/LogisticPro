import { create } from 'zustand';
import { mockPackagesService } from '../api/mockPackages';

const usePackageStore = create((set, get) => ({
  packages: [],
  selectedPackage: null,
  history: [],
  payments: [],
  invoices: [],
  statistics: null,
  loading: { list: false, detail: false, create: false, update: false, cancel: false, history: false, payments: false, invoices: false, stats: false },
  error: null,
  search: '',
  filters: { status: '', category: '', fragile: '', insured: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', category: '', fragile: '', insured: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchPackages: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await mockPackagesService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ packages: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchPackageDetail: async (companyId, packageId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const pkg = await mockPackagesService.getById(companyId, packageId);
      set({ selectedPackage: pkg, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchHistory: async (companyId, packageId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await mockPackagesService.getHistory(companyId, packageId);
      set({ history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchPayments: async (companyId, packageId) => {
    set((s) => ({ loading: { ...s.loading, payments: true } }));
    try {
      const payments = await mockPackagesService.getPayments(companyId, packageId);
      set({ payments, loading: { ...get().loading, payments: false } });
    } catch { set({ loading: { ...get().loading, payments: false } }); }
  },

  fetchInvoices: async (companyId, packageId) => {
    set((s) => ({ loading: { ...s.loading, invoices: true } }));
    try {
      const invoices = await mockPackagesService.getInvoices(companyId, packageId);
      set({ invoices, loading: { ...get().loading, invoices: false } });
    } catch { set({ loading: { ...get().loading, invoices: false } }); }
  },

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const statistics = await mockPackagesService.getStatistics(companyId);
      set({ statistics, loading: { ...get().loading, stats: false } });
    } catch { set({ loading: { ...get().loading, stats: false } }); }
  },

  createPackage: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const pkg = await mockPackagesService.create(companyId, data);
      set((s) => ({ packages: [pkg, ...s.packages], loading: { ...s.loading, create: false } }));
      return pkg;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updatePackageStatus: async (companyId, packageId, newStatus) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const pkg = await mockPackagesService.updateStatus(companyId, packageId, newStatus);
      set((s) => ({
        packages: s.packages.map((p) => p.id === packageId ? pkg : p),
        selectedPackage: s.selectedPackage?.id === packageId ? pkg : s.selectedPackage,
        loading: { ...s.loading, update: false },
      }));
      return pkg;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  cancelPackage: async (companyId, packageId) => {
    set((s) => ({ loading: { ...s.loading, cancel: true } }));
    try {
      const pkg = await mockPackagesService.cancel(companyId, packageId);
      set((s) => ({
        packages: s.packages.map((p) => p.id === packageId ? pkg : p),
        selectedPackage: s.selectedPackage?.id === packageId ? pkg : s.selectedPackage,
        loading: { ...s.loading, cancel: false },
      }));
      return pkg;
    } catch (err) { set({ loading: { ...get().loading, cancel: false } }); throw err; }
  },

  clearSelected: () => set({ selectedPackage: null, history: [], payments: [], invoices: [] }),
}));

export default usePackageStore;
