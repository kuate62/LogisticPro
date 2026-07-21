import { useCallback } from 'react';
import useAgencyStore from '../store/useAgencyStore';
import { useAuth } from './useAuth';

export function useAgencyFilters() {
  const { filters, setFilters, resetFilters, cities, regions } = useAgencyStore();
  const { companyId } = useAuth();

  const setStatus = useCallback((status) => {
    setFilters({ status });
  }, [setFilters]);

  const setCity = useCallback((city) => {
    setFilters({ city });
  }, [setFilters]);

  const setRegion = useCallback((region) => {
    setFilters({ region });
  }, [setFilters]);

  const setIsPrimary = useCallback((isPrimary) => {
    setFilters({ isPrimary });
  }, [setFilters]);

  const setManager = useCallback((manager) => {
    setFilters({ manager });
  }, [setFilters]);

  const activeFilterCount = [
    filters.status,
    filters.city,
    filters.region,
    filters.isPrimary,
    filters.manager,
  ].filter((v) => v !== '' && v !== null && v !== undefined).length;

  return {
    filters,
    cities,
    regions,
    setStatus,
    setCity,
    setRegion,
    setIsPrimary,
    setManager,
    resetFilters,
    activeFilterCount,
    companyId,
  };
}

export default useAgencyFilters;
