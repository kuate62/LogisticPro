import { create } from 'zustand';
import { AUTH_STATUS, STORAGE_KEYS } from '../config/constants';
import { mockAuthService } from '../api/mockAuth';

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (stored && token) {
      return JSON.parse(stored);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
  return null;
};

const useAuthStore = create((set, get) => ({
  user: getStoredUser(),
  status: getStoredUser() ? AUTH_STATUS.AUTHENTICATED : AUTH_STATUS.UNAUTHENTICATED,
  error: null,

  isLoading: () => get().status === AUTH_STATUS.LOADING,

  isAuthenticated: () => get().status === AUTH_STATUS.AUTHENTICATED,

  login: async (credentials) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const { user } = await mockAuthService.login(credentials);
      set({ user, status: AUTH_STATUS.AUTHENTICATED, error: null });
      return user;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  register: async (data) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const { user } = await mockAuthService.register(data);
      set({ user, status: AUTH_STATUS.AUTHENTICATED, error: null });
      return user;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  logout: async () => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      await mockAuthService.logout();
    } finally {
      set({ user: null, status: AUTH_STATUS.UNAUTHENTICATED, error: null });
    }
  },

  forgotPassword: async (email) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const result = await mockAuthService.forgotPassword(email);
      set({ status: AUTH_STATUS.UNAUTHENTICATED });
      return result;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  resetPassword: async (data) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const result = await mockAuthService.resetPassword(data);
      set({ status: AUTH_STATUS.UNAUTHENTICATED });
      return result;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  checkAuth: async () => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      set({ user: null, status: AUTH_STATUS.UNAUTHENTICATED });
      return null;
    }
    set({ status: AUTH_STATUS.LOADING });
    try {
      const { user } = await mockAuthService.getCurrentUser();
      set({ user, status: AUTH_STATUS.AUTHENTICATED, error: null });
      return user;
    } catch {
      set({ user: null, status: AUTH_STATUS.UNAUTHENTICATED, error: null });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
