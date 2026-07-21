import { useEffect, useCallback } from 'react';
import useDashboardStore from '../store/useDashboardStore';
import { useAuth } from './useAuth';

export function useDashboard() {
  const store = useDashboardStore();
  const { user } = useAuth();
  const companyId = user?.companyId || 'default';

  useEffect(() => {
    store.fetchAll(companyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const refresh = useCallback(() => {
    store.fetchAll(companyId);
  }, [companyId, store]);

  const unreadCount = store.notifications.filter((n) => !n.read).length;
  const criticalAlerts = store.alerts.filter((a) => a.severity === 'danger' || a.severity === 'warning');

  const formatCurrency = useCallback((val) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(val) + ' FC';
  }, []);

  const formatDate = useCallback((date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  }, []);

  const formatTime = useCallback((date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  }, []);

  return {
    ...store,
    companyId,
    refresh,
    unreadCount,
    criticalAlerts,
    formatCurrency,
    formatDate,
    formatTime,
  };
}

export default useDashboard;
