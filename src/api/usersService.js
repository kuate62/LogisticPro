import apiClient from './axios';

export const SYSTEM_ROLES = [
  { id: 'ROLE_ROOT', name: 'Super Administrateur', code: 'ROLE_ROOT' },
  { id: 'ROLE_ADMIN', name: 'Administrateur', code: 'ROLE_ADMIN' },
  { id: 'ROLE_USER', name: 'Utilisateur', code: 'ROLE_USER' },
];

export const SYSTEM_ROLE_NAMES = {
  ROLE_ROOT: 'Super Administrateur',
  ROLE_ADMIN: 'Administrateur',
  ROLE_USER: 'Utilisateur',
};

export function mapUser(u) {
  if (!u) return null;
  const role = u.roles || 'ROLE_USER';
  return {
    id: u.id,
    companyId: '',
    employeeId: '',
    firstName: u.firstname || '',
    lastName: u.lastname || '',
    email: u.email || '',
    phone: u.phone || '',
    gender: u.gender || '',
    role,
    roleId: role,
    roleName: SYSTEM_ROLE_NAMES[role] || role,
    agencyId: '',
    agencyName: '',
    position: '',
    status: u.status ? 'active' : 'inactive',
    statusBoolean: !!u.status,
    verified: !!u.verified,
    lastLogin: '',
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export function toUserPayload(data) {
  const payload = {};
  if (data.firstName) payload.firstname = data.firstName;
  if (data.lastName) payload.lastname = data.lastName;
  if (data.email) payload.email = data.email;
  if (data.phone) payload.phone = data.phone;
  if (data.gender) payload.gender = data.gender;
  if (data.roleId) payload.roles = data.roleId;
  else if (data.role) payload.roles = data.role;
  if (data.password) payload.password = data.password;
  if (data.status !== undefined && data.status !== '') {
    payload.status = data.status === 'active' || data.status === true;
  }
  if (data.verified !== undefined) payload.verified = !!data.verified;
  return payload;
}

function toListResult(response, fallback) {
  const limit = response.data.limit || fallback;
  return {
    data: (response.data.users || []).map(mapUser),
    total: response.data.total || 0,
    page: response.data.page || 1,
    perPage: limit,
    totalPages: Math.ceil((response.data.total || 0) / limit),
  };
}

const LIST_LIMIT = 1000;

export const usersService = {
  async getAll(companyId, { search = '', filters = {}, page = 1, perPage = 10 } = {}) {
    void companyId;
    const params = { page, limit: perPage };
    if (search) params.search = search;
    if (filters?.role) params.roles = filters.role;
    if (filters?.status) params.status = filters.status === 'active' ? 'true' : 'false';

    const response = await apiClient.get('/users', { params });

    return toListResult(response, perPage);
  },

  async getById(companyId, userId) {
    void companyId;
    const response = await apiClient.get(`/users/${userId}`);
    return mapUser(response.data.user);
  },

  async create(companyId, data) {
    void companyId;
    const response = await apiClient.post('/users', toUserPayload(data));
    return mapUser(response.data.user);
  },

  async update(companyId, userId, data) {
    void companyId;
    const response = await apiClient.patch(`/users/${userId}`, toUserPayload(data));
    return mapUser(response.data.user);
  },

  async toggleStatus(companyId, userId) {
    void companyId;
    const detail = await apiClient.get(`/users/${userId}`);
    const current = !!detail.data.user?.status;
    const response = await apiClient.patch(`/users/${userId}`, { status: !current });
    return mapUser(response.data.user);
  },

  async resetPassword(companyId, userId) {
    void companyId;
    const detail = await apiClient.get(`/users/${userId}`);
    const email = detail.data.user?.email;
    if (!email) throw new Error('Utilisateur introuvable');
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  async getCount(companyId) {
    void companyId;
    const result = await this.getAll(companyId, { perPage: LIST_LIMIT });
    return {
      total: result.data.length,
      active: result.data.filter((u) => u.status === 'active').length,
      inactive: result.data.filter((u) => u.status === 'inactive').length,
    };
  },

  async getHistory() {
    return [];
  },
};

export default usersService;
