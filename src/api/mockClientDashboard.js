import { getClientData } from '../data/mockClientData';

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const mockClientDashboardService = {
  async getDashboardData(clientId) {
    await delay(600);
    return getClientData(clientId);
  },

  async getStats(clientId) {
    await delay(300);
    return getClientData(clientId).stats;
  },

  async getShipments(clientId) {
    await delay(400);
    return getClientData(clientId).shipments;
  },

  async getParcels(clientId) {
    await delay(400);
    return getClientData(clientId).parcels;
  },

  async getPayments(clientId) {
    await delay(300);
    return getClientData(clientId).payments;
  },

  async getNotifications(clientId) {
    await delay(200);
    return getClientData(clientId).notifications;
  },

  async getActivities(clientId) {
    await delay(300);
    return getClientData(clientId).activities;
  },

  async getFrequentDestinations(clientId) {
    await delay(200);
    return getClientData(clientId).frequentDestinations;
  },

  async getFrequentAgencies(clientId) {
    await delay(200);
    return getClientData(clientId).frequentAgencies;
  },
};
