const simulateDelay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const now = new Date();
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const fmt = (d) => d.toISOString();

let employeesDB = [
  { id: 'emp_001', companyId: 'comp_001', firstName: 'Sarah', lastName: 'Mbuyi', phone: '+237 84 567 8901', email: 'sarah@transport.cm', address: '15, Bd de la République, Akwa', city: 'Douala', nationality: 'Camerounaise', nationalId: 'CM-DLA-874521', gender: 'female', dateOfBirth: '1992-03-15', hireDate: '2024-01-10', employeeCode: 'EMP-001', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'counter_agent', status: 'active', photo: null, createdAt: fmt(subDays(now, 180)) },
  { id: 'emp_002', companyId: 'comp_001', firstName: 'David', lastName: 'Kasongo', phone: '+237 85 678 9012', email: 'david@transport.cm', address: '28, Av. Kennedy, Bonanjo', city: 'Douala', nationality: 'Camerounaise', nationalId: 'CM-DLA-985612', gender: 'male', dateOfBirth: '1988-07-22', hireDate: '2024-02-05', employeeCode: 'EMP-002', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'pickup_agent', status: 'active', photo: null, createdAt: fmt(subDays(now, 170)) },
  { id: 'emp_003', companyId: 'comp_001', firstName: 'Grace', lastName: 'Mwamba', phone: '+237 86 789 0123', email: 'grace@transport.cm', address: '7, Av. Joss, Bonapriso', city: 'Douala', nationality: 'Camerounaise', nationalId: 'CM-DLA-654321', gender: 'female', dateOfBirth: '1995-11-08', hireDate: '2024-03-15', employeeCode: 'EMP-003', agencyId: 'ag_002', agencyName: 'Agence Yaoundé', position: 'counter_agent', status: 'active', photo: null, createdAt: fmt(subDays(now, 120)) },
  { id: 'emp_004', companyId: 'comp_001', firstName: 'Joseph', lastName: 'Lungila', phone: '+237 87 890 1234', email: 'joseph@transport.cm', address: '42, Av. Nyangwe, Yaoundé', city: 'Yaoundé', nationality: 'Camerounaise', nationalId: 'CM-YDE-321456', gender: 'male', dateOfBirth: '1985-05-30', hireDate: '2024-01-20', employeeCode: 'EMP-004', agencyId: 'ag_002', agencyName: 'Agence Yaoundé', position: 'driver', status: 'active', photo: null, createdAt: fmt(subDays(now, 175)) },
  { id: 'emp_005', companyId: 'comp_001', firstName: 'Annie', lastName: 'Baleko', phone: '+237 88 901 2345', email: 'annie@transport.cm', address: '3, Av. Tabora, Bamenda', city: 'Bamenda', nationality: 'Camerounaise', nationalId: 'CM-BTA-789123', gender: 'female', dateOfBirth: '1990-09-12', hireDate: '2024-04-01', employeeCode: 'EMP-005', agencyId: 'ag_003', agencyName: 'Agence Bamenda', position: 'package_manager', status: 'active', photo: null, createdAt: fmt(subDays(now, 90)) },
  { id: 'emp_006', companyId: 'comp_001', firstName: 'Paul', lastName: 'Tshimanga', phone: '+237 89 012 3456', email: 'paul@transport.cm', address: '12, Av. Mobutu, Bafoussam', city: 'Bafoussam', nationality: 'Camerounaise', nationalId: 'CM-ADA-456789', gender: 'male', dateOfBirth: '1987-01-25', hireDate: '2024-05-10', employeeCode: 'EMP-006', agencyId: 'ag_007', agencyName: 'Agence Bafoussam', position: 'payment_manager', status: 'active', photo: null, createdAt: fmt(subDays(now, 60)) },
  { id: 'emp_007', companyId: 'comp_001', firstName: 'Claude', lastName: 'Mugisho', phone: '+237 90 123 4567', email: 'claude@transport.cm', address: '8, Av. Birere, Garoua', city: 'Garoua', nationality: 'Camerounaise', nationalId: 'CM-NOR-123987', gender: 'male', dateOfBirth: '1993-06-18', hireDate: '2024-06-01', employeeCode: 'EMP-007', agencyId: 'ag_005', agencyName: 'Agence Garoua', position: 'agency_manager', status: 'active', photo: null, createdAt: fmt(subDays(now, 45)) },
  { id: 'emp_008', companyId: 'comp_001', firstName: 'Marie', lastName: 'Kabila', phone: '+237 82 345 6789', email: 'marie.k@transport.cm', address: '1, Av. du Port, Bonaberi', city: 'Douala', nationality: 'Camerounaise', nationalId: 'CM-DLA-321654', gender: 'female', dateOfBirth: '1982-12-03', hireDate: '2023-11-15', employeeCode: 'EMP-008', agencyId: 'ag_001', agencyName: 'Agence Centrale Douala', position: 'director', status: 'active', photo: null, createdAt: fmt(subDays(now, 200)) },
];

