import apiClient from './axios';

export const POSITION_TO_ROLE = {
  director: 'manager',
  agency_manager: 'manager',
  counter_agent: 'depot_agent',
  pickup_agent: 'retrait_agent',
  package_manager: 'supervisor',
  payment_manager: 'accountant',
  driver: 'delivery_driver',
};

export const ROLE_TO_POSITION = Object.entries(POSITION_TO_ROLE).reduce((acc, [pos, role]) => {
  acc[role] = acc[role] || pos;
  return acc;
}, {});

export function mapEmployee(e) {
  if (!e) return null;
  return {
    id: e.id,
    companyId: e.companyId,
    userId: e.userId,
    firstName: e.firstName || '',
    lastName: e.lastName || '',
    email: e.email || '',
    phone: e.phone || '',
    agencyId: e.agencyId || '',
    agencyName: e.agency?.name || '',
    position: ROLE_TO_POSITION[e.role] || e.role || '',
    role: e.role || '',
    employeeCode: e.counterId || `EMP-${String(e.id).padStart(3, '0')}`,
    counterId: e.counterId || '',
    status: e.status || 'active',
    avatar: e.avatar || null,
    address: '',
    city: '',
    nationality: 'Camerounaise',
    nationalId: '',
    gender: '',
    dateOfBirth: '',
    hireDate: '',
    observation: '',
    photo: null,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  };
}

export function toEmployeePayload(data) {
  const payload = {};
  if (data.firstName) payload.firstName = data.firstName;
  if (data.lastName) payload.lastName = data.lastName;
  if (data.email) payload.email = data.email;
  if (data.phone) payload.phone = data.phone;
  if (data.agencyId) payload.agencyId = Number(data.agencyId);
  if (data.position) payload.role = POSITION_TO_ROLE[data.position] || data.position;
  if (data.employeeCode) payload.counterId = data.employeeCode;
  if (data.counterId) payload.counterId = data.counterId;
  if (data.userId) payload.userId = Number(data.userId);
  if (data.status) payload.status = data.status;
  if (data.accountMode === 'existing' && data.userId) payload.userId = Number(data.userId);
  if (data.accountMode === 'new') {
    payload.createUser = true;
    if (data.password) payload.password = data.password;
  }
  return payload;
}

function toListResult(response, fallback) {
  const limit = response.data.limit || fallback;
  return {
    data: (response.data.employees || []).map(mapEmployee),
    total: response.data.total || 0,
    page: response.data.page || 1,
    perPage: limit,
    totalPages: Math.ceil((response.data.total || 0) / limit),
  };
}

const LIST_LIMIT = 1000;

export const employeesService = {
  async getAll(companyId, { search = '', filters = {}, page = 1, perPage = 10 } = {}) {
    const params = { page, limit: perPage };
    if (companyId) params.companyId = companyId;
    if (search) params.search = search;
    if (filters?.status) params.status = filters.status;
    if (filters?.agencyId) params.agencyId = filters.agencyId;
    if (filters?.position) params.role = POSITION_TO_ROLE[filters.position] || filters.position;

    const response = await apiClient.get('/employees', { params });

    return toListResult(response, perPage);
  },

  async getById(companyId, employeeId) {
    void companyId;
    const response = await apiClient.get(`/employees/${employeeId}`);
    return mapEmployee(response.data.employee);
  },

  async create(companyId, data) {
    const response = await apiClient.post('/employees', { ...toEmployeePayload(data), companyId });
    return mapEmployee(response.data.employee);
  },

  async update(companyId, employeeId, data) {
    void companyId;
    const response = await apiClient.patch(`/employees/${employeeId}`, toEmployeePayload(data));
    return mapEmployee(response.data.employee);
  },

  async toggleStatus(companyId, employeeId) {
    void companyId;
    const detail = await apiClient.get(`/employees/${employeeId}`);
    const current = detail.data.employee?.status;
    const next = current === 'active' ? 'inactive' : 'active';
    const response = await apiClient.patch(`/employees/${employeeId}`, { status: next });
    return mapEmployee(response.data.employee);
  },

  async uploadAvatar(companyId, employeeId, file) {
    void companyId;
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post(`/employees/${employeeId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return mapEmployee(response.data.employee);
  },

  async getCount(companyId) {
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    return {
      total: result.data.length,
      active: result.data.filter((e) => e.status === 'active').length,
      inactive: result.data.filter((e) => e.status === 'inactive').length,
    };
  },
};

export default employeesService;
