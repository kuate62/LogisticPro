import { useEffect, useCallback } from 'react';
import useRouteStore from '../store/useRouteStore';
import { useAuth } from './useAuth';

export function useRoutes() {
  const { companyId } = useAuth();
  const {
    routes, loading, error, search, filters, sort, pagination,
    fetchRoutes, setSearch, setFilters, resetFilters, setSort, setPage,
  } = useRouteStore();

  useEffect(() => { if (companyId) fetchRoutes(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchRoutes]);

  return {
    routes, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchRoutes(companyId), [companyId, fetchRoutes]),
  };
}

export function useRoute() {
  const { companyId } = useAuth();
  const { selectedRoute, history, loading, error, fetchRouteDetail, fetchHistory, clearSelected } = useRouteStore();

  return {
    route: selectedRoute, history, loading, error,
    fetch: useCallback((id) => fetchRouteDetail(companyId, id), [companyId, fetchRouteDetail]),
    fetchHistory: useCallback((id) => fetchHistory(companyId, id), [companyId, fetchHistory]),
    clearSelected,
  };
}

export function useRouteForm() {
  const { companyId } = useAuth();
  const { createRoute, updateRoute, cancelRoute } = useRouteStore();

  return {
    create: useCallback((data) => createRoute(companyId, data), [companyId, createRoute]),
    update: useCallback((id, data) => updateRoute(companyId, id, data), [companyId, updateRoute]),
    cancel: useCallback((id) => cancelRoute(companyId, id), [companyId, cancelRoute]),
  };
}

export function useRouteCapacity() {
  const { companyId } = useAuth();
  const { selectedRoute, assignShipment, removeShipment } = useRouteStore();

  const capacity = selectedRoute ? {
    maxWeight: selectedRoute.maxWeight,
    usedWeight: selectedRoute.usedWeight,
    remainingWeight: Math.max(0, selectedRoute.maxWeight - selectedRoute.usedWeight),
    maxPackages: selectedRoute.maxPackages,
    usedPackages: selectedRoute.usedPackages,
    remainingPackages: Math.max(0, selectedRoute.maxPackages - selectedRoute.usedPackages),
    weightPercentage: selectedRoute.maxWeight > 0 ? Math.round((selectedRoute.usedWeight / selectedRoute.maxWeight) * 100) : 0,
    packagesPercentage: selectedRoute.maxPackages > 0 ? Math.round((selectedRoute.usedPackages / selectedRoute.maxPackages) * 100) : 0,
    isFull: selectedRoute.usedWeight >= selectedRoute.maxWeight || selectedRoute.usedPackages >= selectedRoute.maxPackages,
  } : null;

  return {
    capacity,
    assign: useCallback((routeId, shipment) => assignShipment(companyId, routeId, shipment), [companyId, assignShipment]),
    remove: useCallback((routeId, shipmentId) => removeShipment(companyId, routeId, shipmentId), [companyId, removeShipment]),
  };
}

export function useRouteStatistics() {
  const { companyId } = useAuth();
  const { statistics, loading, fetchStatistics } = useRouteStore();

  useEffect(() => { if (companyId) fetchStatistics(companyId); }, [companyId, fetchStatistics]);

  return { statistics, loading: loading.stats };
}
