import { useEffect, useCallback } from 'react';
import useClientShipmentStore from '../store/useClientShipmentStore';

export function useClientShipment(id) {
  const shipmentStore = useClientShipmentStore();

  const load = useCallback(async () => {
    if (id) await shipmentStore.fetchShipment(id);
  }, [id]);

  useEffect(() => {
    load();
  }, [id]);

  const clear = useCallback(() => {
    shipmentStore.clearSelected();
  }, []);

  return {
    shipment: shipmentStore.selectedShipment,
    parcels: shipmentStore.selectedShipment?.parcels || [],
    loading: shipmentStore.loading,
    error: shipmentStore.error,
    refresh: load,
    clear,
  };
}

export default useClientShipment;
