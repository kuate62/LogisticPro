import { useEffect, useMemo, useCallback } from 'react';
import useClientPaymentStore from '../store/useClientPaymentStore';
import { CLIENT_METHOD_LABELS } from '../data/mockClientData';

export function useClientPayments(clientId) {
  const store = useClientPaymentStore();

  useEffect(() => {
    if (clientId) store.fetchPayments(clientId);
  }, [clientId]);

  const refresh = useCallback(() => {
    if (clientId) store.fetchPayments(clientId);
  }, [clientId]);

  const filteredPayments = useMemo(() => {
    const { search, filters, sort } = store;
    let list = store.payments.slice();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.reference?.toLowerCase().includes(q)
        || p.shipmentReference?.toLowerCase().includes(q)
        || p.agencyName?.toLowerCase().includes(q)
      );
    }
    if (filters.status) list = list.filter((p) => p.status === filters.status);
    if (filters.method) list = list.filter((p) => p.method === filters.method);

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
  }, [store.payments, store.search, store.filters, store.sort]);

  const methodOptions = useMemo(() => Object.keys(CLIENT_METHOD_LABELS), []);

  return { ...store, refresh, filteredPayments, methodOptions };
}

export default useClientPayments;
