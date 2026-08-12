import { useEffect, useCallback } from 'react';
import useClientPaymentStore from '../store/useClientPaymentStore';

export function useClientPayment(id) {
  const store = useClientPaymentStore();

  const load = useCallback(() => {
    if (id) store.fetchDetails(id);
  }, [id]);

  useEffect(() => {
    load();
  }, [id]);

  const clear = useCallback(() => {
    store.clearSelected();
  }, []);

  return {
    details: store.details,
    payment: store.selectedPayment,
    loading: store.loading,
    error: store.error,
    refresh: load,
    clear,
  };
}

export default useClientPayment;
