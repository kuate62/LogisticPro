const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const now = new Date();
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const fmt = (d) => d.toISOString();

const mockAgenciesDB = [
  {
    id: 'ag_001',
    companyId: 'comp_001',
    name: 'Agence Centrale Douala',
    code: 'AGC-KIN-001',
    phone: '+237 81 234 5678',
    email: 'kinshasa@transport.cm',
    address: '12, Avenue de la Paix, Commune de la Gombe',
    city: 'Douala',
    region: 'Littoral',
    country: 'Cameroun',
    description: 'Agence principale du groupe, centre névralgique de toutes les opérations logistiques.',
    logo: null,
    latitude: -4.3217,
    longitude: 15.3114,
    isPrimary: true,
    status: 'active',
    manager: { id: 'usr_003', name: 'Patrick Lukusa', email: 'patrick@transport.cm', phone: '+237 83 456 7890' },
    schedule: {
      monday: { open: '07:00', close: '18:00', closed: false },
      tuesday: { open: '07:00', close: '18:00', closed: false },
      wednesday: { open: '07:00', close: '18:00', closed: false },
      thursday: { open: '07:00', close: '18:00', closed: false },
      friday: { open: '07:00', close: '18:00', closed: false },
      saturday: { open: '08:00', close: '13:00', closed: false },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 12,
    shipmentsCount: 89,
    packagesCount: 487,
    revenue: 28500000,
    punctuality: 94,
    createdAt: fmt(subDays(now, 320)),
    updatedAt: fmt(subDays(now, 2)),
  },
  {
    id: 'ag_002',
    companyId: 'comp_001',
    name: 'Agence Yaoundé',
    code: 'AGC-LUB-002',
    phone: '+237 82 345 6789',
    email: 'lubumbashi@transport.cm',
    address: '45, Boulevard du 30 Juillet, Quartier Industriel',
    city: 'Yaoundé',
    region: 'Adamaoua',
    country: 'Cameroun',
    description: 'Agence de Yaoundé, couvre toute la région Adamaoua et les provinces voisines.',
    logo: null,
    latitude: -11.6876,
    longitude: 27.5026,
    isPrimary: false,
    status: 'active',
    manager: { id: 'usr_005', name: 'Emmanuel Kasongo', email: 'emmanuel@transport.cm', phone: '+237 85 678 9012' },
    schedule: {
      monday: { open: '07:30', close: '17:30', closed: false },
      tuesday: { open: '07:30', close: '17:30', closed: false },
      wednesday: { open: '07:30', close: '17:30', closed: false },
      thursday: { open: '07:30', close: '17:30', closed: false },
      friday: { open: '07:30', close: '17:30', closed: false },
      saturday: { open: '08:00', close: '12:00', closed: false },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 8,
    shipmentsCount: 62,
    packagesCount: 312,
    revenue: 18200000,
    punctuality: 91,
    createdAt: fmt(subDays(now, 280)),
    updatedAt: fmt(subDays(now, 5)),
  },
  {
    id: 'ag_003',
    companyId: 'comp_001',
    name: 'Agence Bamenda',
    code: 'AGC-MBJ-003',
    phone: '+237 84 567 8901',
    email: 'mbujimayi@transport.cm',
    address: '8, Rue du Commerce, Centre-ville',
    city: 'Bamenda',
    region: 'Centre',
    country: 'Cameroun',
    description: 'Point stratégique pour le transport vers le centre du pays.',
    logo: null,
    latitude: -3.2527,
    longitude: 23.5975,
    isPrimary: false,
    status: 'active',
    manager: { id: 'usr_006', name: 'Grâce Mwamba', email: 'grace@transport.cm', phone: '+237 86 789 0123' },
    schedule: {
      monday: { open: '08:00', close: '17:00', closed: false },
      tuesday: { open: '08:00', close: '17:00', closed: false },
      wednesday: { open: '08:00', close: '17:00', closed: false },
      thursday: { open: '08:00', close: '17:00', closed: false },
      friday: { open: '08:00', close: '17:00', closed: false },
      saturday: { open: '08:00', close: '12:00', closed: false },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 6,
    shipmentsCount: 48,
    packagesCount: 248,
    revenue: 14800000,
    punctuality: 88,
    createdAt: fmt(subDays(now, 240)),
    updatedAt: fmt(subDays(now, 10)),
  },
  {
    id: 'ag_004',
    companyId: 'comp_001',
    name: 'Agence Maroua',
    code: 'AGC-KIS-004',
    phone: '+237 85 678 9012',
    email: 'kisangani@transport.cm',
    address: '22, Avenue des Universitaires, Quartier Makis',
    city: 'Maroua',
    region: 'Nord',
    country: 'Cameroun',
    description: 'Couverture du nord du pays et de la région Nord.',
    logo: null,
    latitude: 0.5153,
    longitude: 25.1911,
    isPrimary: false,
    status: 'maintenance',
    manager: { id: 'usr_007', name: 'Joseph Lungila', email: 'joseph@transport.cm', phone: '+237 87 890 1234' },
    schedule: {
      monday: { open: '08:00', close: '16:00', closed: false },
      tuesday: { open: '08:00', close: '16:00', closed: false },
      wednesday: { open: '08:00', close: '16:00', closed: false },
      thursday: { open: '08:00', close: '16:00', closed: false },
      friday: { open: '08:00', close: '16:00', closed: false },
      saturday: { open: null, close: null, closed: true },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 4,
    shipmentsCount: 41,
    packagesCount: 200,
    revenue: 11950000,
    punctuality: 85,
    createdAt: fmt(subDays(now, 180)),
    updatedAt: fmt(subDays(now, 1)),
  },
  {
    id: 'ag_005',
    companyId: 'comp_001',
    name: 'Agence Garoua',
    code: 'AGC-GOM-005',
    phone: '+237 86 789 0123',
    email: 'goma@transport.cm',
    address: '5, Avenue Birere, Garoua',
    city: 'Garoua',
    region: 'Nord',
    country: 'Cameroun',
    description: 'Agence stratégique pour l\'Est du pays et les zones frontalières.',
    logo: null,
    latitude: -1.6766,
    longitude: 29.2264,
    isPrimary: false,
    status: 'active',
    manager: { id: 'usr_008', name: 'Claude Mugisho', email: 'claude@transport.cm', phone: '+237 88 901 2345' },
    schedule: {
      monday: { open: '07:30', close: '17:00', closed: false },
      tuesday: { open: '07:30', close: '17:00', closed: false },
      wednesday: { open: '07:30', close: '17:00', closed: false },
      thursday: { open: '07:30', close: '17:00', closed: false },
      friday: { open: '07:30', close: '17:00', closed: false },
      saturday: { open: '08:00', close: '12:00', closed: false },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 5,
    shipmentsCount: 35,
    packagesCount: 156,
    revenue: 9400000,
    punctuality: 90,
    createdAt: fmt(subDays(now, 150)),
    updatedAt: fmt(subDays(now, 3)),
  },
  {
    id: 'ag_006',
    companyId: 'comp_001',
    name: 'Agence Kribi',
    code: 'AGC-BKV-006',
    phone: '+237 87 890 1234',
    email: 'bukavu@transport.cm',
    address: '18, Avenue Mobutu, Centre-ville',
    city: 'Kribi',
    region: 'Sud',
    country: 'Cameroun',
    description: 'Service complet pour la région Sud et les zones côtières.',
    logo: null,
    latitude: -2.5064,
    longitude: 28.8609,
    isPrimary: false,
    status: 'inactive',
    manager: { id: 'usr_009', name: 'Annie Baleko', email: 'annie@transport.cm', phone: '+237 89 012 3456' },
    schedule: {
      monday: { open: '08:00', close: '16:00', closed: false },
      tuesday: { open: '08:00', close: '16:00', closed: false },
      wednesday: { open: '08:00', close: '16:00', closed: false },
      thursday: { open: '08:00', close: '16:00', closed: false },
      friday: { open: '08:00', close: '16:00', closed: false },
      saturday: { open: null, close: null, closed: true },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 3,
    shipmentsCount: 22,
    packagesCount: 98,
    revenue: 5600000,
    punctuality: 82,
    createdAt: fmt(subDays(now, 120)),
    updatedAt: fmt(subDays(now, 15)),
  },
  {
    id: 'ag_007',
    companyId: 'comp_001',
    name: 'Agence Bafoussam',
    code: 'AGC-KAN-007',
    phone: '+237 88 901 2345',
    email: 'kananga@transport.cm',
    address: '3, Avenue Tshatshi, Bafoussam',
    city: 'Bafoussam',
    region: 'Ouest',
    country: 'Cameroun',
    description: 'Relais pour l\'Ouest et les zones minières.',
    logo: null,
    latitude: -5.8934,
    longitude: 22.4072,
    isPrimary: false,
    status: 'active',
    manager: { id: 'usr_010', name: 'Paul Tshimanga', email: 'paul@transport.cm', phone: '+237 90 123 4567' },
    schedule: {
      monday: { open: '07:30', close: '17:00', closed: false },
      tuesday: { open: '07:30', close: '17:00', closed: false },
      wednesday: { open: '07:30', close: '17:00', closed: false },
      thursday: { open: '07:30', close: '17:00', closed: false },
      friday: { open: '07:30', close: '17:00', closed: false },
      saturday: { open: '08:00', close: '12:00', closed: false },
      sunday: { open: null, close: null, closed: true },
    },
    employeesCount: 5,
    shipmentsCount: 30,
    packagesCount: 134,
    revenue: 7200000,
    punctuality: 87,
    createdAt: fmt(subDays(now, 90)),
    updatedAt: fmt(subDays(now, 7)),
  },
];

let agencies = [...mockAgenciesDB];
let nextId = 8;

function getCompanyAgencies(companyId) {
  return agencies.filter((a) => a.companyId === companyId);
}

export const mockAgenciesService = {
  async getAll(companyId, { search = '', filters = {}, sort = { field: 'createdAt', direction: 'desc' }, page = 1, perPage = 10 } = {}) {
    await simulateDelay(500);
    let result = getCompanyAgencies(companyId);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) =>
        a.name.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.email.toLowerCase().includes(q) ||
        (a.manager?.name && a.manager.name.toLowerCase().includes(q))
      );
    }

    if (filters.status) {
      result = result.filter((a) => a.status === filters.status);
    }
    if (filters.city) {
      result = result.filter((a) => a.city === filters.city);
    }
    if (filters.region) {
      result = result.filter((a) => a.region === filters.region);
    }
    if (filters.isPrimary !== undefined && filters.isPrimary !== null) {
      result = result.filter((a) => a.isPrimary === filters.isPrimary);
    }
    if (filters.manager) {
      const q = filters.manager.toLowerCase();
      result = result.filter((a) => a.manager?.name?.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      let valA = a[sort.field];
      let valB = b[sort.field];
      if (sort.field === 'employeesCount') { valA = a.employeesCount; valB = b.employeesCount; }
      if (sort.field === 'shipmentsCount') { valA = a.shipmentsCount; valB = b.shipmentsCount; }
      if (typeof valA === 'string') { valA = valA.toLowerCase(); valB = valB?.toLowerCase?.() ?? ''; }
      if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const total = result.length;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;
    const paginated = result.slice(offset, offset + perPage);

    return { data: paginated, total, page, perPage, totalPages };
  },

  async getById(companyId, agencyId) {
    await simulateDelay(400);
    const agency = getCompanyAgencies(companyId).find((a) => a.id === agencyId);
    if (!agency) throw new Error('Agence non trouvée');
    return agency;
  },

  async getStatistics(companyId, agencyId) {
    await simulateDelay(500);
    const agency = getCompanyAgencies(companyId).find((a) => a.id === agencyId);
    if (!agency) throw new Error('Agence non trouvée');
    return {
      id: agency.id,
      name: agency.name,
      packages: {
        total: agency.packagesCount,
        delivered: Math.floor(agency.packagesCount * 0.78),
        inTransit: Math.floor(agency.packagesCount * 0.14),
        pending: Math.floor(agency.packagesCount * 0.08),
      },
      revenue: {
        total: agency.revenue,
        thisMonth: Math.floor(agency.revenue * 0.12),
        lastMonth: Math.floor(agency.revenue * 0.11),
      },
      shipments: {
        total: agency.shipmentsCount,
        completed: Math.floor(agency.shipmentsCount * 0.85),
        inProgress: Math.floor(agency.shipmentsCount * 0.1),
        planned: Math.floor(agency.shipmentsCount * 0.05),
      },
      punctuality: agency.punctuality,
      employees: agency.employeesCount,
      monthlyEvolution: [
        { month: 'Jan', packages: Math.floor(agency.packagesCount * 0.06), revenue: Math.floor(agency.revenue * 0.06) },
        { month: 'Fév', packages: Math.floor(agency.packagesCount * 0.07), revenue: Math.floor(agency.revenue * 0.07) },
        { month: 'Mar', packages: Math.floor(agency.packagesCount * 0.08), revenue: Math.floor(agency.revenue * 0.08) },
        { month: 'Avr', packages: Math.floor(agency.packagesCount * 0.07), revenue: Math.floor(agency.revenue * 0.07) },
        { month: 'Mai', packages: Math.floor(agency.packagesCount * 0.09), revenue: Math.floor(agency.revenue * 0.09) },
        { month: 'Jun', packages: Math.floor(agency.packagesCount * 0.1), revenue: Math.floor(agency.revenue * 0.1) },
        { month: 'Jul', packages: Math.floor(agency.packagesCount * 0.08), revenue: Math.floor(agency.revenue * 0.08) },
        { month: 'Aoû', packages: Math.floor(agency.packagesCount * 0.09), revenue: Math.floor(agency.revenue * 0.09) },
        { month: 'Sep', packages: Math.floor(agency.packagesCount * 0.1), revenue: Math.floor(agency.revenue * 0.1) },
        { month: 'Oct', packages: Math.floor(agency.packagesCount * 0.11), revenue: Math.floor(agency.revenue * 0.11) },
        { month: 'Nov', packages: Math.floor(agency.packagesCount * 0.1), revenue: Math.floor(agency.revenue * 0.1) },
        { month: 'Déc', packages: Math.floor(agency.packagesCount * 0.05), revenue: Math.floor(agency.revenue * 0.05) },
      ],
    };
  },

  async getEmployees(companyId, agencyId) {
    await simulateDelay(400);
    const agency = getCompanyAgencies(companyId).find((a) => a.id === agencyId);
    if (!agency) throw new Error('Agence non trouvée');
    const names = [
      { id: 'emp_001', firstName: 'Sarah', lastName: 'Mbuyi', role: 'Agent comptoir', phone: '+237 84 567 8901', isActive: true },
      { id: 'emp_002', firstName: 'David', lastName: 'Kasongo', role: 'Agent collecte', phone: '+237 85 678 9012', isActive: true },
      { id: 'emp_003', firstName: 'Grace', lastName: 'Mwamba', role: 'Agent comptoir', phone: '+237 86 789 0123', isActive: true },
      { id: 'emp_004', firstName: 'Joseph', lastName: 'Lungila', role: 'Chauffeur', phone: '+237 87 890 1234', isActive: true },
    ];
    return names.slice(0, agency.employeesCount);
  },

  async getShipments(companyId, agencyId) {
    await simulateDelay(400);
    const agency = getCompanyAgencies(companyId).find((a) => a.id === agencyId);
    if (!agency) throw new Error('Agence non trouvée');
    return [
      { id: 'exp_001', code: 'EXP-2024-0847', destination: 'Yaoundé', status: 'in_transit', packages: 24, date: fmt(subDays(now, 0)) },
      { id: 'exp_002', code: 'EXP-2024-0846', destination: 'Bamenda', status: 'arrived', packages: 18, date: fmt(subDays(now, 1)) },
      { id: 'exp_003', code: 'EXP-2024-0845', destination: 'Garoua', status: 'completed', packages: 12, date: fmt(subDays(now, 2)) },
      { id: 'exp_004', code: 'EXP-2024-0844', destination: 'Maroua', status: 'completed', packages: 8, date: fmt(subDays(now, 3)) },
    ].slice(0, Math.min(agency.shipmentsCount, 4));
  },

  async getHistory(companyId, agencyId) {
    void companyId; void agencyId;
    await simulateDelay(300);
    return [
      { id: 'hist_001', action: 'Modification', description: 'Adresse mise à jour', user: 'Patrick Lukusa', date: fmt(subDays(now, 2)) },
      { id: 'hist_002', action: 'Activation', description: 'Agence réactivée après maintenance', user: 'Jean Dupont', date: fmt(subDays(now, 10)) },
      { id: 'hist_003', action: 'Création', description: 'Agence créée dans le système', user: 'Jean Dupont', date: fmt(subDays(now, 120)) },
    ];
  },

  async getDocuments(companyId, agencyId) {
    void companyId; void agencyId;
    await simulateDelay(300);
    return [
      { id: 'doc_001', name: 'Registre de commerce', type: 'pdf', size: '2.4 MB', uploadedAt: fmt(subDays(now, 100)) },
      { id: 'doc_002', name: 'Autorisation ministérielle', type: 'pdf', size: '1.8 MB', uploadedAt: fmt(subDays(now, 90)) },
      { id: 'doc_003', name: 'Plan de localisation', type: 'image', size: '3.1 MB', uploadedAt: fmt(subDays(now, 80)) },
    ];
  },

  async create(companyId, data) {
    await simulateDelay(800);
    const newAgency = {
      id: `ag_${String(nextId++).padStart(3, '0')}`,
      companyId,
      ...data,
      logo: null,
      employeesCount: 0,
      shipmentsCount: 0,
      packagesCount: 0,
      revenue: 0,
      punctuality: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    agencies = [...agencies, newAgency];
    return newAgency;
  },

  async update(companyId, agencyId, data) {
    await simulateDelay(700);
    const idx = agencies.findIndex((a) => a.id === agencyId && a.companyId === companyId);
    if (idx === -1) throw new Error('Agence non trouvée');
    agencies[idx] = { ...agencies[idx], ...data, updatedAt: new Date().toISOString() };
    return agencies[idx];
  },

  async toggleStatus(companyId, agencyId) {
    await simulateDelay(600);
    const idx = agencies.findIndex((a) => a.id === agencyId && a.companyId === companyId);
    if (idx === -1) throw new Error('Agence non trouvée');
    const current = agencies[idx].status;
    agencies[idx] = {
      ...agencies[idx],
      status: current === 'active' ? 'inactive' : 'active',
      updatedAt: new Date().toISOString(),
    };
    return agencies[idx];
  },

  async getAllCities(companyId) {
    await simulateDelay(200);
    const citySet = new Set(getCompanyAgencies(companyId).map((a) => a.city));
    return [...citySet].sort();
  },

  async getAllRegions(companyId) {
    await simulateDelay(200);
    const regionSet = new Set(getCompanyAgencies(companyId).map((a) => a.region));
    return [...regionSet].sort();
  },

  async getCount(companyId) {
    await simulateDelay(200);
    const all = getCompanyAgencies(companyId);
    return {
      total: all.length,
      active: all.filter((a) => a.status === 'active').length,
      inactive: all.filter((a) => a.status === 'inactive').length,
      suspended: all.filter((a) => a.status === 'suspended').length,
      maintenance: all.filter((a) => a.status === 'maintenance').length,
    };
  },
};
