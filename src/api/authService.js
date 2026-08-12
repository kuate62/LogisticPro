import apiClient from "./axios.js";

export const authService = {
  login: (credentials) => { return apiClient.post('/auth/login', credentials); },

  register: (data) => { return apiClient.post('/auth/register', data); },

  logout: () => { return apiClient.post('/auth/logout'); },

  refreshToken: () => { return apiClient.post('/auth/refresh'); },

  forgotPassword: (email) => { return apiClient.post('/auth/forgot-password', { email }); },

  verifyResetCode: ({ email, code }) => { return apiClient.post('/auth/verify-reset-code', { email, code }); },

  resetPassword: (data) => { return apiClient.post('/auth/reset-password', data); },

  verifyEmail: (code) => { return apiClient.post('/auth/verify-email', { code }); },

  regenerateCode: () => { return apiClient.post('/auth/regenerate-code'); },

  changePassword: (data) => { return apiClient.post('/auth/change-password', data); },

  getProfile: () => { return apiClient.get('/auth/profile'); },

  getCurrentUser: () => { return apiClient.get('/auth/me'); },
};
