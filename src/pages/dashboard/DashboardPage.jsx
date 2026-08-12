import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, PAYMENT_METHOD_LABELS } from '../../config/constants';
import { useDashboard } from '../../hooks/useDashboard';
import { KPICard, DashboardCard, QuickAction } from '../../components/dashboard';
import {
  Package, Truck, Users, Building2, Route,
  CreditCard, TrendingUp, AlertTriangle, Clock,
  CheckCircle, ArrowRight, QrCode, FileText,
  BarChart3, Repeat, Settings, CircleAlert,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import './DashboardPage.css';

const ROUTE_STATUS = { in_transit: 'En transit', arrived: 'Arrivé', departed: 'Départi', scheduled: 'Planifié' };
const ROUTE_STATUS_COLOR = { in_transit: 'info', arrived: 'success', departed: 'primary', scheduled: 'secondary' };
const PAYMENT_STATUS = { completed: 'Complété', pending: 'En attente', partial: 'Partiel', refunded: 'Remboursé', failed: 'Échoué', cancelled: 'Annulé' };
const PARCEL_STATUS = {
  registered: 'Enregistré', preparing: 'En préparation', in_transit: 'En transit',
  arrived: 'Arrivé', available_pickup: 'Disponible au retrait', collected: 'Récupéré',
  delivered: 'Livré', damaged: 'Endommagé', cancelled: 'Annulé', validated: 'Validé',
};
const PARCEL_STATUS_COLOR = {
  registered: 'info', preparing: 'primary', in_transit: 'info', arrived: 'success',
  available_pickup: 'success', collected: 'secondary', delivered: 'success',
  damaged: 'danger', cancelled: 'danger', validated: 'info',
};
const AGENDA_STATUS = { done: 'Terminé', active: 'En cours', pending: 'À venir' };

export function DashboardPage() {
  const { user } = useAuth();
  const d = useDashboard();
  const kpi = d.kpis;
  const loading = d.loading;

  if (user?.role === ROLES.CLIENT) {
    return <Navigate to="/dashboard/client" replace />;
  }

  const pct = (cur, prev) => {
    if (!prev) return { trend: 'neutral', value: '—' };
    const p = ((cur - prev) / prev * 100).toFixed(1);
    if (p > 0) return { trend: 'up', value: `+${p}%` };
    if (p < 0) return { trend: 'down', value: `${p}%` };
    return { trend: 'neutral', value: '0%' };
  };

  return (
    <div className="lp-dashboard">
      {/* KPI CARDS */}
      <section className="lp-dashboard__kpis" aria-label="Indicateurs clés">
        <KPICard title="Total colis" value={kpi?.totalPackages?.toLocaleString()} icon={Package} color="primary" {...pct(kpi?.totalPackages, kpi?.prevTotalPackages)} to="/packages" loading={loading.kpis} />
        <KPICard title="En transport" value={kpi?.transitPackages} icon={Truck} color="info" {...pct(kpi?.transitPackages, kpi?.prevTransitPackages)} to="/shipments" loading={loading.kpis} />
        <KPICard title="Livrés aujourd'hui" value={kpi?.deliveredToday} icon={CheckCircle} color="success" to="/packages" loading={loading.kpis} />
        <KPICard title="En attente" value={kpi?.pendingPackages} icon={Clock} color="warning" to="/packages" loading={loading.kpis} />
        <KPICard title="CA du jour" value={d.formatCurrency(kpi?.revenueToday || 0)} icon={TrendingUp} color="success" {...pct(kpi?.revenueToday, kpi?.prevRevenueToday)} loading={loading.kpis} />
        <KPICard title="CA du mois" value={d.formatCurrency(kpi?.revenueMonth || 0)} icon={BarChart3} color="primary" {...pct(kpi?.revenueMonth, kpi?.prevRevenueMonth)} loading={loading.kpis} />
        <KPICard title="Clients" value={kpi?.totalCustomers} icon={Users} color="secondary" to="/customers" loading={loading.kpis} />
        <KPICard title="Agences actives" value={kpi?.activeAgencies} icon={Building2} color="info" to="/agencies" loading={loading.kpis} />
      </section>

      {/* QUICK ACTIONS */}
      <section className="lp-dashboard__quick-actions" aria-label="Raccourcis">
        <QuickAction icon={Package} label="Nouveau colis" to="/packages" color="primary" />
        <QuickAction icon={Truck} label="Nouvelle expédition" to="/shipments" color="info" />
        <QuickAction icon={Users} label="Ajouter client" to="/customers" color="success" />
        <QuickAction icon={Route} label="Créer trajet" to="/routes" color="warning" />
        <QuickAction icon={Building2} label="Ajouter agence" to="/agencies" color="secondary" />
        <QuickAction icon={QrCode} label="Scanner QR" to="/tracking" color="info" />
        <QuickAction icon={FileText} label="Rapports" to="/reports" color="primary" />
        <QuickAction icon={Settings} label="Paramètres" to="/settings" color="secondary" />
      </section>

      {/* CHARTS ROW */}
      <div className="lp-dashboard__grid lp-dashboard__grid--2">
        <DashboardCard title="Évolution des expéditions" subtitle="Colis et expéditions par mois" loading={loading.charts}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={d.charts?.expeditionEvolution || []} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} />
              <Legend />
              <Bar dataKey="colis" name="Colis" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expeditions" name="Expéditions" fill="var(--color-info)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Évolution des revenus" subtitle="Chiffre d'affaires mensuel" loading={loading.charts}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.charts?.revenueEvolution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} formatter={(v) => [d.formatCurrency(v), 'Revenu']} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-success)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <div className="lp-dashboard__grid lp-dashboard__grid--3">
        <DashboardCard title="Colis par statut" loading={loading.charts}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={d.charts?.packageStatus || []} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {(d.charts?.packageStatus || []).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Modes de paiement" loading={loading.charts}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={d.charts?.paymentMethods || []} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {(d.charts?.paymentMethods || []).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Top destinations" loading={loading.charts}>
          <div className="lp-dest-list">
            {(d.charts?.topDestinations || []).map((dest, i) => (
              <div key={dest.city} className="lp-dest-item">
                <span className="lp-dest-item__rank">{i + 1}</span>
                <span className="lp-dest-item__city">{dest.city}</span>
                <span className="lp-dest-item__count">{dest.packages} colis</span>
                <div className="lp-dest-item__bar">
                  <div className="lp-dest-item__fill" style={{ width: `${(dest.packages / (d.charts?.topDestinations?.[0]?.packages || 1)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* ACTIVITY + ROUTES + ALERTS */}
      <div className="lp-dashboard__grid lp-dashboard__grid--3">
        <DashboardCard title="Activité récente" subtitle="Dernières opérations" loading={loading.activity} empty={d.activity.length === 0 ? 'Aucune activité' : null}>
          <div className="lp-activity-list">
            {d.activity.map((item) => (
              <div key={item.id} className="lp-activity-item">
                <div className={`lp-activity-item__icon lp-activity-item__icon--${item.type}`}>
                  {item.icon === 'truck' && <Truck size={14} />}
                  {item.icon === 'package' && <Package size={14} />}
                  {item.icon === 'credit-card' && <CreditCard size={14} />}
                  {item.icon === 'check-circle' && <CheckCircle size={14} />}
                  {item.icon === 'users' && <Users size={14} />}
                  {item.icon === 'route' && <Route size={14} />}
                  {item.icon === 'alert-triangle' && <AlertTriangle size={14} />}
                </div>
                <div className="lp-activity-item__content">
                  <p className="lp-activity-item__title">{item.title}</p>
                  <span className="lp-activity-item__meta">{item.user} · {d.formatTime(item.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Trajets en cours" subtitle="Suivi des expéditions" loading={loading.activeRoutes} empty={d.activeRoutes.length === 0 ? 'Aucun trajet' : null}>
          <div className="lp-route-list">
            {d.activeRoutes.map((r) => (
              <div key={r.id} className="lp-route-item">
                <div className="lp-route-item__path">
                  <span className="lp-route-item__city">{r.from}</span>
                  <ArrowRight size={12} className="lp-route-item__arrow" />
                  <span className="lp-route-item__city">{r.to}</span>
                </div>
                <div className="lp-route-item__info">
                  <span className="lp-route-item__departure"><Clock size={12} /> {r.departure}</span>
                  <span className="lp-route-item__packages"><Package size={12} /> {r.packages}/{r.capacity}</span>
                  <span className={`lp-badge lp-badge--${ROUTE_STATUS_COLOR[r.status]}`}>{ROUTE_STATUS[r.status]}</span>
                </div>
                <div className="lp-route-item__capacity">
                  <div className="lp-route-item__bar">
                    <div className="lp-route-item__fill" style={{ width: `${(r.packages / r.capacity) * 100}%` }} />
                  </div>
                  <span className="lp-route-item__pct">{Math.round((r.packages / r.capacity) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Suivi des colis" subtitle="Derniers colis et événements" loading={loading.packageAlerts} empty={d.packageAlerts.length === 0 ? 'Aucun colis' : null}>
          <div className="lp-alert-list">
            {d.packageAlerts.map((a) => (
              <Link key={a.id} to={`/packages/${a.id}`} className="lp-alert-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`lp-alert-item__badge lp-badge lp-badge--${PARCEL_STATUS_COLOR[a.status] || 'secondary'}`}>
                  {PARCEL_STATUS[a.status] || a.status}
                </div>
                <div className="lp-alert-item__content">
                  <p className="lp-alert-item__tracking">{a.tracking}</p>
                  <p className="lp-alert-item__dest">{a.destination} → {a.recipient}</p>
                  {a.lastEvent?.description && <p className="lp-alert-item__event">{a.lastEvent.description}</p>}
                </div>
                {a.lastDate && <span className="lp-alert-item__time">{d.formatTime(a.lastDate)}</span>}
              </Link>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* PAYMENTS + AGENDA + SUBSCRIPTION */}
      <div className="lp-dashboard__grid lp-dashboard__grid--3">
        <DashboardCard
          title="Paiements récents"
          loading={loading.recentPayments}
          action={<Link to="/payments" className="lp-dcard-link">Historique <ArrowRight size={14} /></Link>}
          empty={d.recentPayments.length === 0 ? 'Aucun paiement' : null}
        >
          <div className="lp-payment-list">
            {d.recentPayments.map((p) => (
              <Link key={p.id} to={`/payments/${p.id}`} className="lp-payment-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="lp-payment-item__client">{p.client}</div>
                <div className="lp-payment-item__details">
                  <span className="lp-payment-item__amount">{d.formatCurrency(p.amount)}</span>
                  <span className="lp-payment-item__method">{PAYMENT_METHOD_LABELS[p.method] || p.method}</span>
                  <span className={`lp-badge lp-badge--${p.status === 'completed' ? 'success' : p.status === 'pending' || p.status === 'partial' ? 'warning' : 'danger'}`}>{PAYMENT_STATUS[p.status] || p.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Agenda opérationnel" subtitle="Aujourd'hui" loading={loading.agenda} empty={d.agenda.length === 0 ? 'Rien de prévu' : null}>
          <div className="lp-agenda-list">
            {d.agenda.map((a) => (
              <div key={a.id} className={`lp-agenda-item lp-agenda-item--${AGENDA_STATUS[a.status]}`}>
                <span className="lp-agenda-item__time">{a.time}</span>
                <div className="lp-agenda-item__content">
                  <p className="lp-agenda-item__title">{a.title}</p>
                </div>
                <span className={`lp-badge lp-badge--${a.status === 'done' ? 'success' : a.status === 'active' ? 'info' : 'secondary'}`}>
                  {AGENDA_STATUS[a.status]}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Abonnement" subtitle={d.subscription?.plan} loading={loading.subscription}>
          {d.subscription && (
            <div className="lp-sub-info">
              <div className="lp-sub-info__row">
                <span className="lp-sub-info__label">Statut</span>
                <span className={`lp-badge lp-badge--${d.subscription.status === 'active' ? 'success' : 'danger'}`}>
                  {d.subscription.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="lp-sub-info__row">
                <span className="lp-sub-info__label">Renouvellement</span>
                <span className="lp-sub-info__value">{d.formatDate(d.subscription.renewalDate)}</span>
              </div>
              <div className="lp-sub-info__row">
                <span className="lp-sub-info__label">Utilisateurs</span>
                <span className="lp-sub-info__value">{d.subscription.usedUsers}/{d.subscription.maxUsers}</span>
              </div>
              <div className="lp-sub-info__progress">
                <div className="lp-sub-info__bar">
                  <div className="lp-sub-info__fill" style={{ width: `${(d.subscription.usedUsers / d.subscription.maxUsers) * 100}%` }} />
                </div>
              </div>
              <div className="lp-sub-info__row">
                <span className="lp-sub-info__label">Agences</span>
                <span className="lp-sub-info__value">{d.subscription.usedAgencies}/{d.subscription.maxAgencies}</span>
              </div>
              <div className="lp-sub-info__row">
                <span className="lp-sub-info__label">Stockage</span>
                <span className="lp-sub-info__value">{d.subscription.storageUsed} Go / {d.subscription.storageTotal} Go</span>
              </div>
              <div className="lp-sub-info__progress">
                <div className="lp-sub-info__bar">
                  <div className="lp-sub-info__fill lp-sub-info__fill--warn" style={{ width: `${(d.subscription.storageUsed / d.subscription.storageTotal) * 100}%` }} />
                </div>
              </div>
              <button className="lp-sub-info__btn">
                <Repeat size={14} /> Gérer l'abonnement
              </button>
            </div>
          )}
        </DashboardCard>
      </div>

      {/* PERFORMANCE */}
      <div className="lp-dashboard__grid lp-dashboard__grid--2">
        <DashboardCard title="Performance des agences" subtitle="Classement par activité" loading={loading.agencyPerformance}>
          <div className="lp-perf-table">
            <div className="lp-perf-table__head">
              <span>Agence</span>
              <span>Colis</span>
              <span>CA</span>
              <span>Clients</span>
              <span>Ponctualité</span>
            </div>
            {d.agencyPerformance.map((ag, i) => (
              <div key={ag.id} className="lp-perf-table__row">
                <span className="lp-perf-table__rank">{i + 1}</span>
                <span className="lp-perf-table__name">{ag.name}</span>
                <span>{ag.packages}</span>
                <span>{d.formatCurrency(ag.revenue)}</span>
                <span>{ag.customers}</span>
                <span className={`lp-perf-table__punctuality ${ag.punctuality >= 90 ? 'lp-perf-table__punctuality--good' : ''}`}>{ag.punctuality}%</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Performance des employés" subtitle="Les plus actifs" loading={loading.employeePerformance}>
          <div className="lp-perf-table">
            <div className="lp-perf-table__head">
              <span>Employé</span>
              <span>Rôle</span>
              <span>Expé.</span>
              <span>Paiements</span>
              <span>Colis</span>
            </div>
            {d.employeePerformance.map((emp, i) => (
              <div key={emp.id} className="lp-perf-table__row">
                <span className="lp-perf-table__rank">{i + 1}</span>
                <span className="lp-perf-table__name">{emp.name}</span>
                <span>{emp.role}</span>
                <span>{emp.shipments}</span>
                <span>{emp.payments}</span>
                <span>{emp.packages}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* ALERTS */}
      {d.criticalAlerts.length > 0 && (
        <section className="lp-dashboard__alerts" aria-label="Alertes importantes">
          <div className="lp-alerts-banner">
            <div className="lp-alerts-banner__icon">
              <CircleAlert size={20} />
            </div>
            <div className="lp-alerts-banner__content">
              <h4 className="lp-alerts-banner__title">Alertes</h4>
              <div className="lp-alerts-banner__list">
                {d.criticalAlerts.map((a) => (
                  <div key={a.id} className={`lp-alerts-banner__item lp-alerts-banner__item--${a.severity}`}>
                    <span className="lp-alerts-banner__item-title">{a.title}</span>
                    <span className="lp-alerts-banner__item-msg">{a.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default DashboardPage;
