const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const now = new Date();
const fmt = (d) => d.toISOString();
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const subHours = (d, n) => { const r = new Date(d); r.setHours(r.getHours() - n); return r; };

function getCompanyData() {
  return {
    kpis: {
      totalPackages: 1247,
      pendingPackages: 38,
      transitPackages: 64,
      deliveredToday: 23,
      shipmentsToday: 5,
      totalCustomers: 312,
      activeAgencies: 4,
      activeRoutes: 7,
      revenueToday: 2850000,
      revenueMonth: 78450000,
      prevRevenueToday: 2420000,
      prevRevenueMonth: 71200000,
      prevTotalPackages: 1180,
      prevTransitPackages: 52,
    },
    charts: {
      expeditionEvolution: [
        { month: 'Jan', expeditions: 145, colis: 520 },
        { month: 'Fév', expeditions: 168, colis: 610 },
        { month: 'Mar', expeditions: 192, colis: 705 },
        { month: 'Avr', expeditions: 178, colis: 648 },
        { month: 'Mai', expeditions: 210, colis: 780 },
        { month: 'Jun', expeditions: 235, colis: 862 },
        { month: 'Jul', expeditions: 198, colis: 724 },
        { month: 'Aoû', expeditions: 222, colis: 810 },
        { month: 'Sep', expeditions: 248, colis: 905 },
        { month: 'Oct', expeditions: 260, colis: 948 },
        { month: 'Nov', expeditions: 245, colis: 890 },
        { month: 'Déc', expeditions: 275, colis: 1012 },
      ],
      revenueEvolution: [
        { month: 'Jan', revenue: 5200000 },
        { month: 'Fév', revenue: 6100000 },
        { month: 'Mar', revenue: 7200000 },
        { month: 'Avr', revenue: 6800000 },
        { month: 'Mai', revenue: 8100000 },
        { month: 'Jun', revenue: 9200000 },
        { month: 'Jul', revenue: 7800000 },
        { month: 'Aoû', revenue: 8500000 },
        { month: 'Sep', revenue: 9800000 },
        { month: 'Oct', revenue: 10200000 },
        { month: 'Nov', revenue: 9500000 },
        { month: 'Déc', revenue: 11000000 },
      ],
      packageStatus: [
        { name: 'En attente', value: 38, color: '#F59E0B' },
        { name: 'Enregistré', value: 45, color: '#0EA5E9' },
        { name: 'En transit', value: 64, color: '#2563EB' },
        { name: 'Arrivé', value: 31, color: '#16A34A' },
        { name: 'Disponible', value: 18, color: '#16A34A' },
        { name: 'Annulé', value: 8, color: '#DC2626' },
      ],
      paymentMethods: [
        { name: 'Espèces', value: 45, color: '#16A34A' },
        { name: 'Mobile Money', value: 32, color: '#2563EB' },
        { name: 'Virement', value: 15, color: '#0EA5E9' },
        { name: 'Carte', value: 8, color: '#F59E0B' },
      ],
      topDestinations: [
        { city: 'Yaoundé', packages: 187 },
        { city: 'Bamenda', packages: 142 },
        { city: 'Maroua', packages: 118 },
        { city: 'Garoua', packages: 96 },
        { city: 'Kribi', packages: 84 },
        { city: 'Bafoussam', packages: 72 },
      ],
    },
    activity: [
      { id: 'act_1', type: 'shipment', title: 'Expédition #EXP-2024-0847 créée', user: 'Marie Kabila', time: subHours(now, 1), icon: 'truck' },
      { id: 'act_2', type: 'package', title: 'Colis #PKG-9847 enregistré', user: 'Sarah Mbuyi', time: subHours(now, 2), icon: 'package' },
      { id: 'act_3', type: 'payment', title: 'Paiement de 450 000 FC reçu', user: 'Patrick Lukusa', time: subHours(now, 3), icon: 'credit-card' },
      { id: 'act_4', type: 'delivery', title: 'Colis #PKG-9812 livré à Yaoundé', user: 'Agent transport', time: subHours(now, 4), icon: 'check-circle' },
      { id: 'act_5', type: 'customer', title: 'Nouveau client: Entreprise Mutombo', user: 'Marie Kabila', time: subHours(now, 5), icon: 'users' },
      { id: 'act_6', type: 'route', title: 'Trajet Douala → Yaoundé créé', user: 'Patrick Lukusa', time: subHours(now, 6), icon: 'route' },
      { id: 'act_7', type: 'package', title: 'Colis #PKG-9835 signalé endommagé', user: 'Sarah Mbuyi', time: subHours(now, 7), icon: 'alert-triangle' },
      { id: 'act_8', type: 'shipment', title: 'Expédition #EXP-2024-0846 clôturée', user: 'Marie Kabila', time: subHours(now, 8), icon: 'truck' },
    ],
    notifications: [
      { id: 'notif_1', type: 'warning', title: 'Paiement en attente', message: '3 paiements en attente de validation', time: subHours(now, 1), read: false },
      { id: 'notif_2', type: 'danger', title: 'Colis en retard', message: '5 colis dépassent le délai prévu', time: subHours(now, 2), read: false },
      { id: 'notif_3', type: 'info', title: 'Mise à jour disponible', message: 'Version 2.1.0 disponible', time: subHours(now, 5), read: true },
      { id: 'notif_4', type: 'warning', title: 'Abonnement expirant', message: 'Votre forfait expire dans 12 jours', time: subHours(now, 24), read: true },
      { id: 'notif_5', type: 'success', title: 'Livraison effectuée', message: '12 colis livrés aujourd\'hui', time: subHours(now, 3), read: false },
    ],
    packageAlerts: [
      { id: 'pkg_alert_1', tracking: 'PKG-9784', status: 'delayed', destination: 'Maroua', daysLate: 3, recipient: 'Entreprise Kalonji' },
      { id: 'pkg_alert_2', tracking: 'PKG-9801', status: 'blocked', destination: 'Bamenda', daysLate: 1, recipient: 'Martin Tshisekedi' },
      { id: 'pkg_alert_3', tracking: 'PKG-9835', status: 'damaged', destination: 'Garoua', daysLate: 0, recipient: 'Société Bakenga' },
      { id: 'pkg_alert_4', tracking: 'PKG-9812', status: 'unclaimed', destination: 'Yaoundé', daysLate: 5, recipient: 'Paul Kabongo' },
      { id: 'pkg_alert_5', tracking: 'PKG-9856', status: 'no_route', destination: 'Kribi', daysLate: 0, recipient: 'Jean Mudumbi' },
    ],
    activeRoutes: [
      { id: 'route_1', from: 'Douala', to: 'Yaoundé', departure: '06:00', packages: 24, capacity: 30, status: 'in_transit', vehicle: 'Camion T6' },
      { id: 'route_2', from: 'Douala', to: 'Bamenda', departure: '07:30', packages: 18, capacity: 25, status: 'in_transit', vehicle: 'Camion T3' },
      { id: 'route_3', from: 'Douala', to: 'Maroua', departure: '05:00', packages: 12, capacity: 20, status: 'arrived', vehicle: 'Camion T1' },
      { id: 'route_4', from: 'Yaoundé', to: 'Garoua', departure: '08:00', packages: 8, capacity: 15, status: 'departed', vehicle: 'Camion T5' },
      { id: 'route_5', from: 'Douala', to: 'Kribi', departure: '09:00', packages: 0, capacity: 20, status: 'scheduled', vehicle: 'Camion T2' },
    ],
    recentPayments: [
      { id: 'pay_1', client: 'Entreprise Kalonji', amount: 450000, method: 'mobile_money', status: 'completed', date: subHours(now, 1) },
      { id: 'pay_2', client: 'Société Bakenga', amount: 320000, method: 'cash', status: 'completed', date: subHours(now, 3) },
      { id: 'pay_3', client: 'Martin Tshisekedi', amount: 180000, method: 'bank_transfer', status: 'pending', date: subHours(now, 5) },
      { id: 'pay_4', client: 'Paul Kabongo', amount: 560000, method: 'mobile_money', status: 'completed', date: subHours(now, 8) },
      { id: 'pay_5', client: 'Entreprise Mutombo', amount: 275000, method: 'card', status: 'pending', date: subHours(now, 10) },
    ],
    agencyPerformance: [
      { id: 'ag_1', name: 'Agence Centrale Douala', packages: 487, revenue: 28500000, customers: 142, shipments: 89, punctuality: 94 },
      { id: 'ag_2', name: 'Agence Yaoundé', packages: 312, revenue: 18200000, customers: 98, shipments: 62, punctuality: 91 },
      { id: 'ag_3', name: 'Agence Bamenda', packages: 248, revenue: 14800000, customers: 76, shipments: 48, punctuality: 88 },
      { id: 'ag_4', name: 'Agence Maroua', packages: 200, revenue: 11950000, customers: 54, shipments: 41, punctuality: 85 },
    ],
    employeePerformance: [
      { id: 'emp_1', name: 'Sarah Mbuyi', role: 'Agent comptoir', shipments: 34, payments: 28, customers: 19, packages: 156 },
      { id: 'emp_2', name: 'David Kasongo', role: 'Agent collecte', shipments: 29, payments: 12, customers: 24, packages: 132 },
      { id: 'emp_3', name: 'Grace Mwamba', role: 'Agent comptoir', shipments: 26, payments: 22, customers: 15, packages: 118 },
      { id: 'emp_4', name: 'Joseph Lungila', role: 'Chauffeur', shipments: 22, payments: 0, customers: 0, packages: 198 },
    ],
    agenda: [
      { id: 'agenda_1', type: 'route', title: 'Départ Douala → Yaoundé', time: '06:00', status: 'done' },
      { id: 'agenda_2', type: 'route', title: 'Départ Douala → Bamenda', time: '07:30', status: 'active' },
      { id: 'agenda_3', type: 'shipment', title: 'Expédition #EXP-0848 à clôturer', time: '10:00', status: 'pending' },
      { id: 'agenda_4', type: 'payment', title: 'Rappel: facture Société Bakenga', time: '14:00', status: 'pending' },
      { id: 'agenda_5', type: 'route', title: 'Départ Douala → Kribi', time: '09:00', status: 'pending' },
    ],
    subscription: {
      plan: 'Professional',
      renewalDate: fmt(subDays(now, -12)),
      maxUsers: 15,
      usedUsers: 8,
      maxAgencies: 5,
      usedAgencies: 4,
      storageTotal: 50,
      storageUsed: 18.4,
      status: 'active',
    },
    alerts: [
      { id: 'alert_1', type: 'subscription', severity: 'warning', title: 'Abonnement expirant', message: 'Votre forfait expire dans 12 jours', time: subHours(now, 24) },
      { id: 'alert_2', type: 'route', severity: 'danger', title: 'Trajet annulé', message: 'Le trajet Douala → Bafoussam a été annulé', time: subHours(now, 6) },
      { id: 'alert_3', type: 'api', severity: 'info', title: 'Maintenance prévue', message: 'Maintenance serveur ce soir de 22h à 02h', time: subHours(now, 2) },
    ],
  };
}

