const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const planDB = [
  { id: 'plan_1', name: 'Starter', price: 25000, currency: 'FCFA', billingCycle: 'monthly', maxAgencies: 2, maxUsers: 5, maxStorage: 1, features: ['Gestion d\'agence', 'Suivi des colis', 'Rapports de base', 'Support par email'], description: 'Idéal pour les petites entreprises de livraison qui démarrent.', isActive: true },
  { id: 'plan_2', name: 'Business', price: 75000, currency: 'FCFA', billingCycle: 'monthly', maxAgencies: 10, maxUsers: 25, maxStorage: 5, features: ['Gestion multi-agences', 'Suivi des colis avancé', 'Rapports détaillés', 'Support prioritaire', 'API d\'intégration', 'Gestion des employés'], description: 'Pour les entreprises en croissance avec plusieurs agences.', isActive: true },
  { id: 'plan_3', name: 'Enterprise', price: 200000, currency: 'FCFA', billingCycle: 'monthly', maxAgencies: -1, maxUsers: -1, maxStorage: 50, features: ['Agences illimitées', 'Utilisateurs illimités', 'Suivi en temps réel', 'Rapports personnalisés', 'Support dédié 24/7', 'API complète', 'Gestion avancée des employés', 'Multi-entreprise'], description: 'La solution complète pour les grandes entreprises de logistique.', isActive: true },
];

let subscriptionDB = [
  { id: 'sub_001', companyId: 'comp_001', planId: 'plan_2', status: 'active', planName: 'Business', planPrice: 75000, currency: 'FCFA', billingCycle: 'monthly', startDate: '2025-07-01T00:00:00Z', endDate: '2026-07-01T00:00:00Z', nextBillingDate: '2026-07-01T00:00:00Z', paymentMethod: 'mobile_money_orange', autoRenew: true, createdAt: '2025-07-01T00:00:00Z' },
];

let quotaDB = [
  { companyId: 'comp_001', agencies: { used: 5, max: 10 }, users: { used: 18, max: 25 }, storage: { used: 3.2, max: 5, unit: 'GB' }, shipments: { used: 890, max: 5000, period: 'Mois en cours' } },
];

