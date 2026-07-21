import { create } from 'zustand';
import { mockShipmentsService } from '../api/mockShipments';

const initialWizard = {
  step: 1,
  senderId: '', senderName: '', senderPhone: '',
  receiverId: '', receiverName: '', receiverPhone: '',
  originAgencyId: '', originAgencyName: '', originCity: '',
  destinationAgencyId: '', destinationAgencyName: '', destinationCity: '',
  routeId: '', routeName: '', maxWeight: 100,
  packages: [],
  observation: '',
};

const useShipmentStore = create((set, get) => ({
  shipments: [],
  selectedShipment: null,
  history: [],
  statistics: null,
  wizard: { ...initialWizard },
  loading: { list: false, detail: false, create: false, update: false, cancel: false, archive: false, history: false, stats: false },
  error: null,
  search: '',
  filters: { status: '', originAgencyId: '', destinationAgencyId: '', routeId: '', agentId: '', dateFrom: '', dateTo: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  setSearch: (search) => set({ search, pagination: { ...get().pagination, page: 1 } }),
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters }, pagination: { ...s.pagination, page: 1 } })),
  resetFilters: () => set({ filters: { status: '', originAgencyId: '', destinationAgencyId: '', routeId: '', agentId: '', dateFrom: '', dateTo: '' }, search: '', pagination: { ...get().pagination, page: 1 } }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set((s) => ({ pagination: { ...s.pagination, page } })),

  setWizard: (data) => set((s) => ({ wizard: { ...s.wizard, ...data } })),
  setWizardStep: (step) => set((s) => ({ wizard: { ...s.wizard, step } })),
  resetWizard: () => set({ wizard: { ...initialWizard } }),
  addWizardPackage: (pkg) => set((s) => {
    const calc = mockShipmentsService.calculatePackage(pkg);
    return { wizard: { ...s.wizard, packages: [...s.wizard.packages, calc] } };
  }),
  updateWizardPackage: (index, pkg) => set((s) => {
    const calc = mockShipmentsService.calculatePackage(pkg);
    const pkgs = [...s.wizard.packages];
    pkgs[index] = calc;
    return { wizard: { ...s.wizard, packages: pkgs } };
  }),
  removeWizardPackage: (index) => set((s) => {
    const pkgs = s.wizard.packages.filter((_, i) => i !== index);
    return { wizard: { ...s.wizard, packages: pkgs } };
  }),
  getWizardTotals: () => {
    const { wizard } = get();
    const pkgs = wizard.packages;
    return {
      packageCount: pkgs.length,
      totalWeight: pkgs.reduce((sum, p) => sum + (p.weight || 0), 0),
      remainingWeight: Math.max(0, wizard.maxWeight - pkgs.reduce((sum, p) => sum + (p.weight || 0), 0)),
      transportAmount: pkgs.reduce((sum, p) => sum + (p.transportAmount || 0), 0),
      insuranceAmount: pkgs.reduce((sum, p) => sum + (p.insuranceAmount || 0), 0),
      totalAmount: pkgs.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      maxWeight: wizard.maxWeight,
    };
  },

  fetchShipments: async (companyId) => {
    const { search, filters, sort, pagination } = get();
    set((s) => ({ loading: { ...s.loading, list: true }, error: null }));
    try {
      const result = await mockShipmentsService.getAll(companyId, { search, filters, sort, page: pagination.page, perPage: pagination.perPage });
      set({ shipments: result.data, pagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages }, loading: { ...get().loading, list: false } });
    } catch (err) { set({ loading: { ...get().loading, list: false }, error: err.message }); }
  },

  fetchShipmentDetail: async (companyId, shipmentId) => {
    set((s) => ({ loading: { ...s.loading, detail: true }, error: null }));
    try {
      const shipment = await mockShipmentsService.getById(companyId, shipmentId);
      set({ selectedShipment: shipment, loading: { ...get().loading, detail: false } });
    } catch (err) { set({ loading: { ...get().loading, detail: false }, error: err.message }); }
  },

  fetchHistory: async (companyId, shipmentId) => {
    set((s) => ({ loading: { ...s.loading, history: true } }));
    try {
      const history = await mockShipmentsService.getHistory(companyId, shipmentId);
      set({ history, loading: { ...get().loading, history: false } });
    } catch { set({ loading: { ...get().loading, history: false } }); }
  },

  fetchStatistics: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true } }));
    try {
      const statistics = await mockShipmentsService.getStatistics(companyId);
      set({ statistics, loading: { ...get().loading, stats: false } });
    } catch { set({ loading: { ...get().loading, stats: false } }); }
  },

  createShipment: async (companyId, data) => {
    set((s) => ({ loading: { ...s.loading, create: true }, error: null }));
    try {
      const shipment = await mockShipmentsService.create(companyId, data);
      set((s) => ({ shipments: [shipment, ...s.shipments], loading: { ...s.loading, create: false } }));
      return shipment;
    } catch (err) { set({ loading: { ...get().loading, create: false }, error: err.message }); throw err; }
  },

  updateShipment: async (companyId, shipmentId, data) => {
    set((s) => ({ loading: { ...s.loading, update: true }, error: null }));
    try {
      const shipment = await mockShipmentsService.update(companyId, shipmentId, data);
      set((s) => ({
        shipments: s.shipments.map((sh) => sh.id === shipmentId ? shipment : sh),
        selectedShipment: s.selectedShipment?.id === shipmentId ? shipment : s.selectedShipment,
        loading: { ...s.loading, update: false },
      }));
      return shipment;
    } catch (err) { set({ loading: { ...get().loading, update: false }, error: err.message }); throw err; }
  },

  cancelShipment: async (companyId, shipmentId) => {
    set((s) => ({ loading: { ...s.loading, cancel: true } }));
    try {
      const shipment = await mockShipmentsService.cancel(companyId, shipmentId);
      set((s) => ({
        shipments: s.shipments.map((sh) => sh.id === shipmentId ? shipment : sh),
        selectedShipment: s.selectedShipment?.id === shipmentId ? shipment : s.selectedShipment,
        loading: { ...s.loading, cancel: false },
      }));
      return shipment;
    } catch (err) { set({ loading: { ...get().loading, cancel: false } }); throw err; }
  },

  archiveShipment: async (companyId, shipmentId) => {
    set((s) => ({ loading: { ...s.loading, archive: true } }));
    try {
      const shipment = await mockShipmentsService.archive(companyId, shipmentId);
      set((s) => ({
        shipments: s.shipments.map((sh) => sh.id === shipmentId ? shipment : sh),
        loading: { ...s.loading, archive: false },
      }));
      return shipment;
    } catch (err) { set({ loading: { ...get().loading, archive: false } }); throw err; }
  },

  clearSelected: () => set({ selectedShipment: null, history: [] }),
}));

export default useShipmentStore;
