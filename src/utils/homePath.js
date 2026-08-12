import { ROLES } from '../config/constants';

export function getHomePath(user) {
  if (user?.role === ROLES.SUPER_ADMIN) return '/admin';
  if (user?.role === ROLES.CLIENT) return '/dashboard/client';
  if (user?.employeeRole === 'depot_agent') return '/dashboard/depot';
  if (user?.employeeRole === 'retrait_agent') return '/dashboard/retrait';
  return '/dashboard';
}

export default getHomePath;
