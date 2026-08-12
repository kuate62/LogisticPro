import { useEffect, useCallback, useMemo } from 'react';
import useDepotStore from '../store/useDepotStore';

export function useDepotDashboard(user) {
  const store = useDepotStore();

  useEffect(() => {
    if (user?.id) {
      store.fetchDashboard(user);
    }
  }, [user?.id, user?.employeeId, user?.agencyId]);

  const refresh = useCallback(() => {
    if (user?.id) store.fetchDashboard(user);
  }, [user?.id, user?.employeeId, user?.agencyId]);

  const filteredShipments = useMemo(() => {
    const { search, filters } = store;
    return store.shipments.filter((s) => {
      const matchSearch = !search
        || s.reference?.toLowerCase().includes(search.toLowerCase())
        || s.senderName?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filters.status || s.status === filters.status;
      const matchDest = !filters.destination || s.destination === filters.destination;
      return matchSearch && matchStatus && matchDest;
    });
  }, [store.shipments, store.search, store.filters]);

  const unreadCount = store.notifications.filter((n) => !n.read).length;
  const recentActivities = store.activities.slice(0, 10);

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
    filteredShipments,
    unreadCount,
    recentActivities,
    formatCurrency,
    formatTime,
    formatDate,
  };
}

export default useDepotDashboard;
