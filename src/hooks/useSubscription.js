import { useEffect, useCallback } from 'react';
import useSubscriptionStore from '../store/useSubscriptionStore';
import { useAuth } from './useAuth';

export function useSubscriptionPlans() {
  const { plans, loading, error, fetchPlans } = useSubscriptionStore();

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  return {
    plans, loading: loading.plans, error,
    refresh: useCallback(() => fetchPlans(), [fetchPlans]),
  };
}

export function useSubscription() {
  const { companyId } = useAuth();
  const {
    subscription, currentPlan, quotas, loading, error,
    fetchSubscription, fetchCurrentPlan, fetchQuotas,
  } = useSubscriptionStore();

  useEffect(() => {
    if (companyId) {
      fetchSubscription(companyId);
      fetchCurrentPlan(companyId);
      fetchQuotas(companyId);
    }
  }, [companyId, fetchSubscription, fetchCurrentPlan, fetchQuotas]);

  return {
    subscription, currentPlan, quotas,
    loading: { subscription: loading.subscription, plan: loading.plan, quotas: loading.quotas },
    error,
    refresh: useCallback(() => {
      if (companyId) {
        fetchSubscription(companyId);
        fetchCurrentPlan(companyId);
        fetchQuotas(companyId);
      }
    }, [companyId, fetchSubscription, fetchCurrentPlan, fetchQuotas]),
  };
}

export function useSubscriptionPayments() {
  const { companyId } = useAuth();
  const {
    paymentHistory, paymentPagination, loading, error,
    fetchPaymentHistory, setPaymentPage,
  } = useSubscriptionStore();

  useEffect(() => {
    if (companyId) fetchPaymentHistory(companyId);
  }, [companyId, paymentPagination.page, fetchPaymentHistory]);

  return {
    payments: paymentHistory,
    pagination: paymentPagination,
    loading: loading.payments,
    error,
    setPage: useCallback((page) => {
      setPaymentPage(page);
      if (companyId) fetchPaymentHistory(companyId, { page });
    }, [companyId, setPaymentPage, fetchPaymentHistory]),
    refresh: useCallback(() => {
      if (companyId) fetchPaymentHistory(companyId, { page: 1 });
    }, [companyId, fetchPaymentHistory]),
  };
}

export function useSubscriptionInvoices() {
  const { companyId } = useAuth();
  const {
    invoices, invoicePagination, loading, error,
    fetchInvoices, setInvoicePage,
  } = useSubscriptionStore();

  useEffect(() => {
    if (companyId) fetchInvoices(companyId);
  }, [companyId, invoicePagination.page, fetchInvoices]);

  return {
    invoices,
    pagination: invoicePagination,
    loading: loading.invoices,
    error,
    setPage: useCallback((page) => {
      setInvoicePage(page);
      if (companyId) fetchInvoices(companyId, { page });
    }, [companyId, setInvoicePage, fetchInvoices]),
    refresh: useCallback(() => {
      if (companyId) fetchInvoices(companyId, { page: 1 });
    }, [companyId, fetchInvoices]),
  };
}

export function useSubscriptionActions() {
  const { companyId } = useAuth();
  const {
    loading,
    requestPlanChange, toggleAutoRenew, cancelSubscription,
  } = useSubscriptionStore();

  return {
    loading: loading.action,
    requestPlanChange: useCallback((newPlanId) => requestPlanChange(companyId, newPlanId), [companyId, requestPlanChange]),
    toggleAutoRenew: useCallback(() => toggleAutoRenew(companyId), [companyId, toggleAutoRenew]),
    cancelSubscription: useCallback(() => cancelSubscription(companyId), [companyId, cancelSubscription]),
  };
}

export function useSubscriptionStats() {
  const { companyId } = useAuth();
  const { stats, loading, fetchStats } = useSubscriptionStore();

  useEffect(() => { if (companyId) fetchStats(companyId); }, [companyId, fetchStats]);

  return {
    stats,
    loading: loading.stats,
    refresh: useCallback(() => {
      if (companyId) fetchStats(companyId);
    }, [companyId, fetchStats]),
  };
}
