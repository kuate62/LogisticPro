import { useEffect, useCallback } from 'react';
import useShipmentStore from '../store/useShipmentStore';
import { useAuth } from './useAuth';

export function useShipments() {
  const { companyId } = useAuth();
  const {
    shipments, loading, error, search, filters, sort, pagination,
    fetchShipments, setSearch, setFilters, resetFilters, setSort, setPage,
  } = useShipmentStore();

  useEffect(() => { if (companyId) fetchShipments(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchShipments]);

  return {
    shipments, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchShipments(companyId), [companyId, fetchShipments]),
  };
}

export function useShipment() {
  const { companyId } = useAuth();
  const { selectedShipment, history, loading, error, fetchShipmentDetail, fetchHistory, clearSelected } = useShipmentStore();

  return {
    shipment: selectedShipment, history, loading, error,
    fetch: useCallback((id) => fetchShipmentDetail(companyId, id), [companyId, fetchShipmentDetail]),
    fetchHistory: useCallback((id) => fetchHistory(companyId, id), [companyId, fetchHistory]),
    clearSelected,
  };
}

export function useShipmentForm() {
  const { companyId } = useAuth();
  const { createShipment, updateShipment, cancelShipment, archiveShipment, updateShipmentStatus } = useShipmentStore();

  return {
    create: useCallback((data) => createShipment(companyId, data), [companyId, createShipment]),
    update: useCallback((id, data) => updateShipment(companyId, id, data), [companyId, updateShipment]),
    cancel: useCallback((id) => cancelShipment(companyId, id), [companyId, cancelShipment]),
    archive: useCallback((id) => archiveShipment(companyId, id), [companyId, archiveShipment]),
    updateStatus: useCallback((id, status) => updateShipmentStatus(companyId, id, status), [companyId, updateShipmentStatus]),
  };
}

export function useShipmentWizard() {
  const {
    wizard, setWizard, setWizardStep, resetWizard,
    addWizardPackage, updateWizardPackage, removeWizardPackage, getWizardTotals,
  } = useShipmentStore();

  return {
    wizard, setWizard, setWizardStep, resetWizard,
    addWizardPackage, updateWizardPackage, removeWizardPackage, getWizardTotals,
  };
}

export function useShipmentStatistics() {
  const { companyId } = useAuth();
  const { statistics, loading, fetchStatistics } = useShipmentStore();

  useEffect(() => { if (companyId) fetchStatistics(companyId); }, [companyId, fetchStatistics]);

  return { statistics, loading: loading.stats };
}
