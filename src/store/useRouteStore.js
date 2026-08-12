import { create } from 'zustand';
import { routesService } from '../api/routesService';

const useRouteStore = create((set, get) => ({
  routes: [],
  selectedRoute: null,
  history: [],
  statistics: null,
  loading: { list: false, detail: false, create: false, update: false, cancel: false, history: false, stats: false },
  error: null,
  search: '',
  filters: { status: '', originAgencyId: '', destinationAgencyId: '', originCity: '', destinationCity: '', dateFrom: '', dateTo: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', originAgencyId: '', destinationAgencyId: '', originCity: '', destinationCity: '', dateFrom: '', dateTo: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchRoutes: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await routesService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ routes: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchRouteDetail: async (companyId, routeId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const route = await routesService.getById(companyId, routeId);
      set({ selectedRoute: route, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchHistory: async (companyId, routeId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await routesService.getHistory(companyId, routeId);
      set({ history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const statistics = await routesService.getStatistics(companyId);
      set({ statistics, loading: { ...get().loading, stats: false } });
    } catch { set({ loading: { ...get().loading, stats: false } }); }
  },

  createRoute: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const route = await routesService.create(companyId, data);
      set((s) => ({ routes: [route, ...s.routes], loading: { ...s.loading, create: false } }));
      return route;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateRoute: async (companyId, routeId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const route = await routesService.update(companyId, routeId, data);
      set((s) => ({
        routes: s.routes.map((r) => r.id === routeId ? route : r),
        selectedRoute: s.selectedRoute?.id === routeId ? route : s.selectedRoute,
        loading: { ...s.loading, update: false },
      }));
      return route;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  cancelRoute: async (companyId, routeId) => {
    set((s) => ({ loading: { ...s.loading, cancel: true } }));
    try {
      const route = await routesService.cancel(companyId, routeId);
      set((s) => ({
        routes: s.routes.map((r) => r.id === routeId ? route : r),
        selectedRoute: s.selectedRoute?.id === routeId ? route : s.selectedRoute,
        loading: { ...s.loading, cancel: false },
      }));
      return route;
    } catch (err) { set({ loading: { ...get().loading, cancel: false } }); throw err; }
  },

  assignShipment: async (companyId, routeId, shipment) => {
    const route = await routesService.assignShipment(companyId, routeId, shipment);
    set((s) => ({
      routes: s.routes.map((r) => r.id === routeId ? route : r),
      selectedRoute: s.selectedRoute?.id === routeId ? route : s.selectedRoute,
    }));
    return route;
  },

  removeShipment: async (companyId, routeId, shipmentId) => {
    const route = await routesService.removeShipment(companyId, routeId, shipmentId);
    set((s) => ({
      routes: s.routes.map((r) => r.id === routeId ? route : r),
      selectedRoute: s.selectedRoute?.id === routeId ? route : s.selectedRoute,
    }));
    return route;
  },

  clearSelected: () => set({ selectedRoute: null, history: [] }),
}));

export default useRouteStore;
