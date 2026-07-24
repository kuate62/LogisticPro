import { useState, useEffect } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Building2, TrendingUp, Users, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { KPICard, DashboardCard } from '../../components/dashboard';
import { mockAdminService } from '../../api/mockAdmin';
import './SuperAdminDashboard.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits: 0 }).format(value) + ' FCFA';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

const STATUS_MAP = {
  pending: { label: 'En attente', className: 'sa-dashboard__badge--pending' },
  approved: { label: 'Approuvée', className: 'sa-dashboard__badge--approved' },
  rejected: { label: 'Rejetée', className: 'sa-dashboard__badge--rejected' },
};

const PLAN_COLORS = { Starter: '#2563EB', Business: '#F59E0B', Enterprise: '#10B981' };
const SUB_STATUS_COLORS = { active: '#10B981', suspended: '#F59E0B', expired: '#EF4444' };
const SUB_STATUS_LABELS = { active: 'Actif', suspended: 'Suspendu', expired: 'Expiré' };

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [dashStats, requests] = await Promise.all([
          mockAdminService.getDashboardStats(),
          mockAdminService.getRegistrationRequests(),
        ]);
        if (!mounted) return;
        const s = dashStats.stats;
        setStats({
          totalEnterprises: s.totalEnterprises,
          activeEnterprises: s.activeEnterprises,
          suspendedEnterprises: s.suspendedEnterprises,
          monthlyRevenue: s.totalRevenue,
          activeSubscriptions: dashStats.subscriptionsByStatus.find((x) => x.status === 'active')?.count ?? 0,
          totalUsers: s.totalPlatformUsers,
          pendingRequests: s.pendingRequests,
          revenueChart: dashStats.revenueChart,
          enterprisesByPlan: dashStats.enterprisesByPlan.map((p) => ({ name: p.plan, value: p.count, color: PLAN_COLORS[p.plan] ?? '#6B7280' })),
          subscriptionsByStatus: dashStats.subscriptionsByStatus.map((x) => ({ name: SUB_STATUS_LABELS[x.status] ?? x.status, value: x.count, color: SUB_STATUS_COLORS[x.status] ?? '#6B7280' })),
        });
        setRecentRequests(
          [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="sa-dashboard">
      <div className="sa-dashboard__header">
        <h1 className="sa-dashboard__title">Tableau de bord</h1>
        <p className="sa-dashboard__subtitle">Vue d'ensemble de la plateforme LogisticPro</p>
      </div>

      <div className="sa-dashboard__kpi-grid">
        <KPICard title="Total Entreprises" value={stats?.totalEnterprises ?? '—'} icon={Building2} color="primary" loading={loading} />
        <KPICard title="Actives" value={stats?.activeEnterprises ?? '—'} icon={CheckCircle} color="success" loading={loading} />
        <KPICard title="Suspendues" value={stats?.suspendedEnterprises ?? '—'} icon={AlertTriangle} color="danger" loading={loading} />
        <KPICard title="Revenus Mensuels" value={stats ? formatCurrency(stats.monthlyRevenue) : '—'} icon={DollarSign} color="warning" loading={loading} />
        <KPICard title="Abonnements Actifs" value={stats?.activeSubscriptions ?? '—'} icon={TrendingUp} color="primary" loading={loading} />
        <KPICard title="Utilisateurs" value={stats?.totalUsers ?? '—'} icon={Users} color="info" loading={loading} />
        <KPICard title="Demandes en attente" value={stats?.pendingRequests ?? '—'} icon={Clock} color="danger" loading={loading} />
      </div>

      <div className="sa-dashboard__charts-row">
        <DashboardCard title="Revenus mensuels" subtitle="Tendance sur les 7 derniers mois" loading={loading} className="sa-dashboard__chart-card">
          <div className="sa-dashboard__chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.revenueChart ?? []} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-text-secondary, #6b7280)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-secondary, #6b7280)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 'var(--radius-md, 8px)', border: '1px solid var(--color-border, #e5e7eb)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Entreprises par plan" subtitle="Répartition des abonnements" loading={loading} className="sa-dashboard__chart-card">
          <div className="sa-dashboard__chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.enterprisesByPlan ?? []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {(stats?.enterprisesByPlan ?? []).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Abonnements par statut" subtitle="Répartition globale" loading={loading} className="sa-dashboard__chart-card">
          <div className="sa-dashboard__chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.subscriptionsByStatus ?? []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {(stats?.subscriptionsByStatus ?? []).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      <div className="sa-dashboard__lists-row">
        <DashboardCard title="Demandes récentes" subtitle="5 dernières inscriptions" loading={loading} empty={recentRequests.length === 0 ? 'Aucune demande' : undefined} className="sa-dashboard__list-card" style={{ flex: 1 }}>
          <ul className="sa-dashboard__list">
            {recentRequests.map((req) => {
              const status = STATUS_MAP[req.status] ?? STATUS_MAP.pending;
              return (
                <li key={req.id} className="sa-dashboard__list-item">
                  <div className="sa-dashboard__list-item-main">
                    <span className="sa-dashboard__list-item-name">{req.companyName}</span>
                    <span className="sa-dashboard__list-item-meta">{req.contactName} &middot; {req.city}</span>
                  </div>
                  <div className="sa-dashboard__list-item-right">
                    <span className={`sa-dashboard__badge ${status.className}`}>{status.label}</span>
                    <span className="sa-dashboard__list-item-date">{formatDate(req.createdAt)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </DashboardCard>
      </div>
    </div>
  );
}
