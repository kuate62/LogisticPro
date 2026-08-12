import { getRetraitData } from '../data/mockAgentData';

const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockRetraitService = {
  async getDashboardData(agentId) {
    await simulateDelay(600);
    return getRetraitData(agentId);
  },

  async getStats(agentId) {
    await simulateDelay(300);
    const { stats } = getRetraitData(agentId);
    return stats;
  },

  async getAvailableParcels(agentId) {
    await simulateDelay(500);
    const { availableParcels } = getRetraitData(agentId);
    return availableParcels;
  },

  async getRecentWithdrawals(agentId) {
    await simulateDelay(400);
    const { recentWithdrawals } = getRetraitData(agentId);
    return recentWithdrawals;
  },

  async getActivities(agentId) {
    await simulateDelay(300);
    const { activities } = getRetraitData(agentId);
    return activities;
  },

  async getNotifications(agentId) {
    await simulateDelay(200);
    const { notifications } = getRetraitData(agentId);
    return notifications;
  },

  async getAlerts(agentId) {
    await simulateDelay(200);
    const { alerts } = getRetraitData(agentId);
    return alerts;
  },
};
