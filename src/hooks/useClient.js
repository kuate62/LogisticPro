import { useEffect, useCallback } from 'react';
import useClientStore from '../store/useClientStore';
import { useAuth } from './useAuth';

export function useClients() {
  const { companyId } = useAuth();
  const {
    clients, counts, loading, error, search, filters, sort, pagination,
    fetchClients, fetchCounts, setSearch, setFilters, resetFilters, setSort, setPage,
  } = useClientStore();

  useEffect(() => { if (companyId) fetchClients(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchClients]);
  useEffect(() => { if (companyId) fetchCounts(companyId); }, [companyId, fetchCounts]);

  return {
    clients, counts, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchClients(companyId), [companyId, fetchClients]),
  };
}

export function useClient() {
  const { companyId } = useAuth();
  const {
    selectedClient, history, documents, photos, loading, error,
    fetchClientDetail, fetchHistory, fetchDocuments, fetchPhotos, clearSelected,
  } = useClientStore();

  return {
    client: selectedClient, history, documents, photos, loading, error,
    fetch: useCallback((id) => fetchClientDetail(companyId, id), [companyId, fetchClientDetail]),
    fetchHistory: useCallback((id) => fetchHistory(companyId, id), [companyId, fetchHistory]),
    fetchDocuments: useCallback((id) => fetchDocuments(companyId, id), [companyId, fetchDocuments]),
    fetchPhotos: useCallback((id) => fetchPhotos(companyId, id), [companyId, fetchPhotos]),
    clearSelected,
  };
}

export function useClientForm() {
  const { companyId } = useAuth();
  const { createClient, updateClient, archiveClient, activateClient, deactivateClient, blockClient } = useClientStore();

  return {
    create: useCallback((data) => createClient(companyId, data), [companyId, createClient]),
    update: useCallback((clientId, data) => updateClient(companyId, clientId, data), [companyId, updateClient]),
    archive: useCallback((clientId) => archiveClient(companyId, clientId), [companyId, archiveClient]),
    activate: useCallback((clientId) => activateClient(companyId, clientId), [companyId, activateClient]),
    deactivate: useCallback((clientId) => deactivateClient(companyId, clientId), [companyId, deactivateClient]),
    block: useCallback((clientId) => blockClient(companyId, clientId), [companyId, blockClient]),
  };
}

export function useClientStatistics() {
  const { companyId } = useAuth();
  const { statistics, loading, fetchStatistics } = useClientStore();

  useEffect(() => { if (companyId) fetchStatistics(companyId); }, [companyId, fetchStatistics]);

  return { statistics, loading: loading.stats };
}
