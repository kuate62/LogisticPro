import { getDepotData } from '../data/mockAgentData';

const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockDepotService = {
  async getDashboardData(agentId) {
    await simulateDelay(600);
    return getDepotData(agentId);
  },

  async getStats(agentId) {
    await simulateDelay(300);
    const { stats } = getDepotData(agentId);
    return stats;
  },

  async getShipments(agentId) {
    await simulateDelay(500);
    const { shipments } = getDepotData(agentId);
    return shipments;
  },

  async getParcels(agentId) {
    await simulateDelay(400);
    const { parcels } = getDepotData(agentId);
    return parcels;
  },

  async getActivities(agentId) {
    await simulateDelay(300);
    const { activities } = getDepotData(agentId);
    return activities;
  },

  async getPayments(agentId) {
    await simulateDelay(300);
    const { payments } = getDepotData(agentId);
    return payments;
  },

  async getNotifications(agentId) {
    await simulateDelay(200);
    const { notifications } = getDepotData(agentId);
    return notifications;
  },
};
