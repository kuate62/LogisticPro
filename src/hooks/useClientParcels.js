import { useEffect, useMemo, useCallback } from 'react';
import useClientParcelStore from '../store/useClientParcelStore';

export function useClientParcels(clientId) {
  const store = useClientParcelStore();

  useEffect(() => {
    if (clientId) store.fetchParcels(clientId);
  }, [clientId]);

  const refresh = useCallback(() => {
    if (clientId) store.fetchParcels(clientId);
  }, [clientId]);

  const filteredParcels = useMemo(() => {
    const { search, filters, sort } = store;
    let list = store.parcels.slice();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.trackingNumber?.toLowerCase().includes(q)
        || p.category?.toLowerCase().includes(q)
        || p.destinataire?.name?.toLowerCase().includes(q)
      );
    }
    if (filters.status) list = list.filter((p) => p.status === filters.status);
    if (filters.category) list = list.filter((p) => p.category === filters.category);

    const { field, direction } = sort;
    list.sort((a, b) => {
      let va = a[field];
      let vb = b[field];
      if (va === undefined && vb === undefined) return 0;
      if (va === undefined) return 1;
      if (vb === undefined) return -1;
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return direction === 'asc' ? -1 : 1;
      if (va > vb) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [store.parcels, store.search, store.filters, store.sort]);

  const categories = useMemo(() => {
    return [...new Set(store.parcels.map((p) => p.category).filter(Boolean))].sort();
  }, [store.parcels]);

  return { ...store, refresh, filteredParcels, categories };
}

export default useClientParcels;
