import { useEffect, useCallback, useMemo } from 'react';
import useRetraitStore from '../store/useRetraitStore';

export function useRetraitDashboard(user) {
  const store = useRetraitStore();

  useEffect(() => {
    if (user?.id) {
      store.fetchDashboard(user);
    }
  }, [user?.id, user?.employeeId, user?.agencyId]);

  const refresh = useCallback(() => {
    if (user?.id) store.fetchDashboard(user);
  }, [user?.id, user?.employeeId, user?.agencyId]);

  const filteredParcels = useMemo(() => {
    const { search, filters } = store;
    return store.availableParcels.filter((p) => {
      const matchSearch = !search
        || p.trackingNumber?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filters.status || p.status === filters.status;
      return matchSearch && matchStatus;
    });
  }, [store.availableParcels, store.search, store.filters]);

  const unreadCount = store.notifications.filter((n) => !n.read).length;

  const formatCurrency = useCallback((val) => {
    return new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits: 0 }).format(val) + ' FC';
  }, []);

  const formatTime = useCallback((date) => {
    return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  }, []);

  const formatDate = useCallback((date) => {
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
  }, []);

  return {
    ...store,
    refresh,
    filteredParcels,
    unreadCount,
    formatCurrency,
    formatTime,
    formatDate,
  };
}

export default useRetraitDashboard;
