import { create } from 'zustand';
import { usersService } from '../api/usersService';

const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  userHistory: [],
  counts: { total: 0, active: 0, inactive: 0 },
  loading: { list: false, detail: false, create: false, update: false, toggle: false, counts: false, history: false, reset: false },
  error: null,
  search: '',
  filters: { status: '', role: '', agencyId: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', role: '', agencyId: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchUsers: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await usersService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ users: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchUserDetail: async (companyId, userId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const user = await usersService.getById(companyId, userId);
      set({ selectedUser: user, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchUserHistory: async (companyId, userId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await usersService.getHistory(companyId, userId);
      set({ userHistory: history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchCounts: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, counts: true } }));
    try {
      const counts = await usersService.getCount(companyId);
      set({ counts, loading: { ...get().loading, counts: false } });
    } catch { set({ loading: { ...get().loading, counts: false } }); }
  },

  createUser: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const user = await usersService.create(companyId, data);
      set((s) => ({ users: [user, ...s.users], loading: { ...s.loading, create: false } }));
      return user;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateUser: async (companyId, userId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const user = await usersService.update(companyId, userId, data);
      set((s) => ({
        users: s.users.map((u) => u.id === userId ? user : u),
        selectedUser: s.selectedUser?.id === userId ? user : s.selectedUser,
        loading: { ...s.loading, update: false },
      }));
      return user;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  toggleUserStatus: async (companyId, userId) => {
    set((s) => ({ loading: { ...s.loading, toggle: true } }));
    try {
      const user = await usersService.toggleStatus(companyId, userId);
      set((s) => ({
        users: s.users.map((u) => u.id === userId ? user : u),
        selectedUser: s.selectedUser?.id === userId ? user : s.selectedUser,
        loading: { ...s.loading, toggle: false },
      }));
      return user;
    } catch (err) { set({ loading: { ...get().loading, toggle: false } }); throw err; }
  },

  resetPassword: async (companyId, userId) => {
    set((s) => ({ loading: { ...s.loading, reset: true } }));
    try {
      const result = await usersService.resetPassword(companyId, userId);
      set((s) => ({ loading: { ...s.loading, reset: false } }));
      return result;
    } catch (err) { set({ loading: { ...get().loading, reset: false } }); throw err; }
  },

  clearSelected: () => set({ selectedUser: null, userHistory: [] }),
}));

export default useUserStore;
