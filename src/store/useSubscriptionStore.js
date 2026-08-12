import { create } from 'zustand';
import { subscriptionsService } from '../api/subscriptionsService';
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
      const plans = await subscriptionsService.getPlans();
      set((s) => ({ plans, loading: { ...s.loading, plans: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, plans: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchSubscription: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, subscription: true }, error: null }));
    try {
      const subscription = await subscriptionsService.getByCompany(companyId);
      set((s) => ({ subscription, loading: { ...s.loading, subscription: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, subscription: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchCurrentPlan: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, plan: true }, error: null }));
    try {
      const subscription = await subscriptionsService.getByCompany(companyId);
      set((s) => ({
        subscription,
        currentPlan: subscription?.planDetail || null,
        loading: { ...s.loading, plan: false },
      }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, plan: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  fetchQuotas: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, quotas: true }, error: null }));
    try {
      const subscription = await subscriptionsService.getByCompany(companyId);
      let quotas = null;
      if (subscription) {
        const usage = await subscriptionsService.getUsage(subscription.id);
        quotas = usage.quotas;
      }
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
      const subscription = await subscriptionsService.getByCompany(companyId);
      let result = { data: [], page, perPage, total: 0, totalPages: 0 };
      if (subscription) {
        result = await subscriptionsService.getPayments(subscription.id, { page, perPage });
      }
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
      const subscription = await subscriptionsService.getByCompany(companyId);
      let result = { data: [], page, perPage, total: 0, totalPages: 0 };
      if (subscription) {
        result = await subscriptionsService.getInvoices(subscription.id, { page, perPage });
      }
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
      const subscription = await subscriptionsService.getByCompany(companyId);
      let stats = null;
      if (subscription) {
        const paymentsResult = await subscriptionsService.getPayments(subscription.id, { page: 1, perPage: 100 });
        const paidPayments = paymentsResult.data.filter((p) => p.status === 'paid');
        const totalPaid = paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        const startDate = subscription.startDate ? new Date(subscription.startDate) : null;
        const daysSinceStart = startDate ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
        stats = {
          totalPaid,
          monthsActive: paidPayments.length,
          daysSinceStart,
          nextPaymentDate: subscription.nextBillingDate || null,
          nextPaymentAmount: subscription.planDetail?.price || 0,
          planName: subscription.planDetail?.name || subscription.plan || 'Aucun',
          currency: subscription.planDetail?.currency || 'FCFA',
          status: subscription.status || 'inactive',
          autoRenew: subscription.autoRenew ?? false,
        };
      }
      set((s) => ({ stats, loading: { ...s.loading, stats: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, stats: false }, error: err.message }));
      toast.error(err.message);
    }
  },

  requestPlanChange: async (companyId, newPlanId) => {
    set((s) => ({ loading: { ...s.loading, action: true }, error: null }));
    try {
      const current = await subscriptionsService.getByCompany(companyId);
      let updated;
      if (current) {
        updated = await subscriptionsService.update(current.id, { plan: newPlanId });
      } else {
        updated = await subscriptionsService.create(companyId, { plan: newPlanId });
      }
      await get().fetchSubscription(companyId);
      await get().fetchCurrentPlan(companyId);
      await get().fetchQuotas(companyId);
      set((s) => ({ loading: { ...s.loading, action: false } }));
      toast.success(`Plan changé vers ${updated.planLabel || updated.plan}`);
      return { oldPlan: current?.plan || null, newPlan: updated.plan };
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, action: false }, error: err.message }));
      toast.error(err.message);
      return null;
    }
  },

  toggleAutoRenew: async (companyId) => {
    set((s) => ({ loading: { ...s.loading, action: true }, error: null }));
    try {
      const current = await subscriptionsService.getByCompany(companyId);
      if (!current) throw new Error('Aucun abonnement actif');
      const sub = await subscriptionsService.update(current.id, { autoRenew: !current.autoRenew });
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
      const current = await subscriptionsService.getByCompany(companyId);
      let sub = null;
      if (current) {
        sub = await subscriptionsService.update(current.id, { status: 'cancelled', autoRenew: false });
      }
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
