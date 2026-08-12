import { create } from 'zustand';
import { clientsService } from '../api/clientsService';

const initialPagination = { page: 1, perPage: 10, total: 0, totalPages: 0 };

const useClientsStore = create((set, get) => ({
  clients: [],
  selectedClient: null,
  statistics: null,
  counts: { total: 0, active: 0, inactive: 0, blocked: 0 },
  history: [],
  documents: [],
  photos: [],
  loading: {
    list: false,
    detail: false,
    stats: false,
    history: false,
    documents: false,
    photos: false,
    create: false,
    update: false,
    toggle: false,
    counts: false,
  },
  error: null,
  search: '',
  filters: { status: '', city: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: initialPagination,

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', city: '' }, search: '', pagination: { ...initialPagination } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchClients: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await clientsService.list(companyId, {
        search,
        status: filters.status,
        city: filters.city,
        page: pagination.page,
        limit: pagination.perPage,
      });
      let items = result.data;
      if (sort.field) {
        items = [...items].sort((a, b) => {
          let va = a[sort.field] ?? '';
          let vb = b[sort.field] ?? '';
          if (typeof va === 'number' && typeof vb === 'number') return sort.direction === 'asc' ? va - vb : vb - va;
          va = String(va).toLowerCase();
          vb = String(vb).toLowerCase();
          if (va < vb) return sort.direction === 'asc' ? -1 : 1;
          if (va > vb) return sort.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      set({
        clients: items,
        pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages },
        loading: { ...get().loading, list: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, list: false }, error: err.message });
    }
  },

  fetchCounts: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, counts: true } }));
    try {
      const counts = await clientsService.getCount(companyId);
      set({ counts, loading: { ...get().loading, counts: false } });
    } catch (err) {
      set({ loading: { ...get().loading, counts: false }, error: err.message });
    }
  },

  fetchClientDetail: async (companyId, id) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const client = await clientsService.getById(companyId, id);
      set({ selectedClient: client, loading: { ...get().loading, detail: false } });
    } catch (err) {
      set({ loading: { ...get().loading, detail: false }, error: err.message });
    }
  },

  fetchHistory: async () => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    set({ history: [], loading: { ...get().loading, history: false } });
  },

  fetchDocuments: async () => {
    set((s) => ({ loading: { ...s.loading, documents: true } }));
    set({ documents: [], loading: { ...get().loading, documents: false } });
  },

  fetchPhotos: async () => {
    set((s) => ({ loading: { ...s.loading, photos: true } }));
    set({ photos: [], loading: { ...get().loading, photos: false } });
  },

  createClient: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const client = await clientsService.create(companyId, data);
      set((s) => ({ clients: [client, ...s.clients], loading: { ...s.loading, create: false } }));
      return client;
    } catch (err) {
      set({ loading: { ...get().loading, create: false }, error: err.message });
      throw err;
    }
  },

  updateClient: async (companyId, id, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const client = await clientsService.update(companyId, id, data);
      set((s) => ({
        clients: s.clients.map((c) => (c.id === id ? client : c)),
        selectedClient: s.selectedClient?.id === id ? client : s.selectedClient,
        loading: { ...s.loading, update: false },
      }));
      return client;
    } catch (err) {
      set({ loading: { ...get().loading, update: false }, error: err.message });
      throw err;
    }
  },

  setClientStatus: async (companyId, id, status) => {
    set((s) => ({ loading: { ...s.loading, toggle: true }, error: null }));
    try {
      const client = await clientsService.toggleStatus(companyId, id, status);
      set((s) => ({
        clients: s.clients.map((c) => (c.id === id ? client : c)),
        selectedClient: s.selectedClient?.id === id ? client : s.selectedClient,
        loading: { ...s.loading, toggle: false },
      }));
      return client;
    } catch (err) {
      set({ loading: { ...get().loading, toggle: false }, error: err.message });
      throw err;
    }
  },

  activateClient: async (companyId, id) => get().setClientStatus(companyId, id, 'active'),
  deactivateClient: async (companyId, id) => get().setClientStatus(companyId, id, 'inactive'),
  blockClient: async (companyId, id) => get().setClientStatus(companyId, id, 'blocked'),
  archiveClient: async (companyId, id) => get().setClientStatus(companyId, id, 'inactive'),

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const result = await clientsService.list(companyId, { limit: 1000 });
      const active = result.data.filter((c) => c.status === 'active').length;
      const inactive = result.data.filter((c) => c.status === 'inactive').length;
      const blocked = result.data.filter((c) => c.status === 'blocked').length;
      set({
        statistics: { total: result.total, active, inactive, blocked },
        loading: { ...get().loading, stats: false },
      });
    } catch (err) {
      set({ loading: { ...get().loading, stats: false }, error: err.message });
    }
  },

  addPhoto: async (companyId, clientId, photo) => {
    const p = { ...photo, id: Date.now() };
    set((s) => ({ photos: [p, ...s.photos] }));
    return p;
  },

  removePhoto: async (companyId, photoId) => {
    set((s) => ({ photos: s.photos.filter((p) => p.id !== photoId) }));
  },

  addDocument: async (companyId, clientId, doc) => {
    const d = { ...doc, id: Date.now() };
    set((s) => ({ documents: [d, ...s.documents] }));
    return d;
  },

  removeDocument: async (companyId, docId) => {
    set((s) => ({ documents: s.documents.filter((d) => d.id !== docId) }));
  },

  clearSelected: () => set({ selectedClient: null, history: [], documents: [], photos: [] }),
}));

export default useClientsStore;
