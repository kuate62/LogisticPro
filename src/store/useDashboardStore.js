import { create } from 'zustand';
import { mockDashboardService } from '../api/mockDashboard';

const useDashboardStore = create((set) => ({
  kpis: null,
  charts: null,
  activity: [],
  notifications: [],
  packageAlerts: [],
  activeRoutes: [],
  recentPayments: [],
  agencyPerformance: [],
  employeePerformance: [],
  agenda: [],
  subscription: null,
  alerts: [],
  loading: {
    kpis: false,
    charts: false,
    activity: false,
    notifications: false,
    packageAlerts: false,
    activeRoutes: false,
    recentPayments: false,
    agencyPerformance: false,
    employeePerformance: false,
    agenda: false,
    subscription: false,
    alerts: false,
  },
  errors: {},

  setLoading: (key, val) => set((s) => ({ loading: { ...s.loading, [key]: val } })),
  setError: (key, val) => set((s) => ({ errors: { ...s.errors, [key]: val } })),

  fetchSection: async (key, fetcher, companyId) => {
    set((s) => ({ loading: { ...s.loading, [key]: true }, errors: { ...s.errors, [key]: null } }));
    try {
      const data = await fetcher(companyId);
      set((s) => ({ [key]: data, loading: { ...s.loading, [key]: false } }));
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, [key]: false }, errors: { ...s.errors, [key]: err.message } }));
    }
  },

  fetchAll: async (companyId) => {
    set((s) => ({
      loading: Object.keys(s.loading).reduce((a, k) => ({ ...a, [k]: true }), {}),
      errors: {},
    }));
    try {
      const data = await mockDashboardService.getAll(companyId);
      set({
        kpis: data.kpis,
        charts: data.charts,
        activity: data.activity,
        notifications: data.notifications,
        packageAlerts: data.packageAlerts,
        activeRoutes: data.activeRoutes,
        recentPayments: data.recentPayments,
        agencyPerformance: data.agencyPerformance,
        employeePerformance: data.employeePerformance,
        agenda: data.agenda,
        subscription: data.subscription,
        alerts: data.alerts,
        loading: { kpis: false, charts: false, activity: false, notifications: false, packageAlerts: false, activeRoutes: false, recentPayments: false, agencyPerformance: false, employeePerformance: false, agenda: false, subscription: false, alerts: false },
      });
    } catch (err) {
      set((s) => ({
        loading: Object.keys(s.loading).reduce((a, k) => ({ ...a, [k]: false }), {}),
        errors: Object.keys(s.loading).reduce((a, k) => ({ ...a, [k]: err.message }), {}),
      }));
    }
  },

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),

  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true })),
  })),
}));

export default useDashboardStore;
