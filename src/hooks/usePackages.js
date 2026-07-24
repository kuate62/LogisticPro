import { useEffect, useCallback } from 'react';
import usePackageStore from '../store/usePackageStore';
import { useAuth } from './useAuth';

export function usePackages() {
  const { companyId } = useAuth();
  const {
    packages, loading, error, search, filters, sort, pagination,
    fetchPackages, setSearch, setFilters, resetFilters, setSort, setPage,
  } = usePackageStore();

  useEffect(() => { if (companyId) fetchPackages(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchPackages]);

  return {
    packages, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchPackages(companyId), [companyId, fetchPackages]),
  };
}

export function usePackage() {
  const { companyId } = useAuth();
  const { selectedPackage, history, payments, invoices, loading, error, fetchPackageDetail, fetchHistory, fetchPayments, fetchInvoices, clearSelected } = usePackageStore();

  return {
    pkg: selectedPackage, history, payments, invoices, loading, error,
    fetch: useCallback((id) => fetchPackageDetail(companyId, id), [companyId, fetchPackageDetail]),
    fetchHistory: useCallback((id) => fetchHistory(companyId, id), [companyId, fetchHistory]),
    fetchPayments: useCallback((id) => fetchPayments(companyId, id), [companyId, fetchPayments]),
    fetchInvoices: useCallback((id) => fetchInvoices(companyId, id), [companyId, fetchInvoices]),
    clearSelected,
  };
}

export function usePackageForm() {
  const { companyId } = useAuth();
  const { createPackage, updatePackageStatus, cancelPackage } = usePackageStore();

  return {
    create: useCallback((data) => createPackage(companyId, data), [companyId, createPackage]),
    updateStatus: useCallback((id, status) => updatePackageStatus(companyId, id, status), [companyId, updatePackageStatus]),
    cancel: useCallback((id) => cancelPackage(companyId, id), [companyId, cancelPackage]),
  };
}

export function usePackageStatistics() {
  const { companyId } = useAuth();
  const { statistics, loading, fetchStatistics } = usePackageStore();

  useEffect(() => { if (companyId) fetchStatistics(companyId); }, [companyId, fetchStatistics]);

  return { statistics, loading: loading.stats };
}
