import { useCallback } from 'react';
import usePartnerStore from '../store/usePartnerStore';
import { useSubscriptionPlans } from './useSubscription';

export function usePartnerApplication() {
  const {
    selectedPlan, application, loading, error,
    selectPlan, submitApplication, resetApplication,
  } = usePartnerStore();

  const { plans, loading: plansLoading } = useSubscriptionPlans();

  const submit = useCallback((data) => submitApplication(data, selectedPlan), [submitApplication, selectedPlan]);

  return {
    plans,
    plansLoading,
    selectedPlan,
    application,
    loading,
    error,
    selectPlan: useCallback((plan) => selectPlan(plan), [selectPlan]),
    submit,
    reset: useCallback(() => resetApplication(), [resetApplication]),
  };
}
