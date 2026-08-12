import { create } from 'zustand';
import { mockPartnerService } from '../api/mockPartnerService';
import { partnerRequestsService } from '../api/partnerRequestsService';

const usePartnerStore = create((set) => ({
  selectedPlan: null,
  application: null,
  loading: false,
  error: null,

  selectPlan: (plan) => set({ selectedPlan: plan }),

  submitApplication: async (data, plan) => {
    set({ loading: true, error: null });
    try {
      let application;
      try {
        application = await partnerRequestsService.submit({
          ...data,
          planName: plan?.name || 'Starter',
        });
      } catch {
        application = await mockPartnerService.submitPartnerApplication({
          ...data,
          planName: plan?.name || 'Starter',
        });
      }
      set({ application, loading: false });
      return application;
    } catch (err) {
      set({ loading: false, error: err.message });
      return null;
    }
  },

  resetApplication: () => set({ application: null, selectedPlan: null, error: null }),
}));

export default usePartnerStore;
