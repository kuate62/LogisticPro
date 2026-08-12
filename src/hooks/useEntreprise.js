import { useState, useEffect } from 'react';
import useEntrepriseStore from '../store/useEntrepriseStore';
import { agenciesService } from '../api/agenciesService';

export function useCompanies() {
  const companies = useEntrepriseStore((s) => s.companies);
  const loading = useEntrepriseStore((s) => s.loading);
  const error = useEntrepriseStore((s) => s.error);
  const fetchCompanies = useEntrepriseStore((s) => s.fetchCompanies);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);

  return { companies, loading, error, refetch: fetchCompanies };
}

export function useCompany(id) {
  const selectedCompany = useEntrepriseStore((s) => s.selectedCompany);
  const companyLoading = useEntrepriseStore((s) => s.companyLoading);
  const error = useEntrepriseStore((s) => s.error);
  const selectCompany = useEntrepriseStore((s) => s.selectCompany);

  useEffect(() => {
    if (id) { selectCompany(id); }
  }, [id, selectCompany]);

  return { company: selectedCompany, loading: companyLoading, error };
}

export function useCompanyAgencies(companyId) {
  const [state, setState] = useState({ agencies: [], loading: !!companyId });

  useEffect(() => {
    if (!companyId) return;
    let cancelled = false;
    agenciesService.getAll(companyId).then((data) => {
      if (!cancelled) setState({ agencies: data, loading: false });
    }).catch(() => { if (!cancelled) setState((prev) => ({ ...prev, loading: false })); });
    return () => { cancelled = true; };
  }, [companyId]);

  return state;
}
