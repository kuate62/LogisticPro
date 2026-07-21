import { useEffect, useCallback } from 'react';
import useAgencyStore from '../store/useAgencyStore';
import { useAuth } from './useAuth';
import { formatAgencyPhone, formatAgencyCurrency, formatAgencyDate, getAgencyStatusColor, formatAgencyStatus } from '../helpers/agencyFormatters';

export function useAgency() {
  const store = useAgencyStore();
  const { user } = useAuth();
  const companyId = user?.companyId || 'default';

  useEffect(() => {
    store.fetchAgencies(companyId);
    store.fetchCounts(companyId);
    store.fetchCities(companyId);
    store.fetchRegions(companyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, store.search, JSON.stringify(store.filters), JSON.stringify(store.sort), store.pagination.page]);

  const refresh = useCallback(() => {
    store.fetchAgencies(companyId);
    store.fetchCounts(companyId);
  }, [companyId, store]);

  return {
    ...store,
    companyId,
    refresh,
    formatPhone: formatAgencyPhone,
    formatCurrency: formatAgencyCurrency,
    formatDate: formatAgencyDate,
    getStatusColor: getAgencyStatusColor,
    getStatusLabel: formatAgencyStatus,
  };
}

export default useAgency;
