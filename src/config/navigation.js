import {
  Package, Truck, Users, Building2, BarChart3,
  Settings, CreditCard, Route, LogOut,
  LayoutDashboard, Search, Tags, Repeat,
  UserCog, DollarSign,
  Crown, Briefcase, Bell, User, Shield,
} from 'lucide-react';

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'packages', label: 'Colis', icon: Package, path: '/packages' },
  { key: 'shipments', label: 'Expéditions', icon: Truck, path: '/shipments' },
  { key: 'tracking', label: 'Suivi', icon: Search, path: '/tracking' },
  { key: 'payments', label: 'Paiements', icon: DollarSign, path: '/payments' },
  { key: 'customers', label: 'Clients', icon: Users, path: '/customers' },
  { key: 'agencies', label: 'Agences', icon: Building2, path: '/agencies' },
  { key: 'counters', label: 'Comptoirs', icon: Tags, path: '/counters' },
  { key: 'routes', label: 'Trajets', icon: Route, path: '/routes' },
  { key: 'pricing', label: 'Tarification', icon: CreditCard, path: '/pricing' },
  { key: 'employees', label: 'Employés', icon: Users, path: '/employees' },
  { key: 'users', label: 'Utilisateurs', icon: UserCog, path: '/users' },
  { key: 'reports', label: 'Rapports', icon: BarChart3, path: '/reports' },
  { key: 'subscription', label: 'Abonnement', icon: Repeat, path: '/subscription' },
  { key: 'settings', label: 'Paramètres', icon: Settings, path: '/settings' },
];

export const SUPER_ADMIN_NAV = [
  { key: 'admin_dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { key: 'admin_commercial', label: 'Gestion commerciale', icon: DollarSign, children: [
    { key: 'admin_plans', label: "Plans d'abonnement", icon: Crown, path: '/admin/plans' },
    { key: 'admin_subscriptions', label: 'Abonnements', icon: Repeat, path: '/admin/subscriptions' },
  ]},
  { key: 'admin_companies', label: 'Gestion des entreprises', icon: Building2, path: '/admin/companies' },
  { key: 'admin_users', label: 'Utilisateurs plateforme', icon: Users, children: [
    { key: 'admin_superadmins', label: 'Super Admins', icon: Shield, path: '/admin/super-admins' },
    { key: 'admin_managers', label: "Responsables d'entreprise", icon: Briefcase, path: '/admin/managers' },
  ]},
  { key: 'admin_notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { key: 'admin_profile', label: 'Profil', icon: User, path: '/admin/profile' },
];

export const NAV_FOOTER = [
  { key: 'logout', label: 'Déconnexion', icon: LogOut, action: 'logout' },
];

export const SIDEBAR_WIDTH_EXPANDED = 280;
export const SIDEBAR_WIDTH_COLLAPSED = 80;
export const TOPNAVBAR_HEIGHT = 72;
