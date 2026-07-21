import { useEffect, useCallback } from 'react';
import useRoleStore from '../store/useRoleStore';
import { useAuth } from './useAuth';

export function useRoles() {
  const { companyId } = useAuth();
  const {
    roles, loading, error, search,
    fetchRoles, setSearch, createRole,
  } = useRoleStore();

  useEffect(() => { if (companyId) fetchRoles(companyId); }, [companyId, search, fetchRoles]);

  return {
    roles, loading, error, search,
    setSearch,
    refresh: useCallback(() => fetchRoles(companyId), [companyId, fetchRoles]),
    create: useCallback((data) => createRole(companyId, data), [companyId, createRole]),
  };
}

export function useRole() {
  const { companyId } = useAuth();
  const { selectedRole, loading, error, fetchRoleDetail, updateRole, deleteRole, clearSelected, allPermissions } = useRoleStore();

  return {
    role: selectedRole, loading, error, allPermissions,
    fetch: useCallback((id) => fetchRoleDetail(companyId, id), [companyId, fetchRoleDetail]),
    update: useCallback((roleId, data) => updateRole(companyId, roleId, data), [companyId, updateRole]),
    remove: useCallback((roleId) => deleteRole(companyId, roleId), [companyId, deleteRole]),
    clearSelected,
  };
}

export function useRoleForm() {
  const { companyId } = useAuth();
  const { createRole, updateRole } = useRoleStore();

  return {
    create: useCallback((data) => createRole(companyId, data), [companyId, createRole]),
    update: useCallback((roleId, data) => updateRole(companyId, roleId, data), [companyId, updateRole]),
  };
}
