import { create } from 'zustand';
import { mockRolesService } from '../api/mockRoles';

const useRoleStore = create((set, get) => ({
  roles: [],
  selectedRole: null,
  allPermissions: mockRolesService.ALL_PERMISSIONS,
  loading: { list: false, detail: false, create: false, update: false, delete: false },
  error: null,
  search: '',

  setSearch: (search) => set({ search }),

  fetchRoles: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const roles = await mockRolesService.getAll(companyId);
      let result = roles;
      const { search } = get();
      if (search) {
        const q = search.toLowerCase();
        result = result.filter((r) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q));
      }
      set({ roles: result, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchRoleDetail: async (companyId, roleId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const role = await mockRolesService.getById(companyId, roleId);
      set({ selectedRole: role, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  createRole: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const role = await mockRolesService.create(companyId, data);
      set((s) => ({ roles: [...s.roles, role], loading: { ...s.loading, create: false } }));
      return role;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateRole: async (companyId, roleId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const role = await mockRolesService.update(companyId, roleId, data);
      set((s) => ({
        roles: s.roles.map((r) => r.id === roleId ? role : r),
        selectedRole: s.selectedRole?.id === roleId ? role : s.selectedRole,
        loading: { ...s.loading, update: false },
      }));
      return role;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  deleteRole: async (companyId, roleId) => {
    set((s) => ({ loading: { ...s.loading, delete: true }, error: null }));
    try {
      await mockRolesService.remove(companyId, roleId);
      set((s) => ({
        roles: s.roles.filter((r) => r.id !== roleId),
        selectedRole: s.selectedRole?.id === roleId ? null : s.selectedRole,
        loading: { ...s.loading, delete: false },
      }));
    } catch (err) { set({ loading: { ...get().loading, delete: false }, error: err.message }); throw err; }
  },

  clearSelected: () => set({ selectedRole: null }),
}));

export default useRoleStore;
