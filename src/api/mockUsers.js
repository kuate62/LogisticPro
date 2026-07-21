const simulateDelay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const now = new Date();
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const fmt = (d) => d.toISOString();

let usersDB = [
  { id: 'usr_002', companyId: 'comp_001', employeeId: 'emp_008', firstName: 'Marie', lastName: 'Kabila', email: 'marie@transport.cm', phone: '+237 82 345 6789', role: 'company_admin', roleId: 'role_001', roleName: 'Administrateur', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'director', status: 'active', lastLogin: fmt(subDays(now, 0)), createdAt: fmt(subDays(now, 200)) },
  { id: 'usr_003', companyId: 'comp_001', employeeId: 'emp_007', firstName: 'Claude', lastName: 'Mugisho', email: 'claude@transport.cm', phone: '+237 90 123 4567', role: 'agency_manager', roleId: 'role_002', roleName: 'Responsable d\'agence', agencyId: 'ag_005', agencyName: 'Agence Garoua', position: 'agency_manager', status: 'active', lastLogin: fmt(subDays(now, 1)), createdAt: fmt(subDays(now, 45)) },
  { id: 'usr_004', companyId: 'comp_001', employeeId: 'emp_001', firstName: 'Sarah', lastName: 'Mbuyi', email: 'sarah@transport.cm', phone: '+237 84 567 8901', role: 'counter_agent', roleId: 'role_003', roleName: 'Agent guichet', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'counter_agent', status: 'active', lastLogin: fmt(subDays(now, 0)), createdAt: fmt(subDays(now, 180)) },
  { id: 'usr_005', companyId: 'comp_001', employeeId: 'emp_002', firstName: 'David', lastName: 'Kasongo', email: 'david@transport.cm', phone: '+237 85 678 9012', role: 'pickup_agent', roleId: 'role_004', roleName: 'Agent de retrait', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'pickup_agent', status: 'active', lastLogin: fmt(subDays(now, 2)), createdAt: fmt(subDays(now, 170)) },
  { id: 'usr_006', companyId: 'comp_001', employeeId: 'emp_003', firstName: 'Grace', lastName: 'Mwamba', email: 'grace@transport.cm', phone: '+237 86 789 0123', role: 'counter_agent', roleId: 'role_003', roleName: 'Agent guichet', agencyId: 'ag_002', agencyName: 'Agence Yaoundé', position: 'counter_agent', status: 'active', lastLogin: fmt(subDays(now, 3)), createdAt: fmt(subDays(now, 120)) },
  { id: 'usr_007', companyId: 'comp_001', employeeId: 'emp_006', firstName: 'Paul', lastName: 'Tshimanga', email: 'paul@transport.cm', phone: '+237 89 012 3456', role: 'company_admin', roleId: 'role_001', roleName: 'Administrateur', agencyId: 'ag_007', agencyName: 'Agence Bafoussam', position: 'payment_manager', status: 'inactive', lastLogin: fmt(subDays(now, 15)), createdAt: fmt(subDays(now, 60)) },
];

let nextId = 8;

function getCompanyUsers(companyId) {
  return usersDB.filter((u) => u.companyId === companyId);
}

export const mockUsersService = {
  async getAll(companyId, { search = '', filters = {}, sort = { field: 'createdAt', direction: 'desc' }, page = 1, perPage = 10 } = {}) {
    await simulateDelay(400);
    let result = getCompanyUsers(companyId);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone?.includes(q) ||
        u.roleName?.toLowerCase().includes(q) ||
        u.agencyName?.toLowerCase().includes(q)
      );
    }

    if (filters.status) result = result.filter((u) => u.status === filters.status);
    if (filters.role) result = result.filter((u) => u.role === filters.role);
    if (filters.agencyId) result = result.filter((u) => u.agencyId === filters.agencyId);

    result.sort((a, b) => {
      let valA = a[sort.field]; let valB = b[sort.field];
      if (typeof valA === 'string') { valA = valA.toLowerCase(); valB = (valB || '').toLowerCase(); }
      if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const total = result.length;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;
    return { data: result.slice(offset, offset + perPage), total, page, perPage, totalPages };
  },

  async getById(companyId, userId) {
    await simulateDelay(300);
    const user = getCompanyUsers(companyId).find((u) => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');
    return user;
  },

  async create(companyId, data) {
    await simulateDelay(600);
    const user = { id: `usr_${String(nextId++).padStart(3, '0')}`, companyId, ...data, lastLogin: null, status: 'active', createdAt: new Date().toISOString() };
    usersDB = [...usersDB, user];
    return user;
  },

  async update(companyId, userId, data) {
    await simulateDelay(500);
    const idx = usersDB.findIndex((u) => u.id === userId && u.companyId === companyId);
    if (idx === -1) throw new Error('Utilisateur non trouvé');
    usersDB[idx] = { ...usersDB[idx], ...data };
    return usersDB[idx];
  },

  async toggleStatus(companyId, userId) {
    await simulateDelay(400);
    const idx = usersDB.findIndex((u) => u.id === userId && u.companyId === companyId);
    if (idx === -1) throw new Error('Utilisateur non trouvé');
    usersDB[idx] = { ...usersDB[idx], status: usersDB[idx].status === 'active' ? 'inactive' : 'active' };
    return usersDB[idx];
  },

  async resetPassword(companyId, userId) {
    await simulateDelay(500);
    const user = getCompanyUsers(companyId).find((u) => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');
    return { message: 'Un email de réinitialisation a été envoyé' };
  },

  async getCount(companyId) {
    await simulateDelay(200);
    const all = getCompanyUsers(companyId);
    return { total: all.length, active: all.filter((u) => u.status === 'active').length, inactive: all.filter((u) => u.status === 'inactive').length };
  },

  async getHistory(companyId, userId) {
    void companyId; void userId;
    await simulateDelay(300);
    return [
      { id: 'uh_1', action: 'Connexion', description: 'Connexion depuis Chrome / Windows', date: fmt(subDays(now, 0)) },
      { id: 'uh_2', action: 'Modification profil', description: 'Téléphone modifié', date: fmt(subDays(now, 5)) },
      { id: 'uh_3', action: 'Changement de rôle', description: 'Rôle changé de Agent guichet à Responsable', date: fmt(subDays(now, 15)) },
      { id: 'uh_4', action: 'Création du compte', description: 'Compte créé par l\'administrateur', date: fmt(subDays(now, 60)) },
    ];
  },
};