const POSITIONS = {
  director: 'Directeur général',
  agency_manager: 'Responsable d\'agence',
  counter_agent: 'Agent de guichet',
  pickup_agent: 'Agent de retrait',
  package_manager: 'Gestionnaire des colis',
  payment_manager: 'Gestionnaire des paiements',
  driver: 'Chauffeur',
};

let nextId = 9;

function getCompanyEmployees(companyId) {
  return employeesDB.filter((e) => e.companyId === companyId);
}

export const mockEmployeesService = {
  POSITIONS,

  async getAll(companyId, { search = '', filters = {}, sort = { field: 'createdAt', direction: 'desc' }, page = 1, perPage = 10 } = {}) {
    await simulateDelay(400);
    let result = getCompanyEmployees(companyId);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((e) =>
        e.firstName.toLowerCase().includes(q) ||
        e.lastName.toLowerCase().includes(q) ||
        e.phone?.includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.employeeCode?.toLowerCase().includes(q) ||
        e.agencyName?.toLowerCase().includes(q)
      );
    }

    if (filters.status) result = result.filter((e) => e.status === filters.status);
    if (filters.agencyId) result = result.filter((e) => e.agencyId === filters.agencyId);
    if (filters.position) result = result.filter((e) => e.position === filters.position);
    if (filters.gender) result = result.filter((e) => e.gender === filters.gender);

    result.sort((a, b) => {
      let valA = a[sort.field];
      let valB = b[sort.field];
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

  async getById(companyId, employeeId) {
    await simulateDelay(300);
    const emp = getCompanyEmployees(companyId).find((e) => e.id === employeeId);
    if (!emp) throw new Error('Employé non trouvé');
    return emp;
  },

  async create(companyId, data) {
    await simulateDelay(600);
    const emp = { id: `emp_${String(nextId++).padStart(3, '0')}`, companyId, ...data, photo: null, status: 'active', createdAt: new Date().toISOString() };
    employeesDB = [...employeesDB, emp];
    return emp;
  },

  async update(companyId, employeeId, data) {
    await simulateDelay(500);
    const idx = employeesDB.findIndex((e) => e.id === employeeId && e.companyId === companyId);
    if (idx === -1) throw new Error('Employé non trouvé');
    employeesDB[idx] = { ...employeesDB[idx], ...data };
    return employeesDB[idx];
  },

  async toggleStatus(companyId, employeeId) {
    await simulateDelay(400);
    const idx = employeesDB.findIndex((e) => e.id === employeeId && e.companyId === companyId);
    if (idx === -1) throw new Error('Employé non trouvé');
    employeesDB[idx] = { ...employeesDB[idx], status: employeesDB[idx].status === 'active' ? 'inactive' : 'active' };
    return employeesDB[idx];
  },

  async getCount(companyId) {
    await simulateDelay(200);
    const all = getCompanyEmployees(companyId);
    return { total: all.length, active: all.filter((e) => e.status === 'active').length, inactive: all.filter((e) => e.status === 'inactive').length };
  },
};
