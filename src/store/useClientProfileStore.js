import { create } from 'zustand';
import { clientsService } from '../api/clientsService';
import { agenciesService } from '../api/agenciesService';
import { authService } from '../api/authService';
import { mockProfileService } from '../api/mockProfileService';
import { resolveFileUrl } from '../utils/fileUrl';

const normalizeAgency = (a) => {
  if (!a) return a;
  let hours = a.hours;
  if (hours && typeof hours === 'object' && !Array.isArray(hours)) {
    hours = [hours.open, hours.close].filter(Boolean);
  }
  return { ...a, hours };
};

const normalizeClient = (client) => {
  if (!client) return client;
  if (client.avatar && client.avatar !== resolveFileUrl(client.avatar)) {
    return { ...client, avatar: resolveFileUrl(client.avatar) };
  }
  return client;
};

const useClientProfileStore = create((set) => ({
  profile: null,
  company: null,
  preferredAgency: null,
  agencies: [],
  companies: [],
  preferences: null,
  security: null,
  loading: false,
  saving: false,
  error: null,

  fetchProfile: async (clientId) => {
    set({ loading: true, error: null });
    try {
      const [client, mock] = await Promise.all([
        clientsService.getMe(),
        mockProfileService.get(clientId),
      ]);

      let agencies = [];
      try {
        if (client?.companyId) {
          const agResult = await agenciesService.getAll(client.companyId, { perPage: 1000 });
          agencies = agResult.data || [];
        }
      } catch {
        agencies = [];
      }

      set({
        profile: normalizeClient(client),
        company: client?.company || null,
        preferredAgency: normalizeAgency(client?.preferredAgency),
        agencies,
        companies: mock.companies || [],
        preferences: mock.preferences || null,
        security: mock.security || null,
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  updateProfile: async (clientId, data) => {
    set({ saving: true, error: null });
    try {
      const payload = {
        ...data,
        preferredAgencyId: data.preferredAgencyId ? Number(data.preferredAgencyId) : null,
      };
      const client = await clientsService.updateMe(payload);
      const preferredAgency = normalizeAgency(client?.preferredAgency);
      set((s) => ({
        profile: normalizeClient(client),
        company: client?.company || s.company,
        preferredAgency,
        saving: false,
      }));
      return { success: true, profile: client };
    } catch (err) {
      set({ saving: false, error: err.response?.data?.message || err.message });
      return null;
    }
  },

  changePassword: async (clientId, data) => {
    set({ saving: true, error: null });
    try {
      const result = await authService.changePassword(data);
      set({ saving: false });
      return result.data;
    } catch (err) {
      set({ saving: false, error: err.response?.data?.message || err.message });
      return null;
    }
  },

  setPreferences: (preferences) => set((s) => ({ preferences: { ...s.preferences, ...preferences } })),
  updatePreference: (key, value) => set((s) => ({
    preferences: s.preferences ? { ...s.preferences, [key]: value } : s.preferences,
  })),

  uploadAvatar: async (clientId, file) => {
    set({ saving: true, error: null });
    try {
      const result = await clientsService.uploadAvatar(file);
      set((s) => ({
        profile: s.profile ? { ...s.profile, avatar: resolveFileUrl(result.avatar) } : s.profile,
        saving: false,
      }));
      return result;
    } catch (err) {
      set({ saving: false, error: err.response?.data?.message || err.message });
      return null;
    }
  },

  removeAvatar: async () => {
    set({ saving: true, error: null });
    try {
      const client = await clientsService.updateMe({ avatar: null });
      set((s) => ({
        profile: s.profile ? { ...s.profile, avatar: null } : s.profile,
        saving: false,
      }));
      return { success: true, profile: client };
    } catch (err) {
      set({ saving: false, error: err.response?.data?.message || err.message });
      return null;
    }
  },

  reset: () => set({ profile: null, company: null, preferredAgency: null, error: null }),
}));

export default useClientProfileStore;
