import { useCallback, useEffect } from 'react';
import usePortalTrackingStore from '../store/usePortalTrackingStore';

export function usePortalTracking() {
  const { result, timeline, history, loading, error, searched, searchByNumber, loadHistory, clearHistory, reset } = usePortalTrackingStore();

  const search = useCallback((trackingNumber) => {
    return searchByNumber(trackingNumber);
  }, [searchByNumber]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return { result, timeline, history, loading, error, searched, search, clearHistory, reset };
}

export function useTrackingSearch() {
  const { loading, error, searched, search, reset } = usePortalTracking();
  return { loading, error, searched, search, reset };
}

export function useTrackingTimeline() {
  const { timeline } = usePortalTracking();
  const latestEvent = timeline.length > 0 ? timeline[0] : null;
  const eventCount = timeline.length;
  return { timeline, latestEvent, eventCount };
}

export function useTrackingHistory() {
  const { history, clearHistory } = usePortalTracking();
  return { history, clearHistory, hasHistory: history.length > 0 };
}
