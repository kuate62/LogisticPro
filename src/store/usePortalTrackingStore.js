import { create } from 'zustand';
import { mockPortalTrackingService } from '../api/mockPortalTracking';
import toast from 'react-hot-toast';

const usePortalTrackingStore = create((set) => ({
  result: null,
  timeline: [],
  history: [],
  loading: false,
  error: null,
  searched: false,

  searchByNumber: async (trackingNumber) => {
    set({ loading: true, error: null });
    try {
      const result = await mockPortalTrackingService.searchByNumber(trackingNumber);
      const timeline = await mockPortalTrackingService.getTimeline(trackingNumber);
      await mockPortalTrackingService.addToHistory(trackingNumber, result.status);
      const history = await mockPortalTrackingService.getHistory();
      set({ result, timeline, history, loading: false, searched: true });
      return result;
    } catch (err) {
      set({ result: null, timeline: [], loading: false, error: err.message, searched: true });
      return null;
    }
  },

  loadHistory: async () => {
    try {
      const history = await mockPortalTrackingService.getHistory();
      set({ history });
    } catch {
      // silent
    }
  },

  clearHistory: async () => {
    try {
      const history = await mockPortalTrackingService.clearHistory();
      set({ history });
      toast.success('Historique effacé');
    } catch {
      // silent
    }
  },

  reset: () => set({ result: null, timeline: [], error: null, searched: false }),
}));

export default usePortalTrackingStore;
