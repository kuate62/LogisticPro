import { useEffect, useCallback } from 'react';
import useEmployeeStore from '../store/useEmployeeStore';
import { useAuth } from './useAuth';

export function useEmployees() {
  const { companyId } = useAuth();
  const {
    employees, counts, loading, error, search, filters, sort, pagination,
    fetchEmployees, fetchCounts, setSearch, setFilters, resetFilters, setSort, setPage, toggleEmployeeStatus,
  } = useEmployeeStore();

  useEffect(() => { if (companyId) fetchEmployees(companyId); }, [companyId, search, filters, sort, pagination.page, pagination.perPage, fetchEmployees]);
  useEffect(() => { if (companyId) fetchCounts(companyId); }, [companyId, fetchCounts]);

  return {
    employees, counts, loading, error, search, filters, sort, pagination,
    setSearch, setFilters, resetFilters, setSort, setPage,
    refresh: useCallback(() => fetchEmployees(companyId), [companyId, fetchEmployees]),
    toggleStatus: useCallback((empId) => toggleEmployeeStatus(companyId, empId), [companyId, toggleEmployeeStatus]),
  };
}

export function useEmployee() {
  const { companyId } = useAuth();
  const { selectedEmployee, loading, error, fetchEmployeeDetail, clearSelected } = useEmployeeStore();

  return { employee: selectedEmployee, loading, error, fetch: useCallback((id) => fetchEmployeeDetail(companyId, id), [companyId, fetchEmployeeDetail]), clearSelected };
}

export function useEmployeeForm() {
  const { companyId } = useAuth();
  const { createEmployee, updateEmployee } = useEmployeeStore();

  return {
    create: useCallback((data) => createEmployee(companyId, data), [companyId, createEmployee]),
    update: useCallback((empId, data) => updateEmployee(companyId, empId, data), [companyId, updateEmployee]),
  };
}
