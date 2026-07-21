import { create } from 'zustand';
import { mockEmployeesService } from '../api/mockEmployees';

const useEmployeeStore = create((set, get) => ({
  employees: [],
  selectedEmployee: null,
  counts: { total: 0, active: 0, inactive: 0 },
  loading: { list: false, detail: false, create: false, update: false, toggle: false, counts: false },
  error: null,
  search: '',
  filters: { status: '', agencyId: '', position: '', gender: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', agencyId: '', position: '', gender: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchEmployees: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await mockEmployeesService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ employees: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchEmployeeDetail: async (companyId, employeeId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const emp = await mockEmployeesService.getById(companyId, employeeId);
      set({ selectedEmployee: emp, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchCounts: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, counts: true } }));
    try {
      const counts = await mockEmployeesService.getCount(companyId);
      set({ counts, loading: { ...get().loading, counts: false } });
    } catch { set({ loading: { ...get().loading, counts: false } }); }
  },

  createEmployee: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const emp = await mockEmployeesService.create(companyId, data);
      set((s) => ({ employees: [emp, ...s.employees], loading: { ...s.loading, create: false } }));
      return emp;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateEmployee: async (companyId, employeeId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const emp = await mockEmployeesService.update(companyId, employeeId, data);
      set((s) => ({
        employees: s.employees.map((e) => e.id === employeeId ? emp : e),
        selectedEmployee: s.selectedEmployee?.id === employeeId ? emp : s.selectedEmployee,
        loading: { ...s.loading, update: false },
      }));
      return emp;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  toggleEmployeeStatus: async (companyId, employeeId) => {
    set((s) => ({ loading: { ...s.loading, toggle: true } }));
    try {
      const emp = await mockEmployeesService.toggleStatus(companyId, employeeId);
      set((s) => ({
        employees: s.employees.map((e) => e.id === employeeId ? emp : e),
        selectedEmployee: s.selectedEmployee?.id === employeeId ? emp : s.selectedEmployee,
        loading: { ...s.loading, toggle: false },
      }));
      return emp;
    } catch (err) { set({ loading: { ...get().loading, toggle: false } }); throw err; }
  },

  clearSelected: () => set({ selectedEmployee: null }),
}));

export default useEmployeeStore;
