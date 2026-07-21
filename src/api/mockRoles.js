const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let rolesDB = [
  { id: 'role_001', companyId: 'comp_001', name: 'Administrateur', code: 'admin', description: 'Accès complet à toutes les fonctionnalités', userCount: 2, isSystem: true, permissions: ['dashboard', 'packages', 'shipments', 'tracking', 'customers', 'agencies', 'counters', 'routes', 'cities', 'pricing', 'employees', 'users', 'roles', 'reports', 'subscription', 'settings'], createdAt: '2024-01-15T08:00:00Z' },
  { id: 'role_002', companyId: 'comp_001', name: 'Responsable d\'agence', code: 'agency_manager', description: 'Gestion complète d\'une agence', userCount: 1, isSystem: false, permissions: ['dashboard', 'packages', 'shipments', 'customers', 'agencies', 'counters', 'employees', 'reports'], createdAt: '2024-02-10T09:00:00Z' },
  { id: 'role_003', companyId: 'comp_001', name: 'Agent guichet', code: 'counter_agent', description: 'Gestion des colis et enregistrement au comptoir', userCount: 2, isSystem: false, permissions: ['dashboard', 'packages', 'customers', 'tracking'], createdAt: '2024-03-01T10:00:00Z' },
  { id: 'role_004', companyId: 'comp_001', name: 'Agent de retrait', code: 'pickup_agent', description: 'Gestion des retraits de colis', userCount: 1, isSystem: false, permissions: ['dashboard', 'packages', 'tracking'], createdAt: '2024-03-15T11:00:00Z' },
  { id: 'role_005', companyId: 'comp_001', name: 'Gestionnaire paie', code: 'payment_manager', description: 'Gestion des paiements et facturation', userCount: 0, isSystem: false, permissions: ['dashboard', 'pricing', 'reports'], createdAt: '2024-04-01T09:00:00Z' },
];

const ALL_PERMISSIONS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'packages', label: 'Colis' },
  { key: 'shipments', label: 'Expéditions' },
  { key: 'tracking', label: 'Suivi' },
  { key: 'customers', label: 'Clients' },
  { key: 'agencies', label: 'Agences' },
  { key: 'counters', label: 'Comptoirs' },
  { key: 'routes', label: 'Trajets' },
  { key: 'cities', label: 'Villes' },
  { key: 'pricing', label: 'Tarification' },
  { key: 'employees', label: 'Employés' },
  { key: 'users', label: 'Utilisateurs' },
  { key: 'roles', label: 'Rôles' },
  { key: 'reports', label: 'Rapports' },
  { key: 'subscription', label: 'Abonnement' },
  { key: 'settings', label: 'Paramètres' },
];

let nextId = 6;

export function getMockRoles() { return rolesDB; }

function getCompanyRoles(companyId) {
  return rolesDB.filter((r) => r.companyId === companyId);
}

export const mockRolesService = {
  ALL_PERMISSIONS,

  async getAll(companyId) {
    await simulateDelay(300);
    return getCompanyRoles(companyId);
  },

  async getById(companyId, roleId) {
    await simulateDelay(200);
    const role = getCompanyRoles(companyId).find((r) => r.id === roleId);
    if (!role) throw new Error('Rôle non trouvé');
    return role;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const role = { id: `role_${String(nextId++).padStart(3, '0')}`, companyId, ...data, userCount: 0, isSystem: false, createdAt: new Date().toISOString() };
    rolesDB = [...rolesDB, role];
    return role;
  },

  async update(companyId, roleId, data) {
    await simulateDelay(400);
    const idx = rolesDB.findIndex((r) => r.id === roleId && r.companyId === companyId);
    if (idx === -1) throw new Error('Rôle non trouvé');
    rolesDB[idx] = { ...rolesDB[idx], ...data };
    return rolesDB[idx];
  },

  async remove(companyId, roleId) {
    await simulateDelay(400);
    const role = getCompanyRoles(companyId).find((r) => r.id === roleId);
    if (!role) throw new Error('Rôle non trouvé');
    if (role.isSystem) throw new Error('Impossible de supprimer un rôle système');
    rolesDB = rolesDB.filter((r) => r.id !== roleId);
    return { message: 'Rôle supprimé' };
  },
};