let paymentHistoryDB = [
  { id: 'sub_pay_001', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20250701-001', receiptNumber: 'SRV-001', paidAt: '2025-07-01T10:00:00Z', periodStart: '2025-07-01T00:00:00Z', periodEnd: '2025-08-01T00:00:00Z', createdAt: '2025-07-01T10:00:00Z' },
  { id: 'sub_pay_002', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20250801-002', receiptNumber: 'SRV-002', paidAt: '2025-08-01T09:30:00Z', periodStart: '2025-08-01T00:00:00Z', periodEnd: '2025-09-01T00:00:00Z', createdAt: '2025-08-01T09:30:00Z' },
  { id: 'sub_pay_003', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20250901-003', receiptNumber: 'SRV-003', paidAt: '2025-09-01T08:00:00Z', periodStart: '2025-09-01T00:00:00Z', periodEnd: '2025-10-01T00:00:00Z', createdAt: '2025-09-01T08:00:00Z' },
  { id: 'sub_pay_004', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'bank_transfer', status: 'paid', reference: 'SUB-20251001-004', receiptNumber: 'SRV-004', paidAt: '2025-10-01T11:00:00Z', periodStart: '2025-10-01T00:00:00Z', periodEnd: '2025-11-01T00:00:00Z', createdAt: '2025-10-01T11:00:00Z' },
  { id: 'sub_pay_005', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20251101-005', receiptNumber: 'SRV-005', paidAt: '2025-11-01T07:45:00Z', periodStart: '2025-11-01T00:00:00Z', periodEnd: '2025-12-01T00:00:00Z', createdAt: '2025-11-01T07:45:00Z' },
  { id: 'sub_pay_006', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20251201-006', receiptNumber: 'SRV-006', paidAt: '2025-12-01T10:15:00Z', periodStart: '2025-12-01T00:00:00Z', periodEnd: '2026-01-01T00:00:00Z', createdAt: '2025-12-01T10:15:00Z' },
  { id: 'sub_pay_007', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20260101-007', receiptNumber: 'SRV-007', paidAt: '2026-01-01T09:00:00Z', periodStart: '2026-01-01T00:00:00Z', periodEnd: '2026-02-01T00:00:00Z', createdAt: '2026-01-01T09:00:00Z' },
  { id: 'sub_pay_008', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20260201-008', receiptNumber: 'SRV-008', paidAt: '2026-02-01T08:30:00Z', periodStart: '2026-02-01T00:00:00Z', periodEnd: '2026-03-01T00:00:00Z', createdAt: '2026-02-01T08:30:00Z' },
  { id: 'sub_pay_009', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'bank_transfer', status: 'paid', reference: 'SUB-20260301-009', receiptNumber: 'SRV-009', paidAt: '2026-03-01T10:00:00Z', periodStart: '2026-03-01T00:00:00Z', periodEnd: '2026-04-01T00:00:00Z', createdAt: '2026-03-01T10:00:00Z' },
  { id: 'sub_pay_010', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20260401-010', receiptNumber: 'SRV-010', paidAt: '2026-04-01T07:00:00Z', periodStart: '2026-04-01T00:00:00Z', periodEnd: '2026-05-01T00:00:00Z', createdAt: '2026-04-01T07:00:00Z' },
  { id: 'sub_pay_011', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20260501-011', receiptNumber: 'SRV-011', paidAt: '2026-05-01T09:15:00Z', periodStart: '2026-05-01T00:00:00Z', periodEnd: '2026-06-01T00:00:00Z', createdAt: '2026-05-01T09:15:00Z' },
  { id: 'sub_pay_012', companyId: 'comp_001', planId: 'plan_2', planName: 'Business', amount: 75000, currency: 'FCFA', paymentMethod: 'mobile_money_orange', status: 'paid', reference: 'SUB-20260601-012', receiptNumber: 'SRV-012', paidAt: '2026-06-01T08:00:00Z', periodStart: '2026-06-01T00:00:00Z', periodEnd: '2026-07-01T00:00:00Z', createdAt: '2026-06-01T08:00:00Z' },
];

let invoiceDB = [
  { id: 'inv_001', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_001', invoiceNumber: 'FAC-20250701-001', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-07-01T10:00:00Z', dueDate: '2025-07-01T00:00:00Z', createdAt: '2025-07-01T10:00:00Z' },
  { id: 'inv_002', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_002', invoiceNumber: 'FAC-20250801-002', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-08-01T09:30:00Z', dueDate: '2025-08-01T00:00:00Z', createdAt: '2025-08-01T09:30:00Z' },
  { id: 'inv_003', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_003', invoiceNumber: 'FAC-20250901-003', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-09-01T08:00:00Z', dueDate: '2025-09-01T00:00:00Z', createdAt: '2025-09-01T08:00:00Z' },
  { id: 'inv_004', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_004', invoiceNumber: 'FAC-20251001-004', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-10-01T11:00:00Z', dueDate: '2025-10-01T00:00:00Z', createdAt: '2025-10-01T11:00:00Z' },
  { id: 'inv_005', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_005', invoiceNumber: 'FAC-20251101-005', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-11-01T07:45:00Z', dueDate: '2025-11-01T00:00:00Z', createdAt: '2025-11-01T07:45:00Z' },
  { id: 'inv_006', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_006', invoiceNumber: 'FAC-20251201-006', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2025-12-01T10:15:00Z', dueDate: '2025-12-01T00:00:00Z', createdAt: '2025-12-01T10:15:00Z' },
  { id: 'inv_007', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_007', invoiceNumber: 'FAC-20260101-007', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-01-01T09:00:00Z', dueDate: '2026-01-01T00:00:00Z', createdAt: '2026-01-01T09:00:00Z' },
  { id: 'inv_008', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_008', invoiceNumber: 'FAC-20260201-008', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-02-01T08:30:00Z', dueDate: '2026-02-01T00:00:00Z', createdAt: '2026-02-01T08:30:00Z' },
  { id: 'inv_009', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_009', invoiceNumber: 'FAC-20260301-009', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-03-01T10:00:00Z', dueDate: '2026-03-01T00:00:00Z', createdAt: '2026-03-01T10:00:00Z' },
  { id: 'inv_010', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_010', invoiceNumber: 'FAC-20260401-010', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-04-01T07:00:00Z', dueDate: '2026-04-01T00:00:00Z', createdAt: '2026-04-01T07:00:00Z' },
  { id: 'inv_011', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_011', invoiceNumber: 'FAC-20260501-011', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-05-01T09:15:00Z', dueDate: '2026-05-01T00:00:00Z', createdAt: '2026-05-01T09:15:00Z' },
  { id: 'inv_012', companyId: 'comp_001', subscriptionPaymentId: 'sub_pay_012', invoiceNumber: 'FAC-20260601-012', planName: 'Business', amount: 75000, taxRate: 0.18, taxAmount: 13500, totalAmount: 88500, status: 'paid', paidAt: '2026-06-01T08:00:00Z', dueDate: '2026-06-01T00:00:00Z', createdAt: '2026-06-01T08:00:00Z' },
];

function getByCompany(companyId) { return paymentHistoryDB.filter((p) => p.companyId === companyId); }

function paginate(items, page, perPage) {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  return { data: items.slice(start, start + perPage), page, perPage, total, totalPages };
}

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active', TRIAL: 'trial', PAST_DUE: 'past_due', CANCELLED: 'cancelled', EXPIRED: 'expired',
};

export const SUBSCRIPTION_STATUS_LABELS = {
  active: 'Actif', trial: 'Essai', past_due: 'En retard', cancelled: 'Annulé', expired: 'Expiré',
};

export const SUBSCRIPTION_STATUS_COLORS = {
  active: 'success', trial: 'info', past_due: 'warning', cancelled: 'danger', expired: 'secondary',
};

export const PAYMENT_METHOD_LABELS = {
  mobile_money_orange: 'Orange Money', mobile_money_mtn: 'MTN Mobile Money',
  card: 'Carte bancaire', bank_transfer: 'Virement bancaire',
};

export const mockSubscriptionService = {
  async getAvailablePlans() {
    await simulateDelay(300);
    return planDB.filter((p) => p.isActive);
  },

  async getSubscription(companyId) {
    await simulateDelay(300);
    return subscriptionDB.find((s) => s.companyId === companyId && s.status !== 'cancelled') || null;
  },

  async getCurrentPlan(companyId) {
    await simulateDelay(250);
    const sub = subscriptionDB.find((s) => s.companyId === companyId && s.status !== 'cancelled');
    if (!sub) return null;
    return planDB.find((p) => p.id === sub.planId) || null;
  },

  async getQuotas(companyId) {
    await simulateDelay(250);
    const quota = quotaDB.find((q) => q.companyId === companyId);
    if (!quota) return null;
    const sub = subscriptionDB.find((s) => s.companyId === companyId && s.status !== 'cancelled');
    if (sub) {
      const plan = planDB.find((p) => p.id === sub.planId);
      if (plan) {
        return {
          ...quota,
          agencies: { ...quota.agencies, max: plan.maxAgencies },
          users: { ...quota.users, max: plan.maxUsers },
          storage: { ...quota.storage, max: plan.maxStorage },
        };
      }
    }
    return quota;
  },

  async getPaymentHistory(companyId, { page = 1, perPage = 10 } = {}) {
    await simulateDelay(350);
    const items = getByCompany(companyId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return paginate(items, page, perPage);
  },

  async getInvoices(companyId, { page = 1, perPage = 10 } = {}) {
    await simulateDelay(350);
    const items = invoiceDB.filter((inv) => inv.companyId === companyId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return paginate(items, page, perPage);
  },

  async requestPlanChange(companyId, newPlanId) {
    await simulateDelay(600);
    const plan = planDB.find((p) => p.id === newPlanId);
    if (!plan) throw new Error('Plan non trouvé');
    const subIdx = subscriptionDB.findIndex((s) => s.companyId === companyId && s.status !== 'cancelled');
    if (subIdx === -1) throw new Error('Abonnement non trouvé');
    const oldSub = subscriptionDB[subIdx];
    subscriptionDB = subscriptionDB.map((s, i) => i === subIdx ? {
      ...s, planId: plan.id, planName: plan.name, planPrice: plan.price, currency: plan.currency,
      status: 'active',
    } : s);
    return { oldPlan: oldSub.planName, newPlan: plan.name, effectiveDate: new Date().toISOString() };
  },

  async toggleAutoRenew(companyId) {
    await simulateDelay(300);
    const subIdx = subscriptionDB.findIndex((s) => s.companyId === companyId && s.status !== 'cancelled');
    if (subIdx === -1) throw new Error('Abonnement non trouvé');
    subscriptionDB = subscriptionDB.map((s, i) => i === subIdx ? { ...s, autoRenew: !s.autoRenew } : s);
    return subscriptionDB[subIdx];
  },

  async cancelSubscription(companyId) {
    await simulateDelay(500);
    const subIdx = subscriptionDB.findIndex((s) => s.companyId === companyId && s.status !== 'cancelled');
    if (subIdx === -1) throw new Error('Abonnement non trouvé');
    subscriptionDB = subscriptionDB.map((s, i) => i === subIdx ? { ...s, status: 'cancelled', autoRenew: false } : s);
    return subscriptionDB[subIdx];
  },

  async getSubscriptionStats(companyId) {
    await simulateDelay(300);
    const sub = subscriptionDB.find((s) => s.companyId === companyId && s.status !== 'cancelled');
    const payments = getByCompany(companyId);
    const paidPayments = payments.filter((p) => p.status === 'paid');
    const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
    const monthsActive = paidPayments.length;
    const startDate = sub ? new Date(sub.startDate) : null;
    const now = new Date();
    const daysSinceStart = startDate ? Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) : 0;
    return {
      totalPaid, monthsActive, daysSinceStart,
      nextPaymentDate: sub?.nextBillingDate || null,
      nextPaymentAmount: sub?.planPrice || 0,
      planName: sub?.planName || 'Aucun',
      currency: sub?.currency || 'FCFA',
      status: sub?.status || 'inactive',
      autoRenew: sub?.autoRenew || false,
    };
  },
};
