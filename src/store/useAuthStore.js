import { create } from 'zustand';
import { AUTH_STATUS, STORAGE_KEYS } from '../config/constants';
import { authService } from '../api/authService';
import { normalizeUser } from '../utils/normalizeUser';
import apiClient from '../api/axios';


const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  status: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ? AUTH_STATUS.LOADING : AUTH_STATUS.UNAUTHENTICATED,
  error: null,

  login: async (credentials) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.login(credentials);
      const token = response.data.token;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      const currentUser = await authService.getCurrentUser();
      set({ token, user: normalizeUser(currentUser.data), status: AUTH_STATUS.AUTHENTICATED, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  register: async (data) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.register(data);
      if (response.data?.token) {
        const token = response.data.token;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        set({ token, user: normalizeUser(response.data.user), status: AUTH_STATUS.AUTHENTICATED, error: null });
      } else {
        set({ status: AUTH_STATUS.UNAUTHENTICATED, error: null });
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      set({ status: AUTH_STATUS.ERROR, error: errorMessage });
    }
  },

  forgotPassword: async (email) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.forgotPassword(email);
      set({ status: AUTH_STATUS.IDLE, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  resetPassword: async (data) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.resetPassword(data);
      set({ status: AUTH_STATUS.IDLE, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  verifyResetCode: async (data) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.verifyResetCode(data);
      set({ status: AUTH_STATUS.IDLE, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  verifyEmail: async (code) => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.verifyEmail(code);
      set({ status: AUTH_STATUS.AUTHENTICATED, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  regenerateCode: async () => {
    set({ status: AUTH_STATUS.LOADING, error: null });
    try {
      const response = await authService.regenerateCode();
      set({ status: AUTH_STATUS.IDLE, error: null });
      return response.data;
    } catch (err) {
      set({ status: AUTH_STATUS.ERROR, error: err.message });
      throw err;
    }
  },

  checkAuth: async () => {
    const { initApp } = get();
    return initApp();
  },

  clearError: () => {
    set({ error: null });
  },

  logout: () => {
    /*AuthService.logout()*/
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    set({ token: null, status: AUTH_STATUS.UNAUTHENTICATED, error: null });
  },
  findMe: async () => {
    set({ status: AUTH_STATUS.LOADING })
    try {
      const response = await authService.getCurrentUser()
      set({ user: normalizeUser(response.data), status: AUTH_STATUS.AUTHENTICATED, error: null })
    }
    finally {
      set({ status: AUTH_STATUS.IDLE, error: null })
    }
  },
  initApp: async () => {
    set({ status: AUTH_STATUS.LOADING, error: null })

    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        const response = await authService.getCurrentUser()
        set({ user: normalizeUser(response.data), status: AUTH_STATUS.AUTHENTICATED, error: null })
        return response.data;
      } catch (err) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        set({ token: null, user: null, status: AUTH_STATUS.UNAUTHENTICATED, error: null })
        console.log(err)
        return null;
      }
    }

    set({ status: AUTH_STATUS.UNAUTHENTICATED, error: null })
    return null;
  }



}));

export default useAuthStore;
