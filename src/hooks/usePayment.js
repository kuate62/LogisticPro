import { useCallback } from 'react';
import usePaymentStore from '../store/usePaymentStore';
import useAuthStore from '../store/useAuthStore';

export function usePayments() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { payments, loading, error, pagination, search, filters, sort, fetchPayments, setSearch, setFilters, setSort, setPagination } = usePaymentStore();

  const loadPayments = useCallback((options) => {
    if (!companyId) return;
    return fetchPayments(companyId, options);
  }, [companyId, fetchPayments]);

  const updateSearch = useCallback((newSearch) => {
    setSearch(newSearch);
    if (companyId) fetchPayments(companyId, { search: newSearch, page: 1 });
  }, [companyId, fetchPayments, setSearch]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    if (companyId) fetchPayments(companyId, { filters: newFilters, page: 1 });
  }, [companyId, fetchPayments, setFilters]);

  const updateSort = useCallback((newSort) => {
    setSort(newSort);
    if (companyId) fetchPayments(companyId, { sort: newSort });
  }, [companyId, fetchPayments, setSort]);

  const goToPage = useCallback((page) => {
    setPagination({ page });
    if (companyId) fetchPayments(companyId, { page });
  }, [companyId, fetchPayments, setPagination]);

  return { payments, loading, error, pagination, search, filters, sort, loadPayments, updateSearch, updateFilters, updateSort, goToPage };
}

export function usePaymentDetail() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { currentPayment, paymentHistory, loading, error, fetchPaymentById, fetchHistory, createPayment, updatePayment, cancelPayment, clearCurrent } = usePaymentStore();

  const loadPayment = useCallback((id) => {
    if (!companyId) return;
    return fetchPaymentById(companyId, id);
  }, [companyId, fetchPaymentById]);

  const loadHistory = useCallback((paymentId) => {
    if (!companyId) return;
    return fetchHistory(companyId, paymentId);
  }, [companyId, fetchHistory]);

  const addPayment = useCallback((data) => {
    if (!companyId) return;
    return createPayment(companyId, data);
  }, [companyId, createPayment]);

  const editPayment = useCallback((id, data) => {
    if (!companyId) return;
    return updatePayment(companyId, id, data);
  }, [companyId, updatePayment]);

  const deletePayment = useCallback((id) => {
    if (!companyId) return;
    return cancelPayment(companyId, id);
  }, [companyId, cancelPayment]);

  return { currentPayment, paymentHistory, loading, error, loadPayment, loadHistory, addPayment, editPayment, deletePayment, clearCurrent };
}

export function usePaymentStats() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { statistics, fetchStatistics } = usePaymentStore();

  const loadStats = useCallback(() => {
    if (!companyId) return;
    return fetchStatistics(companyId);
  }, [companyId, fetchStatistics]);

  return { statistics, loadStats };
}
