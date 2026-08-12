import { getClientProfile, getAgencies, getCompanies } from '../data/mockClientData';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const mockProfileService = {
  async get(clientId) {
    await delay(450);
    const { client, company, preferredAgency } = getClientProfile(clientId);
    return {
      profile: client,
      company,
      preferredAgency,
      agencies: getAgencies(),
      companies: getCompanies(),
      preferences: {
        language: 'fr',
        notificationsEmail: true,
        notificationsSms: true,
        notificationsPush: false,
        newsletter: true,
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
        loginHistory: [
          { id: 'lh_1', device: 'Chrome / Windows', location: 'Douala, Cameroun', ip: '41.202.160.5', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'success' },
          { id: 'lh_2', device: 'Mobile App / Android', location: 'Douala, Cameroun', ip: '41.202.160.12', date: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), status: 'success' },
          { id: 'lh_3', device: 'Chrome / Windows', location: 'Douala, Cameroun', ip: '41.202.160.5', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), status: 'success' },
        ],
      },
    };
  },
};

export default mockProfileService;
