import { useEffect, useCallback } from 'react';
import useCompanyCatalogStore from '../store/useCompanyCatalogStore';

export function useCompanies() {
  const { companies, loading, error, pagination, fetchCompanies } = useCompanyCatalogStore();
  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);
  return { companies, loading, error, pagination };
}

export function useCompanySearch() {
  const { query, setQuery, fetchCompanies } = useCompanyCatalogStore();
  const search = useCallback((q) => { setQuery(q); }, [setQuery]);
  useEffect(() => { fetchCompanies(); }, [query, fetchCompanies]);
  return { query, search };
}

export function useCompanyFilters() {
  const { filters, setFilter, resetFilters, fetchCompanies } = useCompanyCatalogStore();
  useEffect(() => { fetchCompanies(); }, [filters, fetchCompanies]);
  return { filters, setFilter, resetFilters };
}

export function useCompany(id) {
  const { selectedCompany: company, detailLoading: loading, error, fetchCompany } = useCompanyCatalogStore();
  useEffect(() => { if (id) fetchCompany(id); }, [id, fetchCompany]);
  return { company, loading, error };
}

export function usePagination() {
  const { pagination, setPage, setPerPage, fetchCompanies } = useCompanyCatalogStore();
  useEffect(() => { fetchCompanies(); }, [pagination.page, pagination.perPage, fetchCompanies]);
  return { ...pagination, setPage, setPerPage };
}

export function useCompanySort() {
  const { sort, setSort, fetchCompanies } = useCompanyCatalogStore();
  useEffect(() => { fetchCompanies(); }, [sort, fetchCompanies]);
  return { sort, setSort };
}
