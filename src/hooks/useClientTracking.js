import useClientTrackingStore from '../store/useClientTrackingStore';

export function useClientTracking() {
  const store = useClientTrackingStore();
  return store;
}

export default useClientTracking;
