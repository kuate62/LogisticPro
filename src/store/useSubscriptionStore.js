import { create } from 'zustand';
import { mockSubscriptionService } from '../api/mockSubscription';
import toast from 'react-hot-toast';

const useSubscriptionStore = create((set, get) => ({
  plans: [],
  subscription: null,
  currentPlan: null,
  quotas: null,
  paymentHistory: [],
  invoices: [],
  stats: null,
  loading: { plans: false, subscription: false, plan: false, quotas: false, payments: false, invoices: false, stats: false, action: false },
  error: null,
  paymentPagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },
  invoicePagination: { page: 1, perPage: 10, total: 0, totalPages: 0 },

  fetchPlans: async () => {
    set((s) => ({ loading: { ...s.loading, plans: true }, error: null }));
    try {
      const plans = await mockSubscriptionService.getAvailablePlans();
      set((s) => ({ plans, loading: { ...s.loading, plans: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, plans: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchSubscription: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, subscription: true }, error: null }));
    try {
      const subscription = await mockSubscriptionService.getSubscription(companyId);
      set((s) => ({ subscription, loading: { ...s.loading, subscription: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, subscription: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchCurrentPlan: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, plan: true }, error: null }));
    try {
      const currentPlan = await mockSubscriptionService.getCurrentPlan(companyId);
      set((s) => ({ currentPlan, loading: { ...s.loading, plan: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, plan: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchQuotas: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, quotas: true }, error: null }));
    try {
      const quotas = await mockSubscriptionService.getQuotas(companyId);
      set((s) => ({ quotas, loading: { ...s.loading, quotas: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, quotas: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchPaymentHistory: async (companyId, options = {}) => {
    set((s) => ({ loading: { ...s.loading, payments: true }, error: null }));
    try {
      const state = get();
      const page = options.page ?? state.paymentPagination.page;
      const perPage = options.perPage ?? state.paymentPagination.perPage;
      const result = await mockSubscriptionService.getPaymentHistory(companyId, { page, perPage });
      set((s) => ({
        paymentHistory: result.data,
        paymentPagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages },
        loading: { ...s.loading, payments: false },
      }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, payments: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  setPaymentPage: (page) => {
    set((s) => ({ paymentPagination: { ...s.paymentPagination, page } }));
  },

  fetchInvoices: async (companyId, options = {}) => {
    set((s) => ({ loading: { ...s.loading, invoices: true }, error: null }));
    try {
      const state = get();
      const page = options.page ?? state.invoicePagination.page;
      const perPage = options.perPage ?? state.invoicePagination.perPage;
      const result = await mockSubscriptionService.getInvoices(companyId, { page, perPage });
      set((s) => ({
        invoices: result.data,
        invoicePagination: { page: result.page, perPage: result.perPage, total: result.total, totalPages: result.totalPages },
        loading: { ...s.loading, invoices: false },
      }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, invoices: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  setInvoicePage: (page) => {
    set((s) => ({ invoicePagination: { ...s.invoicePagination, page } }));
  },

  fetchStats: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, stats: true }, error: null }));
    try {
      const stats = await mockSubscriptionService.getSubscriptionStats(companyId);
      set((s) => ({ stats, loading: { ...s.loading, stats: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, stats: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  requestPlanChange: async (companyId, newPlanId) => {
    set((s) => ({ loading: { ...s.loading, action: true }, error: null }));
    try {
      const result = await mockSubscriptionService.requestPlanChange(companyId, newPlanId);
      await get().fetchSubscription(companyId);
      await get().fetchCurrentPlan(companyId);
      await get().fetchQuotas(companyId);
      set((s) => ({ loading: { ...s.loading, action: false } }));
      toast.success(`Plan changé de ${result.oldPlan} vers ${result.newPlan}`);
      return result;
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, action: false }, error: err.message }));
      toast.error(err.message);
      return null;
    }
  },

  toggleAutoRenew: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, action: true }, error: null }));
    try {
      const sub = await mockSubscriptionService.toggleAutoRenew(companyId);
      set((s) => ({ subscription: sub, loading: { ...s.loading, action: false } }));
      toast.success(sub.autoRenew ? 'Renouvellement automatique activé' : 'Renouvellement automatique désactivé');
      return sub;
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, action: false }, error: err.message }));
      toast.error(err.message);
      return null;
    }
  },

  cancelSubscription: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, action: true }, error: null }));
    try {
      const sub = await mockSubscriptionService.cancelSubscription(companyId);
      set((s) => ({ subscription: sub, loading: { ...s.loading, action: false } }));
      toast.success('Abonnement annulé');
      return sub;
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, action: false }, error: err.message }));
      toast.error(err.message);
      return null;
    }
  },
}));

export default useSubscriptionStore;
