import { useCallback } from 'react';
import useTrackingStore from '../store/useTrackingStore';
import useAuthStore from '../store/useAuthStore';

export function useTracking() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { trackings, loading, error, pagination, search, filters, sort, fetchTrackings, setSearch, setFilters, setSort, setPagination } = useTrackingStore();

  const loadTrackings = useCallback((options) => {
    if (!companyId) return;
    return fetchTrackings(companyId, options);
  }, [companyId, fetchTrackings]);

  const updateSearch = useCallback((newSearch) => {
    setSearch(newSearch);
    if (companyId) fetchTrackings(companyId, { search: newSearch, page: 1 });
  }, [companyId, fetchTrackings, setSearch]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    if (companyId) fetchTrackings(companyId, { filters: newFilters, page: 1 });
  }, [companyId, fetchTrackings, setFilters]);

  const updateSort = useCallback((newSort) => {
    setSort(newSort);
    if (companyId) fetchTrackings(companyId, { sort: newSort });
  }, [companyId, fetchTrackings, setSort]);

  const goToPage = useCallback((page) => {
    setPagination({ page });
    if (companyId) fetchTrackings(companyId, { page });
  }, [companyId, fetchTrackings, setPagination]);

  return { trackings, loading, error, pagination, search, filters, sort, loadTrackings, updateSearch, updateFilters, updateSort, goToPage };
}

export function useTrackingDetail() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { currentTracking, loading, error, fetchTrackingById, fetchTrackingByNumber, updateStatus, clearCurrent } = useTrackingStore();

  const loadTracking = useCallback((id) => {
    if (!companyId) return;
    return fetchTrackingById(companyId, id);
  }, [companyId, fetchTrackingById]);

  const loadByNumber = useCallback((number) => {
    if (!companyId) return;
    return fetchTrackingByNumber(companyId, number);
  }, [companyId, fetchTrackingByNumber]);

  const updateTrackingStatus = useCallback((id, data) => {
    if (!companyId) return;
    return updateStatus(companyId, id, data);
  }, [companyId, updateStatus]);

  return { currentTracking, loading, error, loadTracking, loadByNumber, updateTrackingStatus, clearCurrent };
}

export function useTrackingStats() {
  const { trackings, pagination } = useTrackingStore();

  const byStatus = trackings.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const total = pagination.total;

  return { trackings, byStatus, total };
}
