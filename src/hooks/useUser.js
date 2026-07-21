import { useEffect, useCallback } from 'react';
import useUserStore from '../store/useUserStore';
import { useAuth } from './useAuth';

export function useUsers() {
  const { companyId } = useAuth();
  const {
    users, counts, loading, error, search, filters, sort, pagination,
    fetchUsers, fetchCounts, setSearch, setFilters, resetFilters, setSort, setPage, toggleUserStatus,
  } = useUserStore();

  useEffect(() => { if (companyId) fetchUsers(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchUsers]);
  useEffect(() => { if (companyId) fetchCounts(companyId); }, [companyId, fetchCounts]);

  return {
    users, counts, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchUsers(companyId), [companyId, fetchUsers]),
    toggleStatus: useCallback((userId) => toggleUserStatus(companyId, userId), [companyId, toggleUserStatus]),
  };
}

export function useUser() {
  const { companyId } = useAuth();
  const { selectedUser, userHistory, loading, error, fetchUserDetail, fetchUserHistory, clearSelected } = useUserStore();

  return {
    user: selectedUser, userHistory, loading, error,
    fetch: useCallback((id) => fetchUserDetail(companyId, id), [companyId, fetchUserDetail]),
    fetchHistory: useCallback((id) => fetchUserHistory(companyId, id), [companyId, fetchUserHistory]),
    clearSelected,
  };
}

export function useUserForm() {
  const { companyId } = useAuth();
  const { createUser, updateUser, resetPassword } = useUserStore();

  return {
    create: useCallback((data) => createUser(companyId, data), [companyId, createUser]),
    update: useCallback((userId, data) => updateUser(companyId, userId, data), [companyId, updateUser]),
    resetPassword: useCallback((userId) => resetPassword(companyId, userId), [companyId, resetPassword]),
  };
}
