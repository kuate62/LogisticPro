import { ROLES } from '../config/constants';

const BACKEND_ROLE_TO_FRONTEND = {
  ROLE_ROOT: ROLES.SUPER_ADMIN,
  ROLE_ADMIN: ROLES.COMPANY_ADMIN,
  ROLE_USER: ROLES.CLIENT,
  user: ROLES.CLIENT,
};

export function normalizeUser(raw = {}) {
  const firstName = raw.firstName || raw.firstname || '';
  const lastName = raw.lastName || raw.lastname || '';

  let role = raw.role;
  if (!role || !Object.values(ROLES).includes(role)) {
    role =
      BACKEND_ROLE_TO_FRONTEND[raw.roles] ||
      (raw.profile === 'employee' ? ROLES.COMPANY_ADMIN : ROLES.CLIENT);
  }

  return {
    ...raw,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    initials: `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase(),
    role,
  };
}

export default normalizeUser;
