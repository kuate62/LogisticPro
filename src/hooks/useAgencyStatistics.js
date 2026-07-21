import { useEffect } from 'react';
import useAgencyStore from '../store/useAgencyStore';
import { useAuth } from './useAuth';
import { formatAgencyCurrency } from '../helpers/agencyFormatters';

export function useAgencyStatistics(agencyId) {
  const { agencyStats, loading, fetchAgencyStats } = useAgencyStore();
  const { companyId } = useAuth();

  useEffect(() => {
    if (agencyId) {
      fetchAgencyStats(companyId, agencyId);
    }
  }, [companyId, agencyId, fetchAgencyStats]);

  const formatCurrency = formatAgencyCurrency;

  const packagesDeliveredRate = agencyStats
    ? Math.round((agencyStats.packages.delivered / agencyStats.packages.total) * 100)
    : 0;

  const revenueGrowth = agencyStats?.revenue.lastMonth
    ? Math.round(((agencyStats.revenue.thisMonth - agencyStats.revenue.lastMonth) / agencyStats.revenue.lastMonth) * 100)
    : 0;

  return {
    stats: agencyStats,
    loading: loading.stats,
    formatCurrency,
    packagesDeliveredRate,
    revenueGrowth,
  };
}

export default useAgencyStatistics;
