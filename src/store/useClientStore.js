import { create } from 'zustand';
import { mockClientsService } from '../api/mockClients';

const useClientStore = create((set, get) => ({
  clients: [],
  selectedClient: null,
  counts: { total: 0, active: 0, inactive: 0, blocked: 0, newThisMonth: 0 },
  statistics: null,
  history: [],
  documents: [],
  photos: [],
  loading: { list: false, detail: false, create: false, update: false, archive: false, activate: false, deactivate: false, block: false, counts: false, history: false, documents: false, photos: false, stats: false, upload: false },
  error: null,
  search: '',
  filters: { status: '', agencyId: '', city: '', isActive: '', isBlocked: '', hasShipments: '', hasPayments: '', dateFrom: '', dateTo: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', agencyId: '', city: '', isActive: '', isBlocked: '', hasShipments: '', hasPayments: '', dateFrom: '', dateTo: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  fetchClients: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await mockClientsService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ clients: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchClientDetail: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const client = await mockClientsService.getById(companyId, clientId);
      set({ selectedClient: client, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchCounts: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, counts: true } }));
    try {
      const counts = await mockClientsService.getCount(companyId);
      set({ counts, loading: { ...get().loading, counts: false } });
    } catch { set({ loading: { ...get().loading, counts: false } }); }
  },

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const statistics = await mockClientsService.getStatistics(companyId);
      set({ statistics, loading: { ...get().loading, stats: false } });
    } catch { set({ loading: { ...get().loading, stats: false } }); }
  },

  fetchHistory: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await mockClientsService.getHistory(companyId, clientId);
      set({ history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchDocuments: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, documents: true } }));
    try {
      const documents = await mockClientsService.getDocuments(companyId, clientId);
      set({ documents, loading: { ...get().loading, documents: false } });
    } catch { set({ loading: { ...get().loading, documents: false } }); }
  },

  fetchPhotos: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, photos: true } }));
    try {
      const photos = await mockClientsService.getPhotos(companyId, clientId);
      set({ photos, loading: { ...get().loading, photos: false } });
    } catch { set({ loading: { ...get().loading, photos: false } }); }
  },

  createClient: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const client = await mockClientsService.create(companyId, data);
      set((s) => ({ clients: [client, ...s.clients], loading: { ...s.loading, create: false } }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateClient: async (companyId, clientId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const client = await mockClientsService.update(companyId, clientId, data);
      set((s) => ({
        clients: s.clients.map((c) => c.id === clientId ? client : c),
        selectedClient: s.selectedClient?.id === clientId ? client : s.selectedClient,
        loading: { ...s.loading, update: false },
      }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  archiveClient: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, archive: true } }));
    try {
      const client = await mockClientsService.archive(companyId, clientId);
      set((s) => ({
        clients: s.clients.map((c) => c.id === clientId ? client : c),
        selectedClient: s.selectedClient?.id === clientId ? client : s.selectedClient,
        loading: { ...s.loading, archive: false },
      }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, archive: false } }); throw err; }
  },

  activateClient: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, activate: true } }));
    try {
      const client = await mockClientsService.activate(companyId, clientId);
      set((s) => ({
        clients: s.clients.map((c) => c.id === clientId ? client : c),
        selectedClient: s.selectedClient?.id === clientId ? client : s.selectedClient,
        loading: { ...s.loading, activate: false },
      }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, activate: false } }); throw err; }
  },

  deactivateClient: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, deactivate: true } }));
    try {
      const client = await mockClientsService.deactivate(companyId, clientId);
      set((s) => ({
        clients: s.clients.map((c) => c.id === clientId ? client : c),
        selectedClient: s.selectedClient?.id === clientId ? client : s.selectedClient,
        loading: { ...s.loading, deactivate: false },
      }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, deactivate: false } }); throw err; }
  },

  blockClient: async (companyId, clientId) => {
    set((s) => ({ loading: { ...s.loading, block: true } }));
    try {
      const client = await mockClientsService.block(companyId, clientId);
      set((s) => ({
        clients: s.clients.map((c) => c.id === clientId ? client : c),
        selectedClient: s.selectedClient?.id === clientId ? client : s.selectedClient,
        loading: { ...s.loading, block: false },
      }));
      return client;
    } catch (err) { set({ loading: { ...get().loading, block: false } }); throw err; }
  },

  addDocument: async (companyId, clientId, doc) => {
    set((s) => ({ loading: { ...s.loading, upload: true } }));
    try {
      const newDoc = await mockClientsService.addDocument(companyId, clientId, doc);
      set((s) => ({ documents: [...s.documents, newDoc], loading: { ...s.loading, upload: false } }));
      return newDoc;
    } catch (err) { set({ loading: { ...get().loading, upload: false } }); throw err; }
  },

  removeDocument: async (companyId, docId) => {
    set((s) => ({ loading: { ...s.loading, documents: true } }));
    try {
      await mockClientsService.removeDocument(companyId, docId);
      set((s) => ({ documents: s.documents.filter((d) => d.id !== docId), loading: { ...s.loading, documents: false } }));
    } catch (err) { set({ loading: { ...get().loading, documents: false } }); throw err; }
  },

  addPhoto: async (companyId, clientId, photo) => {
    set((s) => ({ loading: { ...s.loading, upload: true } }));
    try {
      const newPhoto = await mockClientsService.addPhoto(companyId, clientId, photo);
      set((s) => ({ photos: [...s.photos, newPhoto], loading: { ...s.loading, upload: false } }));
      return newPhoto;
    } catch (err) { set({ loading: { ...get().loading, upload: false } }); throw err; }
  },

  removePhoto: async (companyId, photoId) => {
    set((s) => ({ loading: { ...s.loading, photos: true } }));
    try {
      await mockClientsService.removePhoto(companyId, photoId);
      set((s) => ({ photos: s.photos.filter((p) => p.id !== photoId), loading: { ...s.loading, photos: false } }));
    } catch (err) { set({ loading: { ...get().loading, photos: false } }); throw err; }
  },

  clearSelected: () => set({ selectedClient: null, history: [], documents: [], photos: [] }),
}));

export default useClientStore;
