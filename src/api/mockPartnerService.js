import { partnerApplicationsDB, PARTNER_APPLICATION_STATUS } from '../data/mockPartnerData';

const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const mockPartnerService = {
  async submitPartnerApplication(data) {
    await simulateDelay(800);
    const reference = `PART-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-3)}`;
    const application = {
      id: `app_${Date.now()}`,
      reference,
      companyName: data.companyName,
      contactEmail: data.email,
      managerName: `${data.managerFirstName} ${data.managerLastName}`,
      managerEmail: data.managerEmail,
      plan: data.planName || 'Starter',
      status: PARTNER_APPLICATION_STATUS,
      createdAt: new Date().toISOString(),
      data,
    };
    partnerApplicationsDB.unshift(application);
    return { ...application };
  },

  async getPartnerApplications() {
    await simulateDelay(300);
    return partnerApplicationsDB.map((app) => ({ ...app })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
};
