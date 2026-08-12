import { useEffect, useCallback } from 'react';
import useClientParcelStore from '../store/useClientParcelStore';

export function useClientParcel(id) {
  const store = useClientParcelStore();

  const load = useCallback(() => {
    if (id) store.fetchParcel(id);
  }, [id]);

  useEffect(() => {
    load();
  }, [id]);

  const clear = useCallback(() => {
    store.clearSelected();
  }, []);

  return {
    parcel: store.selectedParcel,
    loading: store.loading,
    error: store.error,
    refresh: load,
    clear,
  };
}

export default useClientParcel;
