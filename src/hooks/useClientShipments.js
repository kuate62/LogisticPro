import { useEffect, useMemo, useCallback } from 'react';
import useClientShipmentStore from '../store/useClientShipmentStore';
import { CLIENT_STATUS_LABELS } from '../data/mockClientData';

export function useClientShipments(clientId) {
  const store = useClientShipmentStore();

  useEffect(() => {
    if (clientId) store.fetchShipments(clientId);
  }, [clientId]);

  const refresh = useCallback(() => {
    if (clientId) store.fetchShipments(clientId);
  }, [clientId]);

  const filteredShipments = useMemo(() => {
    const { search, filters, sort } = store;
    let list = store.shipments.slice();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        s.reference?.toLowerCase().includes(q)
        || s.destinataire?.name?.toLowerCase().includes(q)
        || s.expediteur?.name?.toLowerCase().includes(q)
        || s.paymentReference?.toLowerCase().includes(q)
      );
    }
    if (filters.status) list = list.filter((s) => s.status === filters.status);
    if (filters.destination) list = list.filter((s) => s.destination === filters.destination);

    const { field, direction } = sort;
    list.sort((a, b) => {
      let va = a[field];
      let vb = b[field];
      if (field === 'createdAt' || field === 'estimatedDeliveryDate') {
        va = new Date(va).getTime();
        vb = new Date(vb).getTime();
      }
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return direction === 'asc' ? -1 : 1;
      if (va > vb) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [store.shipments, store.search, store.filters, store.sort]);

  const destinations = useMemo(() => {
    return [...new Set(store.shipments.map((s) => s.destination).filter(Boolean))].sort();
  }, [store.shipments]);

  const statusOptions = useMemo(() => Object.keys(CLIENT_STATUS_LABELS), []);

  return { ...store, refresh, filteredShipments, destinations, statusOptions };
}

export default useClientShipments;
