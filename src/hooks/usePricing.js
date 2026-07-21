import { useEffect, useCallback } from 'react';
import usePricingStore from '../store/usePricingStore';
import { useAuth } from './useAuth';

export function usePricings() {
  const { companyId } = useAuth();
  const {
    pricings, loading, error, search, filters, sort, pagination,
    fetchPricings, setSearch, setFilters, resetFilters, setSort, setPage,
  } = usePricingStore();

  useEffect(() => { if (companyId) fetchPricings(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchPricings]);

  return {
    pricings, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchPricings(companyId), [companyId, fetchPricings]),
  };
}

export function usePricing() {
  const { companyId } = useAuth();
  const { selectedPricing, history, loading, error, fetchPricingDetail, fetchHistory, clearSelected } = usePricingStore();

  return {
    pricing: selectedPricing, history, loading, error,
    fetch: useCallback((id) => fetchPricingDetail(companyId, id), [companyId, fetchPricingDetail]),
    fetchHistory: useCallback((id) => fetchHistory(companyId, id), [companyId, fetchHistory]),
    clearSelected,
  };
}

export function usePricingForm() {
  const { companyId } = useAuth();
  const { createPricing, updatePricing, activatePricing, deactivatePricing, duplicatePricing } = usePricingStore();

  return {
    create: useCallback((data) => createPricing(companyId, data), [companyId, createPricing]),
    update: useCallback((id, data) => updatePricing(companyId, id, data), [companyId, updatePricing]),
    activate: useCallback((id) => activatePricing(companyId, id), [companyId, activatePricing]),
    deactivate: useCallback((id) => deactivatePricing(companyId, id), [companyId, deactivatePricing]),
    duplicate: useCallback((id) => duplicatePricing(companyId, id), [companyId, duplicatePricing]),
  };
}

export function usePricingCalculation() {
  const { companyId } = useAuth();
  const { calculation, loading, calculatePricing } = usePricingStore();

  return {
    calculation, loading: loading.calc,
    calculate: useCallback((params) => calculatePricing(companyId, params), [companyId, calculatePricing]),
  };
}