export const mockDashboardService = {
  async getKPIs(companyId) {
    await simulateDelay(600);
    return getCompanyData(companyId).kpis;
  },

  async getCharts(companyId) {
    await simulateDelay(800);
    return getCompanyData(companyId).charts;
  },

  async getActivity(companyId) {
    await simulateDelay(400);
    return getCompanyData(companyId).activity;
  },

  async getNotifications(companyId) {
    await simulateDelay(300);
    return getCompanyData(companyId).notifications;
  },

  async getPackageAlerts(companyId) {
    await simulateDelay(500);
    return getCompanyData(companyId).packageAlerts;
  },

  async getActiveRoutes(companyId) {
    await simulateDelay(500);
    return getCompanyData(companyId).activeRoutes;
  },

  async getRecentPayments(companyId) {
    await simulateDelay(400);
    return getCompanyData(companyId).recentPayments;
  },

  async getAgencyPerformance(companyId) {
    await simulateDelay(600);
    return getCompanyData(companyId).agencyPerformance;
  },

  async getEmployeePerformance(companyId) {
    await simulateDelay(500);
    return getCompanyData(companyId).employeePerformance;
  },

  async getAgenda(companyId) {
    await simulateDelay(300);
    return getCompanyData(companyId).agenda;
  },

  async getSubscription(companyId) {
    await simulateDelay(400);
    return getCompanyData(companyId).subscription;
  },

  async getAlerts(companyId) {
    await simulateDelay(300);
    return getCompanyData(companyId).alerts;
  },

  async getAll(companyId) {
    await simulateDelay(700);
    return getCompanyData(companyId);
  },
};
